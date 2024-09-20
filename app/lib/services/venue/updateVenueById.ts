export async function updateVenueById(
  venueId: string,
  venueData: any,
  headers: Headers
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/venues/${venueId}`,
    {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(venueData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update venue");
  }

  return response.json();
}
