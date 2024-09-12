import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies helper
import { createAuthHeaders } from "@/app/lib/createAuthHeaders";
import { fetchVenueById } from "@/app/lib/services/venue/fetchVenueById";
import { updateVenueById } from "@/app/lib/services/venue/updateVenueById";

// Named export for PUT method
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headers = await createAuthHeaders(); // Get the authorization headers
    const venueId = params.id;

    const venue = await fetchVenueById(venueId); // Fetch venue

    if (!venue) {
      return NextResponse.json({ message: "Venue not found" }, { status: 404 });
    }

    const cookieStore = cookies(); // Get cookies
    const userCookie = cookieStore.get("user")
      ? JSON.parse(decodeURIComponent(cookieStore.get("user")?.value as string))
      : null;

    if (!userCookie) {
      return NextResponse.json(
        { message: "Unauthorized: User not logged in" },
        { status: 403 }
      );
    }

    // Ensure the logged-in user is the venue owner or manager
    if (
      venue.owner.email.trim().toLowerCase() !==
      userCookie.email.trim().toLowerCase()
    ) {
      return NextResponse.json(
        { message: "Forbidden: You do not own this venue" },
        { status: 403 }
      );
    }

    const body = await req.json(); // Get the body of the request
    const updatedVenue = await updateVenueById(venueId, body, headers); // Update venue

    return NextResponse.json({ data: updatedVenue }, { status: 200 });
  } catch (error) {
    console.error("Error updating venue:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
