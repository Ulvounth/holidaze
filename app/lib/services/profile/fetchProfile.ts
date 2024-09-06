import { ProfileData } from "@/app/lib/types";

export default async function fetchProfileData(
  name: string,
  token: string
): Promise<ProfileData | null> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/profiles/${name}?_bookings=true&_venues=true`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }

  const result = await res.json();
  return result.data; // Return only the data part
}
