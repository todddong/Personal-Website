"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { getSupabaseImageUrl } from "@/lib/supabaseClient";

interface CloudImageProps {
  src: string;
  alt: string;
  bucket?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: () => void;
  fallback?: string;
}

export default function CloudImage({
  src,
  alt,
  bucket = "images",
  fill,
  width,
  height,
  className = "",
  priority = false,
  objectFit = "cover",
  objectPosition,
  onError,
  onLoad,
  fallback,
}: CloudImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  const supabaseUrl = useMemo(() => getSupabaseImageUrl(bucket, src), [bucket, src]);

  useEffect(() => {
    setCurrentSrc(supabaseUrl);
    setIsLoading(true);
    setHasError(false);
  }, [supabaseUrl]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setIsLoading(true);
      setHasError(false);
      return;
    }
    
    setHasError(true);
    setIsLoading(false);
    onError?.(e);
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  if (hasError && !fallback) {
    return (
      <div className={`relative ${className} bg-gray-100 flex items-center justify-center`}>
        {fill ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Image not found
          </div>
        ) : (
          <div style={{ width, height }} className="flex items-center justify-center text-gray-400 text-sm">
            Image not found
          </div>
        )}
      </div>
    );
  }

  if (!currentSrc) return null;

  const imageProps = {
    src: currentSrc,
    alt,
    className: `${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`,
    onError: handleError,
    onLoad: handleLoad,
    priority,
    ...(fill
      ? {
          fill: true,
          style: {
            objectFit,
            objectPosition: objectPosition || "center",
          },
        }
      : {
          width: width || 800,
          height: height || 600,
          style: {
            objectFit,
            objectPosition: objectPosition || "center",
          },
        }),
  };

  return (
    <>
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} aria-hidden="true" />
      )}
      <Image {...imageProps} />
    </>
  );
}
