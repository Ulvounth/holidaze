import { Venue } from "@/app/lib/types";

export async function fetchProfileVenues(
  profileName: string,
  token: string
): Promise<Venue[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/profiles/${profileName}/venues?_bookings=true&_venues=true`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors?.[0]?.message || "Failed to fetch profile venues"
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching venues for profile ${profileName}:`, error);
    throw error;
  }
}
