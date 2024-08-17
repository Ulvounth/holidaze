"use client";

import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../ui/InputField";

const LoginForm = ({
  onClose,
  onLoginSuccess,
}: {
  onClose: () => void;
  onLoginSuccess: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        const errorMessage =
          data.errors?.[0]?.message || "Login failed. Please try again.";
        throw new Error(errorMessage);
      }

      // Show success toast
      toast({
        title: "Login successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Notify parent component of successful login
      onLoginSuccess();

      // Redirect to the homepage
      router.push("/");
      onClose();
    } catch (err: any) {
      // Handle error and show error toast
      setError(err.message);
      toast({
        title: "Login failed",
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
        id="email"
        label="Email"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="p-2 bg-pink-500 text-white rounded mt-4">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
