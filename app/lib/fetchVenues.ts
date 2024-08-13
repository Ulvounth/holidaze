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
  const response = await fetch("http://localhost:3000/api/venues", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }

  const data = await response.json();
  return Array.isArray(data.data) ? data.data : [];
}

export async function fetchVenue(id: string): Promise<Venue> {
  const response = await fetch(`http://localhost:3000/api/venues/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch venue");
  }

  const data = await response.json();
  console.log("fetchVenue", data);

  return data.data;
}
