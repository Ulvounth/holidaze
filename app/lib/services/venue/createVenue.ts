// services/venueService.ts
import { API_BASE_URL } from "../../constants";
import { createAuthHeaders } from "../../createAuthHeaders";

export const createVenue = async (venueData: Record<string, any>) => {
  try {
    // Use the createAuthHeaders function to get the headers
    const headers = await createAuthHeaders();

    console.log("Sending Venue Data:", JSON.stringify(venueData, null, 2));

    const response = await fetch(`${API_BASE_URL}holidaze/venues`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error("Failed to create venue");
    }

    const result = await response.json();
    console.log("Venue Created Successfully:", result);

    return result;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};
