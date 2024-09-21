"use client";

import Image from "next/image";
import { useState } from "react";

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
}) => {
  const [imageSrc, setImageSrc] = useState(src);

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
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default CustomImage;
