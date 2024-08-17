import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, venueManager } = await req.json();

    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        venueManager,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
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
  } catch (error) {
    console.error("Error in POST /api/auth/register:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
