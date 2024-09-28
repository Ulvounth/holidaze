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

      throw new Error(
        errorData.errors?.[0]?.message || "Failed to delete venue"
      );
    }

    if (response.status === 204) {
      return true;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
}
