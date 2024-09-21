"use server";

import { cookies } from "next/headers";
import { getNoroffApiKey } from "./utils";

export async function createAuthHeaders(): Promise<Headers> {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("No access token found in cookies");
  }

  const apiKey = getNoroffApiKey();

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("X-Noroff-API-Key", apiKey);

  return headers;
}
