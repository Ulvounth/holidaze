"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type SearchBarProps = {
  className?: string; // Accept className as a prop
};

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const router = useRouter();

  const handleSearch = () => {
    const searchParams: Record<string, string> = {};
    if (query) searchParams.query = query;
    if (startDate) searchParams.startDate = startDate.toISOString();
    if (endDate) searchParams.endDate = endDate.toISOString();

    const queryString = new URLSearchParams(searchParams).toString();
    router.push(`/search?${queryString}`);
  };

  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-2 rounded ${
        className || ""
      }`}
    >
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location"
        className="sm:w-auto p-2 bg-white text-black placeholder-gray-500 focus:outline-none rounded"
      />
      {/* Start Date Picker */}
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date || undefined)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="w-full sm:w-auto p-2 border text-black rounded"
      />
      {/* End Date Picker */}
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date || undefined)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        placeholderText="End Date"
        className="w-full sm:w-auto p-2 border text-black rounded"
      />
      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="sm:w-auto p-2 bg-pink-500 text-white rounded sm:rounded-r"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
