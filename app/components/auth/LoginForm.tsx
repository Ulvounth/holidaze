"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/lib/schemas/authSchemas";
import InputField from "../ui/InputField";

interface LoginFormProps {
  onClose: () => void;
  onLoginSuccess: (
    user: { name: string; email: string; avatarUrl?: string },
    token: string
  ) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({}); // State for field errors
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod schema
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const newErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message; // Store field-specific errors
      });
      setErrors(newErrors); // Set errors state
      return;
    }

    setErrors({}); // Clear errors if validation passes

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.[0]?.message || "Login failed. Please try again."
        );
      }

      const user = {
        name: data.data.name,
        email: data.data.email,
        avatarUrl: data.data.avatar?.url,
        venueManager: data.data.venueManager,
      };

      const token = data.data.accessToken;
      onLoginSuccess(user, token);

      router.push("/");
      onClose();
    } catch (error: any) {
      setErrors({ general: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email} // Pass the error for this field
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password} // Pass the error for this field
      />
      {errors.general && <p className="text-red-500">{errors.general}</p>}
      <button type="submit" className="p-2 bg-pink-500 text-white rounded mt-4">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
