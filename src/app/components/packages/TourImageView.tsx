"use client";

import { useTourImage } from "./useTourImage";

interface TourImageProps {
  imageUrl: string | undefined;
  alt: string;
  className?: string;
  fallbackSeed?: string;
}

export function TourImageView({ imageUrl, alt, className = "", fallbackSeed }: TourImageProps) {
  const src = useTourImage(imageUrl);
  const fallback = fallbackSeed
    ? `https://picsum.photos/seed/${fallbackSeed}/600/400`
    : "";

  if (!src && !fallback) {
    return <div className={`bg-gray-200 animate-pulse ${className}`} />;
  }

  return (
    <img
      src={src || fallback}
      alt={alt}
      className={className}
      onError={(e) => {
        if (fallback) (e.target as HTMLImageElement).src = fallback;
      }}
    />
  );
}
