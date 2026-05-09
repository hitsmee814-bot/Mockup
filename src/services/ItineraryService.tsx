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

    getImageBlob: async (filename: string): Promise<string> => {
        try {
            const blob = await apiClient<Blob>(
                `/files/download?filename=${encodeURIComponent(filename)}`,
                {
                    method: "GET",
                    responseType: "blob",
                }
            );

            return URL.createObjectURL(blob);
        } catch {
            return "";
        }
    },
};