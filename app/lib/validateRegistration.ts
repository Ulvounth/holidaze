import { RegisterRequestBody } from "@/app/lib/types";

export default function validateRegistration({
  name,
  email,
  password,
  bio,
  avatar,
  banner,
}: RegisterRequestBody) {
  if (!name || !email || !password) {
    return "Name, email, and password are required";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  if (!emailRegex.test(email)) {
    return "Email must be a valid stud.noroff.no address";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (bio && bio.length > 160) {
    return "Bio must be less than 160 characters";
  }

  if (avatar && (!avatar.url || (avatar.alt && avatar.alt.length > 120))) {
    return "Avatar URL must be provided and alt text must be less than 120 characters";
  }

  if (banner && (!banner.url || (banner.alt && banner.alt.length > 120))) {
    return "Banner URL must be provided and alt text must be less than 120 characters";
  }

  return null; // No errors
}
