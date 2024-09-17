// services/profiles/updateProfile.ts
import { API_BASE_URL } from "@/app/lib/constants";
import { ProfileUpdateData } from "@/app/lib/types";
import { createAuthHeaders } from "@/app/lib/createAuthHeaders";

export const updateProfile = async (
  name: string,
  updateData: ProfileUpdateData
) => {
  try {
    const headers = await createAuthHeaders();

    const response = await fetch(`${API_BASE_URL}holidaze/profiles/${name}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
