// app/components/BookingForm.tsx

"use client";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";

type BookingFormProps = {
  venueId: string;
  price: number;
};

export default function BookingForm({ venueId, price }: BookingFormProps) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
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
      });
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          venueId,
          dateFrom: new Date(checkInDate).toISOString(),
          dateTo: new Date(checkOutDate).toISOString(),
          guests,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book the venue. Please try again.");
      }

      toast({
        title: "Booking Confirmed",
        description: "Your booking has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const calculateTotalPrice = () => {
    const dateFrom = new Date(checkInDate);
    const dateTo = new Date(checkOutDate);
    const days = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 3600 * 24);
    return price * (days || 1); // Ensure a minimum of 1 day is calculated
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Check-in</label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Check-out</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} guest{i + 1 > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <div className="text-lg">
          ${price} x{" "}
          {checkInDate && checkOutDate ? calculateTotalPrice() : "..."} nights
        </div>
        <div className="text-2xl font-bold">
          Total: ${calculateTotalPrice()}
        </div>
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
