"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { useToast } from "@chakra-ui/react";
import { registerSchema } from "@/app/lib/schemas/authSchemas";
import InputField from "../ui/InputField";

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = registerSchema.safeParse(formData);
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.[0]?.message || "Registration failed. Please try again."
        );
      }

      toast({
        title: "Registration successful!",
        description: "You have registered successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/");
      onClose();
    } catch (error: any) {
      setErrors({ general: error.message });
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
        error={errors.name}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="email@stud.noroff.no"
        value={formData.email}
        onChange={handleChange}
        name="email"
        error={errors.email}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        name="password"
        error={errors.password}
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
          <span className="ml-2 text-gray-700">Register as venue manager</span>
        </label>
      </div>
      {errors.general && <p className="text-red-500">{errors.general}</p>}
      <Button label="Register" type="submit" className=""></Button>
    </form>
  );
};

export default RegisterForm;
