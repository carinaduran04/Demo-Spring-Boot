import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo proteger rutas que empiezan con /aplicaciones
  if (pathname.startsWith("/aplicaciones")) {
    const token = req.cookies.get("user")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/aplicaciones/:path*"],
};
