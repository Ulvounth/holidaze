"use client";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { createBooking } from "@/app/lib/services/booking/createBooking";
import DateRangePicker from "./DateRangePicker";

type BookingFormProps = {
  venueId: string;
  price: number;
  maxGuests: number;
  bookedDates: Array<{ from: Date; to: Date }>; // Add bookedDates prop
};

export default function BookingForm({
  venueId,
  price,
  maxGuests,
  bookedDates, // Get bookedDates
}: BookingFormProps) {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Error",
        description: "Please select both check-in and check-out dates.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      await createBooking({
        venueId,
        dateFrom: checkInDate.toISOString(),
        dateTo: checkOutDate.toISOString(),
        guests,
      });

      toast({
        title: "Booking Confirmed",
        description: "Your booking has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Function to calculate the number of nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Ensure rounding up to the nearest day
  };

  // Function to calculate the total price based on nights
  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return price * (nights >= 1 ? nights : 1);
  };

  const nights = calculateNights();
  const totalPrice = calculateTotalPrice();

  return (
    <form onSubmit={handleSubmit}>
      <DateRangePicker
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        bookedDates={bookedDates} // Pass bookedDates to DateRangePicker
      />
      <div className="mb-4">
        <label className="block text-gray-700">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded"
          required
        >
          {Array.from({ length: maxGuests }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} guest{i + 1 > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Display Price per night and total price */}
      <div className="mb-4">
        <div className="text-lg">
          ${price} x {nights} night{nights > 1 ? "s" : ""}
        </div>
        <div className="text-2xl font-bold">Total: ${totalPrice}</div>
      </div>

      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
      >
        Book Now
      </button>
    </form>
  );
}
