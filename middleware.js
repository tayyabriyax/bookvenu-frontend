import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // public routes
  if (pathname === "/" || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (!token) {
    const res = NextResponse.redirect(new URL("/auth/login", req.url));
    res.headers.set("x-debug", "no-token");
    return res;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role;

    // temporarily expose role in header
    const res = NextResponse.next();
    res.headers.set("x-debug-role", role);
    return res;
  } catch (err) {
    const res = NextResponse.redirect(new URL("/auth/login", req.url));
    res.headers.set("x-debug", "jwt-failed");
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/organizer/:path*"],
};
