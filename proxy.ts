import { NextResponse } from "next/server";

import { decrypt } from "@/lib/session";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin", "/dashboard"];
const publicRoutes = ["/login", "/"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  const cookie = request.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute && session?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
