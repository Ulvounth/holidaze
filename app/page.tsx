// app/page.tsx
import Link from "next/link";
import Hero from "./components/ui/Hero";
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
        <h2>Venues</h2>
        <ul>
          {venues.map((venue) => (
            <li key={venue.id}>{venue.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
