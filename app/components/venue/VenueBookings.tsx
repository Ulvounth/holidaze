import { useState } from "react";
import { Booking } from "@/app/lib/types";

type VenueBookingsProps = {
  bookings: Booking[];
  venueId: string;
};

export default function VenueBookings({ bookings }: VenueBookingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleBookings = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mt-4">
      <h4 className="text-md font-semibold">
        Bookings:{" "}
        <button className="text-blue-500 underline" onClick={toggleBookings}>
          {isExpanded ? "Hide" : "Show"} Details
        </button>
      </h4>

      {isExpanded && (
        <ul className="list-inside mt-2 bg-gray-50 p-4 rounded-md shadow ">
          {bookings.map((booking) => (
            <li key={booking.id} className="mt-2 border-b-4">
              <div className="mb-2">
                <strong>Booked by:</strong>
                <div>Name: {booking.customer?.name || "Unknown"}</div>
                <div>Email: {booking.customer?.email || "Unknown"}</div>
              </div>
              <div>Guests: {booking.guests}</div>
              <div>
                Check-in: {new Date(booking.dateFrom).toLocaleDateString()}
              </div>
              <div>
                Check-out: {new Date(booking.dateTo).toLocaleDateString()}
              </div>
              <div>
                Days:{" "}
                {Math.ceil(
                  (new Date(booking.dateTo).getTime() -
                    new Date(booking.dateFrom).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
