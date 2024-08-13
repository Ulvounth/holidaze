// app/api/venues/[id]/route.ts
import { NextResponse } from "next/server";
import { EXTERNAL_API_BASE_URL } from "@/app/lib/constants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Venue ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${EXTERNAL_API_BASE_URL}holidaze/venues/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching venue");
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
