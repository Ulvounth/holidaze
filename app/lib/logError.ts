// app/lib/logger.ts
export function logError(message: string, error?: Error) {
  console.error(message);
  if (error) {
    console.error(error);
  }
}
