import { apiClient } from "@/lib/apiClient";

export const SupplierServiceTypesGet = {
  getServiceTypes: (token: string) => {
    return apiClient(
      `/Supplier/Services/service-types?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      }
    );
  },
};