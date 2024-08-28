// app/api/profile/[name]/route.ts

import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/app/lib/constants";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/holidaze/profiles/${params.name}?_bookings=true&_venues=true`,
      {
        headers: {
          Authorization: `Bearer ${req.headers.get("authorization")}`,
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
