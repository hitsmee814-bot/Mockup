import { apiClient } from "@/lib/apiClient";

export const docTypelookupService = {
  getDocTypes: () => {
    return apiClient("/lookup/tax-document-types", {
      method: "GET",
    });
  },
};



