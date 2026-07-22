import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PRIVATE_AUTH_COOKIE, hasValidAuthCookie } from "@/lib/privateAuth";

// Defense in depth: repeats the cookie check that src/proxy.ts already does,
// per Next's own guidance not to rely on proxy alone for auth (see
// node_modules/next/dist/docs/.../file-conventions/proxy.md).
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const cookie = store.get(PRIVATE_AUTH_COOKIE)?.value;

  if (!hasValidAuthCookie(cookie)) {
    redirect("/work/private/enter");
  }

  return <>{children}</>;
}
