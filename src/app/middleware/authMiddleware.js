import { NextResponse } from "next/server";

export function authMiddleware(request) {
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/customer") && role !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/organizer") && role !== "organizer") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/organizer/:path*"],
};
 