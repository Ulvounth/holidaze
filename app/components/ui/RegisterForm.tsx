// app/components/RegisterForm.tsx
"use client";

import { FC, useState } from "react";
import InputField from "../ui/InputField";

const RegisterForm: FC = () => {
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          venueManager: isVenueManager,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User registered:", data);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        id="name"
        label="Name"
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <div>
        <label htmlFor="venueManager" className="inline-flex items-center">
          <input
            type="checkbox"
            id="venueManager"
            className="form-checkbox"
            checked={isVenueManager}
            onChange={(e) => setIsVenueManager(e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-700">
            I’m a venue manager
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-pink-500 text-white rounded"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
