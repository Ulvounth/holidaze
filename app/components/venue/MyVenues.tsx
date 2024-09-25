import Image from "next/image";
import { Venue } from "@/app/lib/types";
import EditVenueModalButton from "./EditVenueModalButton";
import VenueBookings from "./VenueBookings";

export default function MyVenues({ venues }: { venues: Venue[] }) {
  if (!venues || venues.length === 0) {
    return <div>No venues found.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Venues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="flex flex-col justify-between p-4 border border-gray-200 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center">
              {venue.media?.[0]?.url ? (
                <div className="relative w-full h-[250px] overflow-hidden">
                  <Image
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || "Venue image"}
                    width={200}
                    height={150}
                    className="rounded w-full h-[250px] object-cover transform transition-transform duration-300 hover:scale-105"
                    priority={true}
                  />
                </div>
              ) : (
                <div className="w-full h-[250px] bg-gray-300 flex items-center justify-center rounded">
                  No Image
                </div>
              )}
              <h3 className="text-lg font-semibold mt-3 text-center">
                {venue.name}
              </h3>
              <p className="text-center">
                Location: {venue.location.city}, {venue.location.country}
              </p>
              <p className="text-center text-pink-500 font-bold mt-1">
                Price: ${venue.price}/night
              </p>
              <p className="text-center">Max Guests: {venue.maxGuests}</p>
            </div>

            <div className="flex justify-between w-full mt-4 gap-2">
              <a
                href={`/venue/${venue.id}`}
                className="flex-grow p-2 bg-green-500 text-white rounded hover:bg-green-600 transform  transition-transform text-center"
              >
                View Venue
              </a>
              <EditVenueModalButton venue={venue} />
            </div>

            {venue.bookings && venue.bookings.length > 0 ? (
              <VenueBookings bookings={venue.bookings} venueId={venue.id} />
            ) : (
              <p className="mt-4 text-gray-500">No bookings yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
