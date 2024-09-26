import { API_BASE_URL } from "../../utils/constants";
import { createAuthHeaders } from "@/app/lib/utils/createAuthHeaders";

export const createVenue = async (venueData: Record<string, any>) => {
  try {
    const headers = await createAuthHeaders();

    const response = await fetch(`${API_BASE_URL}holidaze/venues`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw errorResponse;
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};
