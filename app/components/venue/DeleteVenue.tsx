"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/context/authContext";
import { createAuthHeaders } from "@/app/lib/utils/createAuthHeaders";
import ConfirmModal from "../ui/ConfirmModal"; // Import the modal component
import { useToast } from "@chakra-ui/react"; // Import the Chakra toast

type DeleteVenueButtonProps = {
  venueId: string;
  onClose: () => void;
};

const DeleteVenueButton = ({ venueId, onClose }: DeleteVenueButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast(); // Initialize the toast

  if (!user) {
    return null;
  }

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/venue/${venueId}/delete`, {
        method: "DELETE",
        headers: await createAuthHeaders(),
      });

      if (response.status === 204) {
        toast({
          title: "Venue deleted.",
          description: "The venue has been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        onClose();
      } else {
        const data = await response.json();
        toast({
          title: "Failed to delete venue.",
          description:
            data.message || "Something went wrong. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
      toast({
        title: "Error",
        description: "Unable to delete venue. Please try again later.",
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
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete Venue
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Venue"
        description="Are you sure you want to delete this venue? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        isLoading={loading}
      />
    </>
  );
};

export default DeleteVenueButton;
