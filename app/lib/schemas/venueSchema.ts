import { z } from "zod";

export const venueSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name cannot exceed 100 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }) // Increased minimum characters
    .max(1000, { message: "Description cannot exceed 1000 characters" }),
  media: z
    .array(
      z.object({
        url: z
          .string()
          .url({ message: "Invalid URL format" })
          .optional()
          .or(z.literal("")), // Optional and can be an empty string
        alt: z.string().optional().default("venue image"), // Default value
      })
    )
    .optional()
    .default([]), // Default empty array
  price: z
    .number()
    .min(1, { message: "Price must be greater than 0" })
    .default(1), // Default minimum price
  maxGuests: z
    .number()
    .min(1, { message: "Max guests must be greater than 0" })
    .default(1), // Default minimum guests
  rating: z.number().min(0).max(5).optional().default(0), // Optional with default
  meta: z.object({
    wifi: z.boolean().optional().default(false), // Default value for boolean
    parking: z.boolean().optional().default(false),
    breakfast: z.boolean().optional().default(false),
    pets: z.boolean().optional().default(false),
  }),
  location: z.object({
    address: z.string().optional().default(""), // Default empty string
    city: z.string().optional().default(""),
    zip: z.string().optional().default(""),
    country: z.string().optional().default(""),
    continent: z.string().optional().default(""),
    lat: z.number().optional().default(0), // Default lat/long as 0
    lng: z.number().optional().default(0),
  }),
});

export type VenueFormSchema = z.infer<typeof venueSchema>;
