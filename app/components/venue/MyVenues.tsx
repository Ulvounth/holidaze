import Image from "next/image";
import { Venue } from "@/app/lib/types";
import EditVenueModalButton from "./EditVenueModalButton"; // Client-side modal button

export default function MyVenues({ venues }: { venues: Venue[] }) {
  if (!venues || venues.length === 0) {
    return <div>No venues found.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Venues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="flex flex-col justify-between p-4 border-b bg-white shadow-md rounded-lg mb-4"
          >
            <div className="flex flex-col items-center">
              {venue.media?.[0]?.url ? (
                <Image
                  src={venue.media[0].url}
                  alt={venue.media[0].alt || "Venue image"}
                  width={200}
                  height={150}
                  className="rounded w-full object-cover"
                  priority={true} // Adding priority to improve loading performance
                />
              ) : (
                <div className="w-full h-[150px] bg-gray-300 flex items-center justify-center rounded">
                  No Image
                </div>
              )}
              <h3 className="text-lg font-semibold mt-2 text-center">
                {venue.name}
              </h3>
              <p className="text-center">
                Location: {venue.location.city}, {venue.location.country}
              </p>
              <p className="text-center">Price: ${venue.price}/night</p>
              <p className="text-center">Max Guests: {venue.maxGuests}</p>
            </div>
            <div className="flex justify-between w-full mt-4 gap-2">
              <a
                href={`/venue/${venue.id}`}
                className="flex-grow p-2 bg-green-500 text-white rounded hover:bg-green-600 text-center"
              >
                View Venue
              </a>
              {/* Client-Side Modal Trigger Button */}
              <EditVenueModalButton venue={venue} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
