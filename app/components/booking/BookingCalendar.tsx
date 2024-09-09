"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type BookingCalendarProps = {
  bookings: Array<{ from: Date; to: Date }>;
};

const BookingCalendar = ({ bookings }: BookingCalendarProps) => {
  const [hydrated, setHydrated] = useState(false);

  // Ensure the component is hydrated before rendering the calendar
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Convert Date objects to timestamps for consistent comparison
  const isDateBooked = (date: Date) => {
    const time = date.getTime();
    return bookings.some(
      (booking) =>
        time >= new Date(booking.from).getTime() &&
        time <= new Date(booking.to).getTime()
    );
  };

  if (!hydrated) {
    // Avoid rendering on the server to prevent hydration mismatch
    return null;
  }

  return (
    <div className="w-full bg-white p-4 shadow-md rounded-lg mt-6">
      <div className="text-xl font-semibold mb-4">Booking Availability</div>
      <Calendar
        tileDisabled={({ date }) => isDateBooked(date)}
        className="custom-calendar"
      />
    </div>
  );
};

export default BookingCalendar;
