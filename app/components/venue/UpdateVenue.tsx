"use client";

import { useState } from "react";
import { useToast } from "@chakra-ui/react"; // Import Chakra Toast
import { createAuthHeaders } from "@/app/lib/createAuthHeaders";
import { Venue } from "@/app/lib/types";

type UpdateVenueFormProps = {
  venue: Venue;
  onSuccess: () => void;
};

const UpdateVenueForm = ({ venue, onSuccess }: UpdateVenueFormProps) => {
  const [formData, setFormData] = useState({
    name: venue.name,
    description: venue.description,
    price: venue.price,
    maxGuests: venue.maxGuests,
    media: venue.media,
    meta: venue.meta,
    location: venue.location,
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast(); // Initialize toast

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formattedFormData = {
      ...formData,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
    };

    try {
      const response = await fetch(`/api/venue/${venue.id}/update`, {
        method: "PUT",
        headers: await createAuthHeaders(),
        body: JSON.stringify(formattedFormData),
      });

      if (response.ok) {
        toast({
          title: "Venue updated",
          description: "The venue has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        onSuccess();
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.message || "Failed to update venue.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error updating venue:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while updating the venue. Please try again.",
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
    <form
      onSubmit={handleSubmit}
      className="w-full p-4 bg-white shadow rounded"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
          Price per night
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="maxGuests"
          className="block text-gray-700 font-bold mb-2"
        >
          Max Guests
        </label>
        <input
          type="number"
          id="maxGuests"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? "Updating..." : "Update Venue"}
      </button>
    </form>
  );
};

export default UpdateVenueForm;
