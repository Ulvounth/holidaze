import Link from "next/link";
import CustomImage from "./CustomImage";
import { Venue } from "@/app/lib/types";
import RatingStar from "./RatingStar";

interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    <Link
      href={`/venue/${venue.id}`}
      className="block bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="relative">
        <CustomImage
          src={venue.media[0]?.url || "/images/placeholder.webp"}
          alt={venue.media[0]?.alt || venue.name}
          width={500}
          height={300}
          className="w-full h-64 object-cover"
        />
        {venue.location.city && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-black rounded-full px-3 py-1 text-sm font-semibold">
            {venue.location.city}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold">{venue.name}</h3>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <RatingStar key={i} filled={i < venue.rating} />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {venue.rating.toFixed(1)} / 5.0
          </span>
        </div>
        <p className="text-gray-600 mt-1">{venue.meta.reviews}</p>
        <p className="text-pink-500 text-lg font-bold mt-3">
          ${venue.price} / night
        </p>
      </div>
    </Link>
  );
};

export default VenueCard;
