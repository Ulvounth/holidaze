import { API_BASE_URL } from "@/app/lib/utils/constants";
import { ProfileUpdateData } from "@/app/lib/types";
import { createAuthHeaders } from "@/app/lib/utils/createAuthHeaders";

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
      throw new Error(
        errorData.errors?.[0]?.message || "Failed to update profile"
      );
    }

    return response.json();
  } catch (error) {
    console.error(`Error updating profile for ${name}:`, error);
    throw error;
  }
};
