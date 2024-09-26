import { Venue } from "../../types";
import { API_BASE_URL } from "../../utils/constants";

export const fetchVenues = async (
  page: number = 1,
  limit: number = 20
): Promise<Venue[]> => {
  const response = await fetch(
    `${API_BASE_URL}holidaze/venues?limit=${limit}&page=${page}&_owner=true&_bookings=true`,
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
