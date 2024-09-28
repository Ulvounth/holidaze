import { API_BASE_URL } from "../../utils/constants";
import { Venue } from "../../types";

export const fetchVenueById = async (id: string): Promise<Venue | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}holidaze/venues/${id}?_owner=true&_bookings=true`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch venue by ID");
    }

    const data = await response.json();
    return data.data as Venue;
  } catch (error) {
    console.error(`Error fetching venue with ID ${id}:`, error);
    throw new Error("Unable to load venue. Please try again later.");
  }
};
