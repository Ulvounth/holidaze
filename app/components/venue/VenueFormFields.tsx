import React from "react";

interface VenueFormFieldsProps {
  formData: Record<string, any>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: Record<string, string>;
}

const VenueFormFields: React.FC<VenueFormFieldsProps> = ({
  formData,
  handleChange,
  errors,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Media URL
        </label>
        <input
          type="text"
          name="mediaUrl"
          value={formData.media[0]?.url || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        {errors.media && <p className="text-red-500">{errors.media}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Media Alt Text
        </label>
        <input
          type="text"
          name="mediaAlt"
          value={formData.media[0]?.alt || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        {errors.price && <p className="text-red-500">{errors.price}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Max Guests
        </label>
        <input
          type="number"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        {errors.maxGuests && <p className="text-red-500">{errors.maxGuests}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Rating (0-5)
        </label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min={0}
          max={5}
          step={0.1}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="wifi"
            checked={formData.meta?.wifi}
            onChange={handleChange}
            className="mr-2"
          />
          WiFi
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="parking"
            checked={formData.meta?.parking}
            onChange={handleChange}
            className="mr-2"
          />
          Parking
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="breakfast"
            checked={formData.meta?.breakfast}
            onChange={handleChange}
            className="mr-2"
          />
          Breakfast
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="pets"
            checked={formData.meta?.pets}
            onChange={handleChange}
            className="mr-2"
          />
          Pets
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.location?.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">City</label>
        <input
          type="text"
          name="city"
          value={formData.location?.city}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          ZIP Code
        </label>
        <input
          type="text"
          name="zip"
          value={formData.location?.zip}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Country
        </label>
        <input
          type="text"
          name="country"
          value={formData.location?.country}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Continent
        </label>
        <input
          type="text"
          name="continent"
          value={formData.location?.continent}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Latitude
        </label>
        <input
          type="number"
          name="lat"
          value={formData.location?.lat}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Longitude
        </label>
        <input
          type="number"
          name="lng"
          value={formData.location?.lng}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </>
  );
};

export default VenueFormFields;
