"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  PRIVATE_AUTH_COOKIE,
  PRIVATE_AUTH_MAX_AGE,
  computeAuthToken,
  missingAuthConfig,
  passwordMatches,
} from "@/lib/privateAuth";

// Only same-site paths; "//host" or "/\host" would bounce visitors off-site.
function safeFrom(value: FormDataEntryValue | null) {
  const from = String(value ?? "");
  return /^\/(?![/\\])/.test(from) ? from : "/";
}

export async function unlockSite(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const from = safeFrom(formData.get("from"));

  // A missing env var would otherwise look exactly like a wrong password.
  const missing = missingAuthConfig();
  if (missing.length) {
    console.error(`[password gate] Missing env vars: ${missing.join(", ")}`);
    redirect(`/enter?error=config&from=${encodeURIComponent(from)}`);
  }

  const token = passwordMatches(password) ? computeAuthToken() : null;

  if (!token) {
    // Slow down naive brute-forcing; no lockout system on top of this.
    await new Promise((resolve) => setTimeout(resolve, 400));
    redirect(`/enter?error=1&from=${encodeURIComponent(from)}`);
  }

  const store = await cookies();
  store.set(PRIVATE_AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: PRIVATE_AUTH_MAX_AGE,
    path: "/",
  });

  redirect(from);
}
