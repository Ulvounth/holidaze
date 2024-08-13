// app/page.tsx
import Link from "next/link";
import Hero from "./components/ui/Hero";
import VenueCard from "./components/ui/VenueCard";
import { fetchVenues, Venue } from "./lib/fetchVenues";

const Home: React.FC = async () => {
  let venues: Venue[] = [];
  let error: string | null = null;

  try {
    venues = await fetchVenues();
  } catch (err) {
    error = "Failed to load venues";
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Hero />
      <Link href="/profile">Profile page</Link>
      <div>
        <h2 className="text-2xl font-bold mb-4">Venues</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
