// app/components/ui/LoginForm.tsx
"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User logged in:", data);
        onClose(); // Close the modal
        router.push("/profile"); // Redirect to profile page
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full p-2 bg-pink-500 text-white rounded"
      >
        Login
      </button>
      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <a href="/register" className="text-pink-500">
          Register
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
