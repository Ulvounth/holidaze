import Hero from "./components/ui/Hero";
import { fetchVenues } from "./lib/services/venue/fetchVenues";
import { Venue } from "./lib/types";
import LoadMoreVenues from "./components/ui/LoadMoreVenues";

export default async function Home() {
  let initialVenues: Venue[] = [];

  try {
    initialVenues = await fetchVenues(1);
  } catch (err) {
    console.error("Failed to load venues", err);
  }

  return (
    <>
      <Hero />

      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-4">Venues</h2>

        <LoadMoreVenues initialVenues={initialVenues} />
      </div>
    </>
  );
}
