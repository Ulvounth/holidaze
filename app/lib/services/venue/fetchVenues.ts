// app/lib/fetchVenues.ts
import { Venue } from "../../types";

export const fetchVenues = async (): Promise<Venue[]> => {
  const response = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
    cache: "no-store", // Ensure fresh data on each request
  });

  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }

  const data = await response.json();
  return data.data; // Adjust this if your API returns data differently
};
