"use client";

import { useState, useEffect } from "react";
import VenueCard from "../venue/VenueCard";
import { Venue } from "@/app/lib/types";
import LoadMoreButton from "./LoadMoreButton";
import { fetchVenues } from "@/app/lib/services/venue/fetchVenues";
import { useToast } from "@chakra-ui/react";

interface LoadMoreVenuesProps {
  initialVenues: Venue[];
  initialError?: string;
}

const LoadMoreVenues: React.FC<LoadMoreVenuesProps> = ({
  initialVenues,
  initialError,
}) => {
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(initialError || null);
  const toast = useToast();

  useEffect(() => {
    if (initialError) {
      toast({
        title: "Error loading venues",
        description: initialError,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [initialError, toast]);

  const loadMoreVenues = async () => {
    setLoading(true);
    setError(null);

    try {
      const newVenues = await fetchVenues(page);
      setVenues((prev) => [...prev, ...newVenues]);
      setPage(page + 1);
      if (newVenues.length < 20) {
        setHasMore(false);
      }
    } catch (error: any) {
      console.error("Error loading venues:", error);

      const errorMessage = error.message || "Failed to load more venues.";
      setError(errorMessage);

      toast({
        title: "Error loading more venues",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
      {hasMore && !error && (
        <LoadMoreButton loading={loading} onClick={loadMoreVenues} />
      )}
    </>
  );
};

export default LoadMoreVenues;
