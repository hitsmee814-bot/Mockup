"use client";

import { tourService } from "@/services/ItineraryService";
import { useState, useEffect } from "react";

const cache = new Map<string, string>();

export function useTourImage(imageUrl: string | undefined): string {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    if (!imageUrl) return;

    if (cache.has(imageUrl)) {
      setSrc(cache.get(imageUrl)!);
      return;
    }

    let cancelled = false;
    tourService.getImageBlob(imageUrl).then((blobUrl) => {
      if (!cancelled && blobUrl) {
        cache.set(imageUrl, blobUrl);
        setSrc(blobUrl);
      }
    });

    return () => { cancelled = true; };
  }, [imageUrl]);

  return src;
}
