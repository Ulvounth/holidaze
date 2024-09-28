import { API_BASE_URL } from "../../utils/constants";
import { createAuthHeaders } from "@/app/lib/utils/createAuthHeaders";

interface BookingData {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export const createBooking = async (bookingData: BookingData) => {
  try {
    const headers = await createAuthHeaders();

    const response = await fetch(
      `${API_BASE_URL}holidaze/bookings?_customer&_venue`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(bookingData),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error(
        errorResponse.errors?.[0]?.message || "Failed to create booking"
      );
    }

    const result = await response.json();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("No access token found")) {
        throw new Error("Please login or register to book a venue.");
      } else {
        console.error("Error creating booking:", error);
        throw new Error(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    } else {
      console.error("An unknown error occurred:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
