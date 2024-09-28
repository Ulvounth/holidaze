export async function deleteVenueById(venueId: string, headers: Headers) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/venues/${venueId}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log("API Error Response:", errorData);
      throw new Error(
        errorData.errors?.[0]?.message || "Failed to delete venue"
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
}
