import { apiClient } from "@/lib/apiClient";

export const supplierDeleteCatalogService = {
  deleteCatalog: (
    catalogId: number,
    status: string,
    token: string
  ) => {
    return apiClient(
      `/supplier/services/${catalogId}?status=${encodeURIComponent(
        status
      )}&token=${encodeURIComponent(token)}`,
      {
        method: "DELETE",
      }
    );
  },
};