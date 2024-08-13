// app/lib/api.ts
import { EXTERNAL_API_BASE_URL, LOCAL_API_BASE_URL } from "./constants";

export async function fetchFromAPI(
  endpoint: string,
  useExternalApi: boolean = false
) {
  const baseUrl = useExternalApi ? EXTERNAL_API_BASE_URL : LOCAL_API_BASE_URL;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
