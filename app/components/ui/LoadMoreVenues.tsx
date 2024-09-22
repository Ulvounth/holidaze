"use client";

import { useState } from "react";
import VenueCard from "../venue/VenueCard";
import { Venue } from "@/app/lib/types";
import LoadMoreButton from "./LoadMoreButton";
import { fetchVenues } from "@/app/lib/services/venue/fetchVenues";

interface LoadMoreVenuesProps {
  initialVenues: Venue[];
}

const LoadMoreVenues: React.FC<LoadMoreVenuesProps> = ({ initialVenues }) => {
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreVenues = async () => {
    setLoading(true);
    try {
      const newVenues = await fetchVenues(page);
      setVenues((prev) => [...prev, ...newVenues]);
      setPage(page + 1);
      if (newVenues.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading venues:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
      {hasMore && <LoadMoreButton loading={loading} onClick={loadMoreVenues} />}
    </>
  );
};

export default LoadMoreVenues;
