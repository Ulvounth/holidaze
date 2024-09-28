import Hero from "./components/ui/Hero";
import { fetchVenues } from "./lib/services/venue/fetchVenues";
import { Venue } from "./lib/types";
import LoadMoreVenues from "./components/ui/LoadMoreVenues";

export default async function Home() {
  let initialVenues: Venue[] = [];
  let errorMessage = "";

  try {
    initialVenues = await fetchVenues(1);
  } catch (err: any) {
    console.error("Failed to load venues", err);
    errorMessage =
      err.message || "Failed to load venues. Please try again later.";
  }

  return (
    <>
      <Hero />
      <div className="container mx-auto py-6 px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl font-bold mb-4">Venues</h2>
        <LoadMoreVenues
          initialVenues={initialVenues}
          initialError={errorMessage}
        />
      </div>
    </>
  );
}
