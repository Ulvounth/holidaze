"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type BookingCalendarProps = {
  bookings: Array<{ from: Date; to: Date }>;
};

const BookingCalendar = ({ bookings }: BookingCalendarProps) => {
  return (
    <div className="w-full bg-white p-4 shadow rounded mt-6">
      <div className="text-lg font-bold mb-4">Available Dates</div>
      <Calendar
        tileDisabled={({ date }) =>
          bookings.some((booking) => date >= booking.from && date <= booking.to)
        }
        tileClassName={({ date }) => {
          if (
            bookings.some(
              (booking) => date >= booking.from && date <= booking.to
            )
          ) {
            return "booked"; // Apply a class for booked dates
          }
          return "";
        }}
        className="custom-calendar"
      />
    </div>
  );
};

export default BookingCalendar;
