"use client";

import Image from "next/image";
import { useState } from "react";

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [unoptimized, setUnoptimized] = useState(false);

  const handleImageError = () => {
    setImageSrc("/images/placeholder.webp");
    setUnoptimized(true);
  };

  return (
    <div className="overflow-hidden">
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transform transition-transform duration-300 hover:scale-105 ${className}`}
        onError={handleImageError}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        unoptimized={unoptimized || imageSrc.includes("istockphoto.com")}
      />
    </div>
  );
};

export default CustomImage;
