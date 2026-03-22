import { apiClient } from "@/lib/apiClient";

export const lookupService = {
  getPhoneCodes: () => {
    return apiClient("/lookup/phone-code/", {
      method: "GET",
    });
  },
};