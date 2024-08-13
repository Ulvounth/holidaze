// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchVenue, Venue } from "@/app/lib/fetchVenues";

interface VenueDetailProps {
  params: { id: string };
}

const VenueDetail: React.FC<VenueDetailProps> = async ({ params }) => {
  const { id } = params;

  let venue: Venue | null = null;

  try {
    venue = await fetchVenue(id);
  } catch (error) {
    console.error(error);
  }

  if (!venue) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <Image
        src={venue.media[0]?.url || "/images/hero.jpg"}
        alt={venue.media[0]?.alt || venue.name}
        width={800}
        height={500}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{venue.name}</h1>
      <p className="mt-2">{venue.description}</p>
      <p className="text-pink-500 mt-2">${venue.price} / night</p>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Location</h3>
        <p>
          {venue.location.city}, {venue.location.country}
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Amenities</h3>
        <ul>
          {venue.meta.wifi && <li>WiFi</li>}
          {venue.meta.parking && <li>Parking</li>}
          {venue.meta.breakfast && <li>Breakfast</li>}
          {venue.meta.pets && <li>Pets allowed</li>}
        </ul>
      </div>
    </div>
  );
};

export default VenueDetail;
