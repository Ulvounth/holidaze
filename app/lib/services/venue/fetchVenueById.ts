import { API_BASE_URL } from "../../constants";
import { Venue } from "../../types";

export const fetchVenueById = async (id: string): Promise<Venue | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}holidaze/venues/${id}?_owner=true&_bookings=true`,
      {
        cache: "no-store", // Ensure fresh data on each request
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch venue");
    }

    const data = await response.json();
    return data.data as Venue; // Ensure we're extracting the 'data' property
  } catch (error) {
    console.error(`Error fetching venue with ID ${id}:`, error);
    return null;
  }
};
