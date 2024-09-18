import { Venue } from "@/app/lib/types";

export async function fetchProfileVenues(
  profileName: string,
  token: string
): Promise<Venue[]> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/profiles/${profileName}/venues?_bookings=true&_venues=true`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch profile venues");
    throw new Error("Failed to fetch profile venues");
  }

  const data = await response.json();
  return data.data;
}
