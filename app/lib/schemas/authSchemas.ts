import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@stud.noroff.no"), {
      message: "Email must be a valid stud.noroff.no address",
    }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name is required" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Name must not contain spaces or special characters except underscores.",
    }),
  email: z
    .string()
    .email()
    .regex(
      /@stud\.noroff\.no$/,
      "Email must be a valid stud.noroff.no address"
    ),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  bio: z.string().max(160, "Bio must be less than 160 characters").optional(),
  avatarUrl: z.string().url("Avatar URL must be a valid URL").optional(),
  avatarAlt: z
    .string()
    .max(120, "Avatar alt text must be less than 120 characters")
    .optional(),
  bannerUrl: z.string().url("Banner URL must be a valid URL").optional(),
  bannerAlt: z
    .string()
    .max(120, "Banner alt text must be less than 120 characters")
    .optional(),
  venueManager: z.boolean().optional(),
});
