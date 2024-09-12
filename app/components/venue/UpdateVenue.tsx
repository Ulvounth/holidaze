"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAuthHeaders } from "@/app/lib/createAuthHeaders";

type UpdateVenueFormProps = {
  venue: {
    owner: any;
    id: string;
    name: string;
    description: string;
    price: number;
    maxGuests: number;
    media: { url: string; alt: string }[];
    meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
    };
    location: {
      address: string;
      city: string;
      zip: string;
      country: string;
      continent: string;
      lat: number;
      lng: number;
    };
  };
};

const UpdateVenueForm = ({ venue }: UpdateVenueFormProps) => {
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
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Safely cast target to HTMLInputElement for checkbox

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/venue/${venue.id}/update`, {
        method: "PUT",
        headers: await createAuthHeaders(), // Use createAuthHeaders for authentication
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Venue updated successfully!");
        router.push(`/`);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to update venue.");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-4 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Update Venue</h2>
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

      {/* Add more fields for media, meta (wifi, parking, etc.), and location if needed */}

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
