import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import validateRegistration from "@/app/lib/validateRegistration";
import { RegisterRequestBody } from "@/app/lib/types";

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

    // Validate input data
    const validationError = validateRegistration({
      name,
      email,
      password,
      bio,
      avatar,
      banner,
    });

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Proceed with registration request
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "", // Include API Key
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
      // Improve error handling by checking for specific error messages from the API response
      const errorMessage =
        data.errors?.[0]?.message || data.message || "Registration failed";
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    // Set the access token as an HTTP-only cookie
    const cookiesStore = cookies();
    cookiesStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60, // 1 hour
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Error in POST /api/auth/register:", error);

    // Provide detailed error messages for common issues
    const errorMessage =
      error?.message || "An unexpected error occurred during registration.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
