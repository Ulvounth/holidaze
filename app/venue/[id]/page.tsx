import { fetchVenueById } from "@/app/lib/services/venue/fetchVenueById";
import { Metadata } from "next";
import BookingForm from "@/app/components/booking/BookingForm";
import BookingCalendar from "@/app/components/booking/BookingCalendar";
import { LocationMap } from "@/app/components/venue/LocationMap";
import CustomImage from "@/app/components/venue/CustomImage";

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Venue ${params.id}`,
    description: "Venue details",
  };
};

export default async function VenuePage({ params }: Props) {
  try {
    const venue = await fetchVenueById(params.id);

    if (!venue) {
      throw new Error("Venue not found");
    }

    const {
      name,
      description,
      price,
      maxGuests,
      rating,
      meta,
      location,
      owner,
      bookings = [],
    } = venue;

    const bookedDates = bookings.map((booking: any) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    }));

    return (
      <div className="container mx-auto py-6 px-4 lg:px-0 border-t-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative mb-4 rounded overflow-hidden">
              <CustomImage
                src={venue.media[0]?.url || "/images/placeholder.webp"}
                alt={venue.media[0]?.alt || venue.name}
                width={1200}
                height={800}
                className="w-full venueByIdImg object-cover"
                priority
              />
            </div>

            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-lg mr-2">
                {"★".repeat(rating)}
              </span>
              <span>{rating} reviews</span>
            </div>
            <p className="text-gray-700">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {meta.breakfast && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                  Breakfast
                </span>
              )}
              {meta.parking && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                  Parking
                </span>
              )}
              {meta.wifi && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                  Wifi
                </span>
              )}
              {meta.pets && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                  Pets allowed
                </span>
              )}
              <span className="px-3 py-1 bg-gray-200 rounded">
                {maxGuests} guests
              </span>
            </div>
            <div className="w-full mt-6">
              <BookingCalendar bookings={bookedDates} />
            </div>
          </div>
          <div>
            <div className="bg-white p-4 shadow rounded mb-6">
              <div className="text-2xl font-bold mb-4">${price} / night</div>
              <BookingForm
                venueId={params.id}
                price={price}
                maxGuests={maxGuests}
                bookedDates={bookedDates}
              />
            </div>
            <div className="bg-white p-4 shadow rounded mb-6">
              <div className="flex items-center">
                <div className="relative w-10 h-10">
                  <CustomImage
                    src={owner.avatar.url}
                    alt={owner.avatar.alt}
                    width={40}
                    height={40}
                    className="h-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <div>{owner.name}</div>
                  <div className="text-sm text-gray-600">Owner</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 shadow rounded">
              <div className="text-lg font-bold mb-4">Location</div>
              <div className="text-sm text-gray-600">
                {location.city}, {location.country}
              </div>
              <div className="mt-4">
                <LocationMap location={location} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("Error loading venue details:", error);
    const errorMessage =
      error.message || "Failed to load venue details. Please try again later.";
    return (
      <div className="container mx-auto py-6 px-4 lg:px-12">
        <h2 className="text-2xl font-bold text-red-500">{errorMessage}</h2>
      </div>
    );
  }
}
