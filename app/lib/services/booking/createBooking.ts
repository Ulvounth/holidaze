// services/bookings/createBooking.ts
import { API_BASE_URL } from "../../constants";
import { createAuthHeaders } from "../../createAuthHeaders";

// Define an interface for booking data to improve type safety
interface BookingData {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export const createBooking = async (bookingData: BookingData) => {
  try {
    // Use the createAuthHeaders function to get the headers
    const headers = await createAuthHeaders();

    console.log("Sending Booking Data:", JSON.stringify(bookingData, null, 2));

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
      throw new Error(errorResponse.message || "Failed to create booking");
    }

    const result = await response.json();
    console.log("Booking Created Successfully:", result);

    return result;
  } catch (error) {
    // Handle different types of errors explicitly if possible
    console.error("Error creating booking:", error);
    throw error;
  }
};
