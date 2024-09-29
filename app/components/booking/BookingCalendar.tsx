"use client";

import { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type BookingCalendarProps = {
  bookings: Array<{ from: Date; to: Date }>;
};

const BookingCalendar = ({ bookings }: BookingCalendarProps) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isDateBooked = useCallback(
    (date: Date) => {
      const time = date.getTime();
      return bookings.some(
        (booking) =>
          time >= new Date(booking.from).getTime() &&
          time <= new Date(booking.to).getTime()
      );
    },
    [bookings]
  );

  if (!hydrated) {
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
