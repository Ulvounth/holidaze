// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { EXTERNAL_API_BASE_URL } from "@/app/lib/constants";

export async function GET() {
  try {
    const response = await fetch(`${EXTERNAL_API_BASE_URL}holidaze/venues`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching venues");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
