export async function updateVenueById(
  venueId: string,
  venueData: any,
  headers: Headers
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/venues/${venueId}`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(venueData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors?.[0]?.message || "Failed to update venue"
      );
    }

    return response.json();
  } catch (error) {
    console.error(`Error updating venue with ID ${venueId}:`, error);
    throw error;
  }
}
