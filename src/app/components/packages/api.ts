import { TourPackage } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

// Parse the BE response (array of JSON strings) into TourPackage[]
export function parseToursResponse(raw: string[]): TourPackage[] {
  return raw.map((str) => JSON.parse(str) as TourPackage);
}

// Fetch all tours from BE
export async function fetchTours(): Promise<TourPackage[]> {
  try {
    const res = await fetch(`${API_BASE}/tours`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch tours");
    const raw: string[] = await res.json();
    return parseToursResponse(raw);
  } catch {
    return [];
  }
}

// Fetch single tour by ID
export async function fetchTourById(id: number): Promise<TourPackage | null> {
  try {
    const res = await fetch(`${API_BASE}/tours/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Tour not found");
    const raw: string = await res.json();
    return JSON.parse(raw) as TourPackage;
  } catch {
    return null;
  }
}

// Fetch image blob via POST with image_url
export async function fetchImageBlob(imageUrl: string): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl }),
    });
    if (!res.ok) throw new Error("Image fetch failed");
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return "";
  }
}
