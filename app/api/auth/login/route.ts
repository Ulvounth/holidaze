import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/app/lib/utils/constants";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}auth/login?_holidaze=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage =
        result.errors?.[0]?.message || result.message || "Login failed";
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const { accessToken, ...userData } = result.data;

    const cookiesStore = cookies();
    cookiesStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60, // 1 hour
      sameSite: "strict",
      path: "/",
    });

    // Store user data as a cookie (optional, customize the value based on your use case)
    cookiesStore.set("user", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60, // 1 hour
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ data: result.data });
  } catch (error: any) {
    console.error("Error in POST /api/auth/login:", error);

    const errorMessage =
      error.message || "An unexpected error occurred during login.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
