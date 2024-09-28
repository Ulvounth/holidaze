export async function deleteBooking(bookingId: string, headers: Headers) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/bookings/${bookingId}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log("API Error Response:", errorData);
      throw new Error(
        errorData.errors?.[0]?.message || "Failed to cancel booking"
      );
    }

    return response.status === 204;
  } catch (error: any) {
    console.error("Error in deleteBooking function:", error);
    throw error;
  }
}
