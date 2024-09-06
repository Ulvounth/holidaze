"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateRangePickerProps = {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  setCheckOutDate: (date: Date | undefined) => void;
};

const DateRangePicker = ({
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: DateRangePickerProps) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Check-in</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date ?? undefined)}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={new Date()} // Disallow past dates
          className="w-full px-3 py-2 border rounded"
          placeholderText="Select check-in date"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Check-out</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date ?? undefined)}
          selectsEnd
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={checkInDate || new Date()} // Disallow dates before check-in
          className="w-full px-3 py-2 border rounded"
          placeholderText="Select check-out date"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
