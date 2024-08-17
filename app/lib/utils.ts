export function getNoroffApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing API key, did you forget to add it to your .env file?"
    );
  }

  return apiKey;
}
