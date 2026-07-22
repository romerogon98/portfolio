import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PRIVATE_AUTH_COOKIE, hasValidAuthCookie } from "@/lib/privateAuth";

// Gate for the confidential Litebox case studies. Renamed from `middleware` to
// `proxy` in Next 16 — see node_modules/next/dist/docs/.../file-conventions/proxy.md.
// This is the fast-path check; the (protected) layout repeats it server-side
// as defense in depth, per Next's own guidance not to rely on proxy alone.
export const config = {
  matcher: "/work/private/:path*",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/work/private/enter")) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(PRIVATE_AUTH_COOKIE)?.value;
  if (hasValidAuthCookie(cookie)) {
    return NextResponse.next();
  }

  const url = new URL("/work/private/enter", request.url);
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}
