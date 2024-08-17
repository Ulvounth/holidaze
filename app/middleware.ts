import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken");

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Apply the middleware to the routes that require authentication
export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"], // Add protected routes here
};
