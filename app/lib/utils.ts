import { z } from "zod";

export function getNoroffApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing API key, did you forget to add it to your .env file?"
    );
  }

  return apiKey;
}

const urlSchema = z.string().url({ message: "Invalid URL format" });

export const validateUrlAccessibility = async (
  url: string
): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const validateUrl = async (url: string): Promise<string | null> => {
  try {
    urlSchema.parse(url);

    const isAccessible = await validateUrlAccessibility(url);
    if (!isAccessible) {
      return "URL is not publicly accessible";
    }

    return null;
  } catch (error) {
    return error instanceof z.ZodError
      ? error.errors[0].message
      : "Invalid URL";
  }
};
