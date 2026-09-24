import { NextResponse } from "next/server";

import { decrypt } from "@/lib/session";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isAdminRoute = path.startsWith("/admin");
  const isAuthPage = path.startsWith("/login") || path.startsWith("/register");

  const cookie = request.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute && session?.role !== "admin") {
    // TODO: in production fix
    // return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (isAuthPage && session?.userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
