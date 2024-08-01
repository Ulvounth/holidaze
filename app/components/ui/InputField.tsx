"use client";

import { FC } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

const InputField: FC<InputFieldProps> = ({ id, label, type, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="mt-1 p-2 w-full border rounded"
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
