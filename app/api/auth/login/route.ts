import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/app/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if the required fields are present
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Make the login request to the Noroff API
    const response = await fetch(`${API_BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.message || "Login failed" },
        { status: response.status }
      );
    }

    // Extract the access token from the response
    const { accessToken } = result.data;

    // Use `cookies` to set the access token as an HTTP-only cookie
    const cookiesStore = cookies();
    cookiesStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60, // 1 hour
      sameSite: "strict",
      path: "/",
    });

    // Return the successful response with user data
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error("Error in POST /api/auth/login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
