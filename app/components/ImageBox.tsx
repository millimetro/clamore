import React from "react";

interface ImageBoxProps {
  src: string;
  alt?: string;
  className?: string;
  borderColor?: string; // e.g., "border-white" to override default "border-black"
}

export default function ImageBox({ src, alt = "", className = "", borderColor = "border-black" }: ImageBoxProps) {
  return (
    <div className={`border-2 ${borderColor} rounded-3xl overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

