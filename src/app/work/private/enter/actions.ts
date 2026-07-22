"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  PRIVATE_AUTH_COOKIE,
  PRIVATE_AUTH_MAX_AGE,
  computeAuthToken,
  passwordMatches,
} from "@/lib/privateAuth";

export async function unlockPrivateWork(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") || "/work/private");

  const token = passwordMatches(password) ? computeAuthToken() : null;

  if (!token) {
    // Slow down naive brute-forcing; no lockout system on top of this.
    await new Promise((resolve) => setTimeout(resolve, 400));
    redirect(`/work/private/enter?error=1&from=${encodeURIComponent(from)}`);
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
