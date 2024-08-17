// app/page.tsx
import VenueCard from "./components/ui/VenueCard";
import Hero from "./components/ui/Hero";
import { fetchVenues } from "./lib/services/venue/fetchVenues";
import { Venue } from "./lib/types";

export default async function Home() {
  let venues: Venue[] = [];

  try {
    venues = await fetchVenues();
  } catch (err) {
    console.error("Failed to load venues", err);
  }

  return (
    <>
      <Hero />
      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-4">Venues</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {venues.length > 0 ? (
            venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
          ) : (
            <p>No venues available.</p>
          )}
        </div>
      </div>
    </>
  );
}
