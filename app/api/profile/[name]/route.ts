import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/app/lib/constants";
import sanitize from "sanitize-html";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    // Sanitize the name parameter
    const sanitizedName = sanitize(params.name, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const res = await fetch(
      `${API_BASE_URL}/holidaze/profiles/${sanitizedName}?_bookings=true&_venues=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
      }
    );

    if (!res.ok) {
      const data = await res.json();
      const errorMessage =
        data.errors?.[0]?.message || "Failed to fetch profile data";
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching profile data:", error);

    const errorMessage =
      error.message ||
      "An unexpected error occurred while fetching profile data.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
