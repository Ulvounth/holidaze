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

    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const newErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});

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
        placeholder="email@stud.noroff.no"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      {errors.general && <p className="text-red-500">{errors.general}</p>}
      <button type="submit" className="mr-4 px-5 py-2 bg-btnSecondary rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
