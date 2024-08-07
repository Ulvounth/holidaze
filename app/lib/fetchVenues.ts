// app/lib/fetchVenues.ts
export interface Venue {
    id: string;
    name: string;
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
  