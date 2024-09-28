import { ProfileData } from "@/app/lib/types";

export default async function fetchProfileData(
  name: string,
  token: string
): Promise<ProfileData | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/profiles/${name}?_bookings=true&_venues=true`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.errors?.[0]?.message || "Failed to fetch profile data"
      );
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching profile data for ${name}:`, error);
    throw error;
  }
}
