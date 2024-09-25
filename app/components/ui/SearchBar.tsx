"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type SearchBarProps = {
  className?: string;
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
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location"
        className="sm:w-auto p-2 bg-white text-black placeholder-gray-500 focus:outline-none rounded"
      />

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date || undefined)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="w-full sm:w-auto p-2 border text-black rounded"
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date || undefined)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        placeholderText="End Date"
        className="w-full sm:w-auto p-2 border text-black rounded"
      />

      <button
        onClick={handleSearch}
        className="sm:w-auto px-5 py-2 bg-btnPrimary text-white rounded sm:rounded-r transition-all duration-200 ease-in-out transform hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
