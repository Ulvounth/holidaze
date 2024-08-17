import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  // Remove the accessToken cookie
  cookieStore.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 0, // Expire immediately
    sameSite: "strict",
    path: "/",
  });

  // Optionally, remove any other cookies (like 'user')
  cookieStore.set("user", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 0,
    sameSite: "strict",
    path: "/",
  });

  // Redirect to the homepage after logout
  return NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")
  );
}
