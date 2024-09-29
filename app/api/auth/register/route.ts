import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { RegisterRequestBody } from "@/app/lib/types";
import { API_BASE_URL } from "@/app/lib/utils/constants";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      bio,
      avatar,
      banner,
      venueManager,
    }: RegisterRequestBody = await req.json();

    const response = await fetch(`${API_BASE_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        bio,
        avatar,
        banner,
        venueManager,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.errors?.[0]?.message || data.message || "Registration failed";
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const cookiesStore = cookies();

    cookiesStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    cookiesStore.set("user", JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Error in POST /api/auth/register:", error);

    const errorMessage =
      error?.message || "An unexpected error occurred during registration.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
