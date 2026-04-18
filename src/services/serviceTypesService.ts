import { apiClient } from "@/lib/apiClient";

export const ServiceTypes = {
  getServiceTypes: () => {
    return apiClient("/lookup/service-types/", {
      method: "GET",
    });
  },
};