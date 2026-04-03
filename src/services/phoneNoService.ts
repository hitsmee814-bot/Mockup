import { apiClient } from "@/lib/apiClient";

export const phoneNoService = {
  getPhoneCodes: () => {
    return apiClient(
      `/lookup/phone-code/`,
      {
        method: "GET",
      }
    );
  },
};