export async function deleteVenueById(venueId: string, headers: Headers) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/venues/${venueId}`,
    {
      method: "DELETE",
      headers: headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete venue");
  }

  return response.status === 204; // Return true if the venue was deleted successfully
}
