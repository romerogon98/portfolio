import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PRIVATE_AUTH_COOKIE, hasValidAuthCookie } from "@/lib/privateAuth";

// Gate for the whole portfolio. Renamed from `middleware` to `proxy` in
// Next 16 — see node_modules/next/dist/docs/.../file-conventions/proxy.md.
// This is the fast-path check; the (site) layout repeats it server-side as
// defense in depth, per Next's own guidance not to rely on proxy alone.
export const config = {
  // Every page except the password screen. Next internals and public files
  // (anything with an extension) pass through so /enter can load its assets.
  matcher: ["/((?!enter|_next/|.*\\..*).*)"],
};

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get(PRIVATE_AUTH_COOKIE)?.value;
  if (hasValidAuthCookie(cookie)) {
    return NextResponse.next();
  }

  const url = new URL("/enter", request.url);
  const { pathname, search } = request.nextUrl;
  if (pathname !== "/") url.searchParams.set("from", pathname + search);
  return NextResponse.redirect(url);
}
