export async function deleteBooking(bookingId: string, headers: Headers) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/bookings/${bookingId}`,
    {
      method: "DELETE",
      headers: headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }

  return response.status === 204;
}
