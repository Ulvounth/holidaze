"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import VenueCard from "../components/venue/VenueCard";
import { fetchSearchResults } from "../lib/services/fetchSearchResults";
import { Venue } from "@/app/lib/types";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const [results, setResults] = useState<Venue[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const venues = await fetchSearchResults(
          query || "",
          startDate || undefined,
          endDate || undefined
        );

        setResults(venues);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query, startDate, endDate]);

  return (
    <div className="container mx-auto py-6 px-4 border-t-2">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
