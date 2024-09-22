import { fetchVenueById } from "@/app/lib/services/venue/fetchVenueById";
import Image from "next/image";
import { Metadata } from "next";
import BookingForm from "@/app/components/booking/BookingForm";
import BookingCalendar from "@/app/components/booking/BookingCalendar";
import { LocationMap } from "@/app/components/venue/LocationMap";

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
      media,
      price,
      maxGuests,
      rating,
      meta,
      location,
      owner,
      bookings = [],
    } = venue;

    const imageUrl =
      media && media.length > 0 ? media[0].url : "/images/placeholder.webp";
    const imageAlt = media && media.length > 0 ? media[0].alt : name;

    const shouldUnoptimize = imageUrl.includes("istockphoto.com");

    const bookedDates = bookings.map((booking: any) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    }));

    return (
      <div className="container mx-auto py-6 px-4 lg:px-0 border-t-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative w-full h-64 lg:h-96 mb-4 rounded overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                className="object-cover rounded"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={shouldUnoptimize}
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
                  <Image
                    src={owner.avatar.url}
                    alt={owner.avatar.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40px"
                    loading="lazy"
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
  } catch (error) {
    console.error("Error loading venue details:", error);
    return <div>Failed to load venue details. Please try again later.</div>;
  }
}
