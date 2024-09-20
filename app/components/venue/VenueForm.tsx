"use client";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { venueSchema, VenueFormSchema } from "@/app/lib/schemas/venueSchema";
import VenueFormFields from "./VenueFormFields";
import { createVenue } from "@/app/lib/services/venue/createVenue";
import { formatVenueData } from "@/app/lib/formatVenueData";

const VenueForm = () => {
  const [formData, setFormData] = useState<VenueFormSchema>({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | number | boolean = value;

    if (type === "number") {
      newValue = value === "" ? "" : parseFloat(value);
    } else if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data using Zod schema
    const validation = venueSchema.safeParse(formData);
    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    const formattedData = formatVenueData(formData);

    try {
      await createVenue(formattedData);

      toast({
        title: "Venue created.",
        description: "Your venue has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      router.push(`/`);
    } catch (error: any) {
      console.error("Error creating venue:", error);

      const errorMessage =
        error?.errors?.[0]?.message ||
        "Unable to create venue. Please try again.";

      toast({
        title: "An error occurred.",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-6">Create a New Venue</h2>
      <VenueFormFields
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />
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
