"use client";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { updateProfile } from "@/app/lib/services/profile/updateProfile";

type ProfileFormProps = {
  name: string;
  currentAvatarUrl: string;
  currentBio?: string;
};

export default function ProfileForm({
  name,
  currentAvatarUrl,
  currentBio,
}: ProfileFormProps) {
  const [bio, setBio] = useState(currentBio || "");
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl);
  const [avatarAlt, setAvatarAlt] = useState("User Avatar");
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateData = {
        bio: bio,
        avatar: {
          url: avatarUrl,
          alt: avatarAlt,
        },
      };

      await updateProfile(name, updateData);

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows={4}
        />
      </div>
      <div>
        <label className="block text-gray-700">Avatar URL</label>
        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Avatar Alt Text</label>
        <input
          type="text"
          value={avatarAlt}
          onChange={(e) => setAvatarAlt(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
      >
        Update Profile
      </button>
    </form>
  );
}
