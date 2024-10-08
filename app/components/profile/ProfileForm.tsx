"use client";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { updateProfile } from "@/app/lib/services/profile/updateProfile";
import Button from "../ui/Button";

type ProfileFormProps = {
  name: string;
  currentAvatarUrl: string;
  currentBio?: string;
  currentBannerUrl?: string;
};

export default function ProfileForm({
  name,
  currentAvatarUrl,
  currentBio,
  currentBannerUrl,
}: ProfileFormProps) {
  const [bio, setBio] = useState(currentBio || "");
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl);
  const [avatarAlt, setAvatarAlt] = useState("User Avatar");
  const [bannerUrl, setBannerUrl] = useState(currentBannerUrl || "");
  const [bannerAlt, setBannerAlt] = useState("Banner Image");

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateData = {
        bio: bio,
        avatar: {
          url:
            avatarUrl ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
          alt: avatarAlt || "User Avatar",
        },
        banner: {
          url:
            bannerUrl ||
            "https://images.unsplash.com/photo-1511285605577-4d62fb50d2f7?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: bannerAlt || "Banner Image",
        },
      };

      await updateProfile(name, updateData);

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
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
      <div>
        <label className="block text-gray-700">Banner URL</label>
        <input
          type="url"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Banner Alt Text</label>
        <input
          type="text"
          value={bannerAlt}
          onChange={(e) => setBannerAlt(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <Button label="Update Profile" type="submit" className=""></Button>
    </form>
  );
}
