import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;
  const referer = req.headers.get("referer") || "";

  if (pathname === "/login" || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const vieneDesdeLogin = referer.includes("/login");
  const vieneDesdeApp = referer.includes("/aplicaciones");

  if (pathname.startsWith("/aplicaciones") && (vieneDesdeLogin || vieneDesdeApp)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/aplicaciones") && !vieneDesdeLogin && !vieneDesdeApp) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/aplicaciones/:path*"],
};
