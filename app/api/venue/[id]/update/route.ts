import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAuthHeaders } from "@/app/lib/createAuthHeaders";
import { fetchVenueById } from "@/app/lib/services/venue/fetchVenueById";
import { updateVenueById } from "@/app/lib/services/venue/updateVenueById";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headers = await createAuthHeaders();
    const venueId = params.id;

    const venue = await fetchVenueById(venueId);

    if (!venue) {
      return NextResponse.json({ message: "Venue not found" }, { status: 404 });
    }

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user")
      ? JSON.parse(decodeURIComponent(cookieStore.get("user")?.value as string))
      : null;

    if (!userCookie) {
      return NextResponse.json(
        { message: "Unauthorized: User not logged in" },
        { status: 403 }
      );
    }

    if (
      venue.owner.email.trim().toLowerCase() !==
      userCookie.email.trim().toLowerCase()
    ) {
      return NextResponse.json(
        { message: "Forbidden: You do not own this venue" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const updatedVenue = await updateVenueById(venueId, body, headers);

    return NextResponse.json({ data: updatedVenue }, { status: 200 });
  } catch (error) {
    console.error("Error updating venue:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
