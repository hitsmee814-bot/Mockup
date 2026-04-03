import { apiClient } from "@/lib/apiClient";

export const phoneNumberAvailService = {
  checkAvailability: (phoneNumber: string) => {
    return apiClient(
      `/lookup/phone-availability/${phoneNumber}`,
      {
        method: "GET",
      }
    );
  },
};