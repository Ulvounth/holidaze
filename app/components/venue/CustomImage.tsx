"use client";

import Image from "next/image";
import { useState } from "react";

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  // Handle image load error and fallback to placeholder
  const handleImageError = () => {
    setImageSrc("/images/placeholder.webp");
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleImageError} // Fallback to placeholder
    />
  );
};

export default CustomImage;
