import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Booking } from "@/app/lib/types";
import { createAuthHeaders } from "@/app/lib/utils/createAuthHeaders";
import { useToast } from "@chakra-ui/react";
import ConfirmModal from "../ui/ConfirmModal";

export default function MyBookings({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const toast = useToast();
  const [bookingList, setBookingList] = useState(bookings);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const handleViewBooking = (venueId: string) => {
    router.push(`/venue/${venueId}`);
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;

    setIsCancelLoading(true);
    try {
      const headers = await createAuthHeaders();
      const response = await fetch(`/api/booking/${selectedBookingId}/delete`, {
        method: "DELETE",
        headers,
      });

      if (response.status === 204) {
        toast({
          title: "Booking canceled.",
          description: "Booking canceled successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        setBookingList((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== selectedBookingId)
        );
        setIsModalOpen(false);
      } else {
        const data = await response.json();
        console.error("Error canceling booking:", data);

        toast({
          title: "Booking cancel error.",
          description: data.message || "Failed to cancel booking.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error: any) {
      // Catch the detailed error thrown by deleteBooking
      console.error("Error canceling booking:", error);

      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsCancelLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookingList.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col justify-between p-4 border bg-white shadow-lg rounded-lg mb-4 transition-shadow hover:shadow-xl"
          >
            <div className="flex flex-col items-center">
              {booking.venue?.media?.[0]?.url ? (
                <div className="relative w-full h-[250px] overflow-hidden rounded-lg">
                  <Image
                    src={booking.venue.media[0].url}
                    alt={booking.venue.media[0].alt || "Venue image"}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform"
                    priority={true}
                  />
                </div>
              ) : (
                <div className="w-full h-[150px] bg-gray-300 flex items-center justify-center rounded-lg">
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

            <div className="flex justify-between w-full mt-4 gap-2">
              <button
                className="flex-grow p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => handleViewBooking(booking.venue.id)}
              >
                View Booking
              </button>
              <button
                className="flex-grow p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={() => {
                  setSelectedBookingId(booking.id);
                  setIsModalOpen(true);
                }}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Cancel Booking"
        description="Are you sure you want to cancel this booking? This action cannot be undone."
        onConfirm={handleCancelBooking}
        onCancel={() => setIsModalOpen(false)}
        isLoading={isCancelLoading}
      />
    </div>
  );
}
