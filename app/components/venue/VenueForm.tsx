"use client";

import { useState } from "react";
import VenueFormFields from "./VenueFormFields";
import { createVenue } from "@/app/lib/services/venue/createVenue";

const VenueForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mediaUrl: "",
    mediaAlt: "",
    price: 0,
    maxGuests: 0,
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: 0,
    lng: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Convert the value to a number if the input type is 'number'
    let newValue: string | number | boolean = value;
    if (type === "number") {
      newValue = value === "" ? "" : parseFloat(value); // Handle empty string case
    }

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      name: formData.name,
      description: formData.description,
      media: formData.mediaUrl
        ? [{ url: formData.mediaUrl, alt: formData.mediaAlt }]
        : [],
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: {
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        continent: formData.continent,
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      },
    };

    try {
      const data = await createVenue(formattedData);
      console.log("Venue created successfully:", data);
      // Handle success (e.g., clear form, show success message, etc.)
    } catch (error) {
      console.error("Error creating venue:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-6">Create a New Venue</h2>
      <VenueFormFields formData={formData} handleChange={handleChange} />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition-colors"
      >
        Create Venue
      </button>
    </form>
  );
};

export default VenueForm;
