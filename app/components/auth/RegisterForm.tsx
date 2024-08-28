"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import InputField from "../ui/InputField";

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
    venueManager: false,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email, and password are required");
      return;
    }

    if (!formData.email.endsWith("@stud.noroff.no")) {
      setError("Email must be a valid stud.noroff.no address");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Only validate bio, avatar, and banner fields if they are provided
    if (formData.bio && formData.bio.length > 160) {
      setError("Bio must be less than 160 characters");
      return;
    }

    if (formData.avatarUrl && formData.avatarAlt.length > 120) {
      setError("Avatar alt text must be less than 120 characters");
      return;
    }

    if (formData.bannerUrl && formData.bannerAlt.length > 120) {
      setError("Banner alt text must be less than 120 characters");
      return;
    }

    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          bio: formData.bio || undefined,
          avatar: formData.avatarUrl
            ? { url: formData.avatarUrl, alt: formData.avatarAlt }
            : undefined,
          banner: formData.bannerUrl
            ? { url: formData.bannerUrl, alt: formData.bannerAlt }
            : undefined,
          venueManager: formData.venueManager,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Show success toast
      toast({
        title: "Registration successful!",
        description: "You have registered successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirect to the homepage or other desired page after successful registration
      router.push("/");
      onClose();
    } catch (err: any) {
      setError(err.message);

      // Show error toast
      toast({
        title: "Registration failed",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="name"
        label="Name"
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        name="name"
        required
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="email@stud.noroff.no"
        value={formData.email}
        onChange={handleChange}
        name="email"
        required
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        name="password"
        required
      />
      <InputField
        id="bio"
        label="Bio"
        type="textarea"
        placeholder="Tell us about yourself"
        value={formData.bio}
        onChange={handleChange}
        name="bio"
      />
      <InputField
        id="avatarUrl"
        label="Avatar URL"
        type="url"
        placeholder="https://example.com/avatar.jpg"
        value={formData.avatarUrl}
        onChange={handleChange}
        name="avatarUrl"
      />
      <InputField
        id="avatarAlt"
        label="Avatar Alt Text"
        type="text"
        placeholder="Describe your avatar"
        value={formData.avatarAlt}
        onChange={handleChange}
        name="avatarAlt"
      />
      <InputField
        id="bannerUrl"
        label="Banner URL"
        type="url"
        placeholder="https://example.com/banner.jpg"
        value={formData.bannerUrl}
        onChange={handleChange}
        name="bannerUrl"
      />
      <InputField
        id="bannerAlt"
        label="Banner Alt Text"
        type="text"
        placeholder="Describe your banner"
        value={formData.bannerAlt}
        onChange={handleChange}
        name="bannerAlt"
      />
      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="venueManager"
            checked={formData.venueManager}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span className="ml-2 text-gray-700">Are you a venue manager?</span>
        </label>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="p-2 bg-pink-500 text-white rounded mt-4">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
