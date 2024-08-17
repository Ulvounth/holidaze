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
    venueManager: false,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Show success toast
      toast({
        title: "Registration successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // After successful registration, cookies are already set, so just redirect
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
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="email@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={formData.venueManager}
            onChange={(e) =>
              setFormData({ ...formData, venueManager: e.target.checked })
            }
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
