"use client";

import { useState } from "react";

import { useAuth } from "@/app/lib/authContext";
import { createAuthHeaders } from "@/app/lib/createAuthHeaders";

type DeleteVenueButtonProps = {
  venueId: string;
  onClose: () => void;
};

const DeleteVenueButton = ({ venueId, onClose }: DeleteVenueButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return null;
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/venue/${venueId}/delete`, {
        method: "DELETE",
        headers: await createAuthHeaders(),
      });

      if (response.status === 204) {
        alert("Venue deleted successfully!");
        onClose();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete venue.");
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      {loading ? "Deleting..." : "Delete Venue"}
    </button>
  );
};

export default DeleteVenueButton;
