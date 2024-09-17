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
    <div className={`flex items-center space-x-2 ${className || ""}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location"
        className="p-2 rounded-l bg-white text-black placeholder-gray-500 focus:outline-none"
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date || undefined)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="p-2 border text-black"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date || undefined)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        placeholderText="End Date"
        className="p-2 border text-black"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-pink-500 text-white rounded-r"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
