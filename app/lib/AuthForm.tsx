"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import * as z from "zod";

interface AuthFormProps {
  schema: z.ZodSchema<any>;
  endpoint: string;
  onSuccess: (data: any) => void;
  onClose: () => void;
  formFields: Array<{
    id: string;
    label: string;
    type: string;
    placeholder: string;
    name: string;
  }>;
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  schema,
  endpoint,
  onSuccess,
  onClose,
  formFields,
  buttonText,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
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

    const validationResult = schema.safeParse(formData);
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
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", data);
        throw new Error(data.error || "An unexpected error occurred.");
      }

      onSuccess(data);

      toast({
        title: "Success",
        description: "Operation completed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      router.push("/");
      onClose();
    } catch (error: any) {
      console.error("Error during form submission:", error);

      const errorMessage = error.message || "An unexpected error occurred.";
      setErrors({ general: errorMessage });

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          onChange={handleChange}
          name={field.name}
          error={errors[field.name]}
        />
      ))}
      {errors.general && <p className="text-red-500">{errors.general}</p>}
      <Button label={buttonText} type="submit" className="" />
    </form>
  );
};

export default AuthForm;
