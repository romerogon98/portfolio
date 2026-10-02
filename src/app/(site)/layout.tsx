import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PRIVATE_AUTH_COOKIE, hasValidAuthCookie } from "@/lib/privateAuth";

// The whole portfolio sits behind the shared password; only /enter lives
// outside this group. Defense in depth: repeats the cookie check that
// src/proxy.ts already does, per Next's own guidance not to rely on proxy
// alone for auth (see node_modules/next/dist/docs/.../file-conventions/proxy.md).
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const cookie = store.get(PRIVATE_AUTH_COOKIE)?.value;

  if (!hasValidAuthCookie(cookie)) {
    redirect("/enter");
  }

  return <>{children}</>;
}
