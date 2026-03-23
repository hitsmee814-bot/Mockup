import { apiClient } from "@/lib/apiClient";

export const countryListService = {
  getCountries: () => {
    return apiClient("/lookup/countries", {
      method: "GET",
    });
  },
};