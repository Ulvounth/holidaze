import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
  venueManager?: boolean;
}

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

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Additional validation according to the API requirements
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email must be a valid stud.noroff.no address" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    if (bio && bio.length > 160) {
      return NextResponse.json(
        { error: "Bio must be less than 160 characters" },
        { status: 400 }
      );
    }

    if (avatar) {
      if (!avatar.url) {
        return NextResponse.json(
          { error: "Avatar URL must be provided if avatar is set" },
          { status: 400 }
        );
      }
      if (avatar.alt && avatar.alt.length > 120) {
        return NextResponse.json(
          { error: "Avatar alt text must be less than 120 characters" },
          { status: 400 }
        );
      }
    }

    if (banner) {
      if (!banner.url) {
        return NextResponse.json(
          { error: "Banner URL must be provided if banner is set" },
          { status: 400 }
        );
      }
      if (banner.alt && banner.alt.length > 120) {
        return NextResponse.json(
          { error: "Banner alt text must be less than 120 characters" },
          { status: 400 }
        );
      }
    }

    // Make the registration request to the Noroff API
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
      return NextResponse.json(
        { error: data.message || "Registration failed" },
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
  } catch (error) {
    console.error("Error in POST /api/auth/register:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
