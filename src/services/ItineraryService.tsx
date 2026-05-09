import { TourPackage } from "@/app/components/packages/types";
import { apiClient } from "@/lib/apiClient";

export const tourService = {
    // Parse backend response (array of JSON strings) into TourPackage[]
    getAll: async (): Promise<TourPackage[]> => {
        try {
            const data = await apiClient("/itinerary/search", {
                method: "POST",
                body: {},
            });

            if (Array.isArray(data)) {
                return data.map((item) => {
                    if (typeof item === "string") {
                        return JSON.parse(item) as TourPackage;
                    }
                    return item as TourPackage;
                });
            }

            return [];
        } catch {
            return [];
        }
    },

    // Fetch single tour by ID
    getById: async (id: string | number): Promise<TourPackage | null> => {
        try {
            const data = await apiClient(`/itinerary/${id}`, {
                method: "GET",
            });

            return data as TourPackage;
        } catch {
            return null;
        }
    },

    // Fetch image blob via POST with image_url and return object URL
    getImageBlob: async (filename: string): Promise<string> => {
        try {
            const response = await fetch(`/files/download?filename=${encodeURIComponent(filename)}`,
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                throw new Error("Image fetch failed");
            }

            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch {
            return "";
        }
    },
};