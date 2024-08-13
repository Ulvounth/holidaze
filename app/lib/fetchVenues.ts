// app/lib/fetchVenues.ts
import { fetchFromAPI } from "./api";

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  rating: number;
  location: { city: string; country: string };
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
    reviews: number;
  };
}

export async function fetchVenues(): Promise<Venue[]> {
  const data = await fetchFromAPI("venues");
  return Array.isArray(data.data) ? data.data : [];
}

export async function fetchVenue(id: string): Promise<Venue> {
  const data = await fetchFromAPI(`venues/${id}`);
  return data.data;
}
