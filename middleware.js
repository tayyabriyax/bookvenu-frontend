import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log("➡️ Middleware triggered for path:", pathname);

  // 🌍 Public routes: anyone can access
  if (pathname === "/" || pathname.startsWith("/auth")) {
    console.log("✅ Public route, no auth needed");
    return NextResponse.next();
  }

  // ❌ Not logged in
  const token = req.cookies.get("token")?.value;
  if (!token) {
    console.log("❌ No token found, redirect to login");
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  console.log("🔑 Token found:", token);

  try {
    // Decode JWT from cookie
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log("🔐 JWT verified. Payload:", payload);

    const role = payload.role;
    console.log("🛡️ User role from token:", role);

    // 🛡️ Protect role-based routes
    if (pathname.startsWith("/admin") && role !== "admin") {
      console.log("❌ Not admin, redirect to /unauthorized");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/customer") && role !== "customer") {
      console.log("❌ Not customer, redirect to /unauthorized");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/organizer") && role !== "owner") {
      console.log("❌ Not organizer, redirect to /unauthorized");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    console.log("✅ Access granted, continue to page");
    return NextResponse.next();
  } catch (err) {
    console.log("❌ JWT verification failed:", err.message);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

// 🛠 Only run middleware on protected routes
export const config = {
  matcher: [
    "/admin/:path*",      // all admin pages
    "/customer/:path*",   // all customer pages
    "/organizer/:path*"   // all organizer pages
  ],
};
