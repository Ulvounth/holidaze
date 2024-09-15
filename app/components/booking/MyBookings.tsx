import Image from "next/image";
import { useRouter } from "next/navigation";
import { Booking } from "@/app/lib/types";
import { createAuthHeaders } from "@/app/lib/createAuthHeaders";
import { useAuth } from "@/app/lib/authContext";

export default function MyBookings({ bookings }: { bookings: Booking[] }) {
  const { user } = useAuth();
  const router = useRouter(); // Initialize the router for navigation

  if (!bookings || bookings.length === 0) {
    return <div>No bookings found.</div>;
  }

  const handleViewBooking = (venueId: string) => {
    // Redirect to the venue page when 'View Booking' is clicked
    router.push(`/venue/${venueId}`);
  };

  const handleCancelBooking = async (bookingId: string) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      const headers = await createAuthHeaders();

      const response = await fetch(`/api/booking/${bookingId}/delete`, {
        method: "DELETE",
        headers,
      });

      if (response.status === 204) {
        alert("Booking canceled successfully!");
        router.push(`/profile/${user?.name}`); // Navigate back to the profile page
      } else {
        const data = await response.json();
        alert(data.message || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col justify-between p-4 border-b bg-white shadow-md rounded-lg mb-4"
          >
            <div className="flex flex-col items-center">
              {booking.venue?.media?.[0]?.url ? (
                <div className="relative w-full h-[250px]">
                  <Image
                    src={booking.venue.media[0].url}
                    alt={booking.venue.media[0].alt || "Venue image"}
                    fill={true} // Use fill instead of layout="fill"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes for better performance
                    className="rounded object-cover" // Use Tailwind CSS for object fit
                    priority={true}
                  />
                </div>
              ) : (
                <div className="w-full h-[150px] bg-gray-300 flex items-center justify-center rounded">
                  No Image
                </div>
              )}
              <h3 className="text-lg font-semibold mt-2 text-center">
                {booking.venue.name}
              </h3>
              <p className="text-center">
                Location: {booking.venue.location.city},{" "}
                {booking.venue.location.country}
              </p>
              <p className="text-center">
                Date: {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>
              <p className="text-center">Guests: {booking.guests}</p>
            </div>

            {/* View and Cancel buttons */}
            <div className="flex justify-between w-full mt-4 gap-2">
              <button
                className="flex-grow p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleViewBooking(booking.venue.id)}
              >
                View Booking
              </button>
              <button
                className="flex-grow p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleCancelBooking(booking.id)}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
