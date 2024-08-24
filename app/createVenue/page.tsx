// pages/create-venue.tsx
import React from "react";
import VenueForm from "../components/venue/VenueForm";

const CreateVenuePage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Create a New Venue</h1>
      <VenueForm />
    </div>
  );
};

export default CreateVenuePage;
