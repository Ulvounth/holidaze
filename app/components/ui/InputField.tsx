"use client";

import { FC } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string | boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name?: string;
  required?: boolean;
  error?: string;
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error,
}) => (
  <div className={`mb-4 ${type === "checkbox" ? "flex items-center" : ""}`}>
    {type === "checkbox" ? (
      <>
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={onChange}
          name={name}
          className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded"
          required={required}
        />
        <label
          htmlFor={id}
          className="ml-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      </>
    ) : (
      <>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            id={id}
            placeholder={placeholder}
            value={value as string}
            onChange={onChange}
            name={name}
            className={`my-2 block w-full p-2 bg-white text-gray-900 border rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            required={required}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value as string}
            onChange={onChange}
            name={name}
            className={`my-2 block w-full p-2 bg-white text-gray-900 border rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            required={required}
          />
        )}
      </>
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;
