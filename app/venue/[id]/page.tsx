import { fetchVenueById } from "@/app/lib/services/venue/fetchVenueById";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
    description: string;
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
    console.error("Error loading venue details:", error);
  }
}
