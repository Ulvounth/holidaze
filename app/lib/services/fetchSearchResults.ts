import { Venue } from "@/app/lib/types";

export async function fetchSearchResults(
  query: string,
  startDate?: string,
  endDate?: string
): Promise<Venue[]> {
  try {
    const searchParams = new URLSearchParams();
    if (query) searchParams.append("q", query);
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }holidaze/venues/search?${searchParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log("API Error Response:", errorData);

      throw new Error(
        errorData.errors?.[0]?.message || "Failed to fetch search results"
      );
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}
