import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir siempre /login y archivos estáticos
  if (pathname === "/login" || pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  // Bloquear todas las rutas de /aplicaciones y la raíz si no hay cookie
  const token = req.cookies.get("user")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/aplicaciones/:path*"], // Middleware se ejecuta en / y /aplicaciones/*
};
