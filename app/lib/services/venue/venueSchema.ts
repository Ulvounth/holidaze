import { z } from "zod";

// Define the venue location schema
export const locationSchema = z.object({
  address: z.string(),
  city: z.string(),
  zip: z.string(),
  country: z.string(),
  lat: z.number().optional().nullable(), // Latitude can be optional or null
  lng: z.number().optional().nullable(), // Longitude can be optional or null
});

export type LocationSchema = z.infer<typeof locationSchema>;
