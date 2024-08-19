import { fetchVenueById } from "@/app/lib/services/venue/fetchVenueById";
import Image from "next/image";
import UserMessage from "@/app/components/ui/UserMessage";

export default async function VenuePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const venue = await fetchVenueById(params.id);

    if (!venue) {
      throw new Error("Venue not found");
    }

    // Extract fields from venue object
    const {
      name,
      description,
      media,
      price,
      maxGuests,
      rating,
      meta,
      location,
    } = venue;

    // Handle media - use a default image if media array is empty or undefined
    const imageUrl =
      media && media.length > 0 ? media[0].url : "/images/hero.jpg";
    const imageAlt = media && media.length > 0 ? media[0].alt : name;

    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={800} // Provide actual width
          height={400} // Provide actual height
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <p>{description}</p>
        {/* Other details */}
      </div>
    );
  } catch (error) {
    let errorMessage =
      "We're sorry, but we couldn't load the venue details. Please try again later.";

    if (error instanceof Error) {
      if (error.message === "Venue not found") {
        errorMessage =
          "The venue you're looking for doesn't exist. It might have been removed or you may have followed a broken link.";
      }
    }

    return (
      <div className="container mx-auto py-6">
        <UserMessage
          type="error"
          title="Oops! Something went wrong."
          message={errorMessage}
          actionLink="/"
          actionText="Go back to the homepage"
        />
      </div>
    );
  }
}
