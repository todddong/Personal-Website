"use client";

import { useEffect } from "react";
import { getSupabaseImageUrl } from "@/lib/supabaseClient";

interface ImagePreloaderProps {
  images: Array<{ src: string; bucket?: string }>;
}

export default function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    // Preload critical images
    images.forEach(({ src, bucket = "images" }) => {
      const url = getSupabaseImageUrl(bucket, src);
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      link.fetchPriority = "high";
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup on unmount
      images.forEach(({ src, bucket = "images" }) => {
        const url = getSupabaseImageUrl(bucket, src);
        const links = document.querySelectorAll(`link[href="${url}"]`);
        links.forEach((link) => link.remove());
      });
    };
  }, [images]);

  return null;
}
