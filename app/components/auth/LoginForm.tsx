"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react"; // Import useToast
import { loginSchema } from "@/app/lib/schemas/authSchemas";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

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
  const toast = useToast(); // Use toast for feedback

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
        headers: { "Content-Type": "application/json" },
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

      toast({
        title: "Logged in successfully.",
        description: `Welcome back, ${user.name}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      router.push("/");
      onClose();
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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
      <Button label="Login" type="submit" className=""></Button>
    </form>
  );
};

export default LoginForm;
