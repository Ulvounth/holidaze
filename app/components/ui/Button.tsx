import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-5 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-transform transform hover:scale-105 duration-300 mt-3 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
