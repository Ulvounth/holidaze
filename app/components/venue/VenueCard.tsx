import Link from "next/link";
import CustomImage from "./CustomImage";
import { Venue } from "@/app/lib/types";

interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    <Link
      href={`/venue/${venue.id}`}
      className="block bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="relative">
        <CustomImage
          src={venue.media[0]?.url || "/images/placeholder.webp"}
          alt={venue.media[0]?.alt || venue.name}
          width={500}
          height={300}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4 bg-yellow-400 text-black rounded-full px-3 py-1 text-sm font-semibold">
          {venue.location.city}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{venue.name}</h3>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < venue.rating ? "text-yellow-500" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.262 2.372 9.738 2 10.311 2c.573 0 1.05.372 1.262.927l1.18 3.632h3.858c.564 0 1.059.356 1.2.906.141.551-.058 1.148-.5 1.513L13.5 11.27l1.18 3.633c.204.631-.038 1.322-.5 1.516-.463.193-1.024.093-1.351-.237L10 13.88l-2.829 2.302c-.327.33-.889.43-1.351.237-.462-.193-.704-.885-.5-1.516L6.5 11.27l-3.511-2.292c-.442-.365-.641-.962-.5-1.513.141-.55.636-.906 1.2-.906h3.858l1.18-3.632z" />
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {venue.rating.toFixed(1)} / 5.0
          </span>
        </div>
        <p className="text-gray-600">{venue.meta.reviews} reviews</p>
        <p className="text-pink-500 mt-2">${venue.price} / night</p>
      </div>
    </Link>
  );
};

export default VenueCard;
