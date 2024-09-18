import { API_BASE_URL } from "../../constants";
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
      console.error(`API error: ${response.status} - ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (!data || !data.data) {
      console.error(`Unexpected API response structure:`, data);
      return null;
    }

    return data.data as Venue;
  } catch (error) {
    console.error(`Error fetching venue with ID ${id}:`, error);
    return null;
  }
};
