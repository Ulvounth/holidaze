import { z } from "zod";

export const venueSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 characters" }),
  media: z
    .array(
      z.object({
        url: z
          .string()
          .url({ message: "Invalid URL format" })
          .optional() // Media URL is now optional
          .or(z.literal("")),
        alt: z.string().optional(),
      })
    )
    .optional(),
  price: z.number().min(1, { message: "Price must be greater than 0" }),
  maxGuests: z
    .number()
    .min(1, { message: "Max guests must be greater than 0" }),
  rating: z.number().min(0).max(5).optional(),
  meta: z.object({
    wifi: z.boolean().optional(),
    parking: z.boolean().optional(),
    breakfast: z.boolean().optional(),
    pets: z.boolean().optional(),
  }),
  location: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    continent: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
});

export type VenueFormSchema = z.infer<typeof venueSchema>;
