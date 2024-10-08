"use client";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { createBooking } from "@/app/lib/services/booking/createBooking";
import DateRangePicker from "./DateRangePicker";
import Button from "../ui/Button";
import { useAuth } from "@/app/lib/context/authContext";
import { useModal } from "@/app/lib/context/ModalContext";

type BookingFormProps = {
  venueId: string;
  price: number;
  maxGuests: number;
  bookedDates: Array<{ from: Date; to: Date }>;
};

export default function BookingForm({
  venueId,
  price,
  maxGuests,
  bookedDates,
}: BookingFormProps) {
  const { isLoggedIn } = useAuth();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const toast = useToast();

  const { openLoginModal, openRegisterModal } = useModal();

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

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return price * (nights >= 1 ? nights : 1);
  };

  const nights = calculateNights();
  const totalPrice = calculateTotalPrice();

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-100 p-4 rounded shadow">
        <p className="text-center text-gray-600 mb-4">
          Please{" "}
          <button
            onClick={openLoginModal}
            className="text-blue-500 underline hover:text-blue-700"
          >
            log in
          </button>{" "}
          or{" "}
          <button
            onClick={openRegisterModal}
            className="text-blue-500 underline hover:text-blue-700"
          >
            register
          </button>{" "}
          to book a venue.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <DateRangePicker
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        bookedDates={bookedDates}
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

      <div className="mb-4">
        <div className="text-lg">
          ${price} x {nights} night{nights > 1 ? "s" : ""}
        </div>
        <div className="text-2xl font-bold">Total: ${totalPrice}</div>
      </div>

      <Button label="Book Now" type="submit" className=""></Button>
    </form>
  );
}
