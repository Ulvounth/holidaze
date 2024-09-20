export const formatVenueData = (formData: Record<string, any>) => {
  return {
    name: formData.name,
    description: formData.description,
    media: formData.mediaUrl
      ? [{ url: formData.mediaUrl, alt: formData.mediaAlt }]
      : [],
    price: Number(formData.price),
    maxGuests: Number(formData.maxGuests),
    rating: Number(formData.rating), // Add the rating field here
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
};
