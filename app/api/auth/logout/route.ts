import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  cookieStore.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 0,
    sameSite: "strict",
    path: "/",
  });

  cookieStore.set("user", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 0,
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL));
}
