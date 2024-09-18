// app/lib/fetchVenues.ts
import { Venue } from "../../types";
import { API_BASE_URL } from "../../constants";

export const fetchVenues = async (): Promise<Venue[]> => {
  const response = await fetch(
    `${API_BASE_URL}holidaze/venues?_owner=true&_bookings=true`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }

  const data = await response.json();
  return data.data;
};
