import { apiClient } from "@/lib/apiClient";

export const docTypelookupService = {
  getDocTypes: (role: string) => {
    return apiClient(
      `/lookup/document-types/${role}`,
      {
        method: "GET",
      }
    );
  },
};


