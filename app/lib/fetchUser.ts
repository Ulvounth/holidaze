// lib/fetchUser.ts

export async function fetchUser(name: string, token: string) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseURL}/holidaze/profiles/${name}?_bookings=true&_venues=true`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": process.env.NEXT_PUBLIC_API_KEY || "", // Include this if your API requires it
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
