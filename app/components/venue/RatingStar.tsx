import React from "react";

interface StarIconProps {
  filled: boolean;
}

const RatingStar: React.FC<StarIconProps> = ({ filled }) => {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-500" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927C9.262 2.372 9.738 2 10.311 2c.573 0 1.05.372 1.262.927l1.18 3.632h3.858c.564 0 1.059.356 1.2.906.141.551-.058 1.148-.5 1.513L13.5 11.27l1.18 3.633c.204.631-.038 1.322-.5 1.516-.463.193-1.024.093-1.351-.237L10 13.88l-2.829 2.302c-.327.33-.889.43-1.351.237-.462-.193-.704-.885-.5-1.516L6.5 11.27l-3.511-2.292c-.442-.365-.641-.962-.5-1.513.141-.55.636-.906 1.2-.906h3.858l1.18-3.632z" />
    </svg>
  );
};

export default RatingStar;
