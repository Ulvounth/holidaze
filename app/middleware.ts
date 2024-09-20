import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("accessToken");
  const userCookie = req.cookies.get("user");

  // Ensure token and userCookie are defined and access the value property
  const token = tokenCookie ? tokenCookie.value : null;
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (!token || !user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Role-based access control for venue managers
  if (req.nextUrl.pathname.startsWith("/createVenue") && !user.venueManager) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: ["/createVenue", "/admin/:path*", "/profile/:path*"],
};
