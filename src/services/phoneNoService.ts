import { apiClient } from "@/lib/apiClient";

/**
 * Service for fetching international phone/country codes.
 * Error handling and state management are deferred to the calling hook/component.
 */
export const phoneNoService = {
  
  /**
   * Fetches the full list of supported country calling codes.
   */
  getPhoneCodes: () => {
    return apiClient("lookup/phone-code/", {
      method: "GET",
    });
  },

  /**
   * Fetches specific phone code details by country ISO code.
   */
  getPhoneCodeByIso: (iso: string) => {
    return apiClient(`lookup/phone-code/${iso}`, {
      method: "GET",
    });
  },

  /**
   * Search or filter phone codes based on a query string.
   * Fixed: Manual URL construction since 'params' is not in ApiOptions.
   */
  searchPhoneCodes: (query: string) => {
    // We encode the URI component to handle special characters safely
    const queryString = `?q=${encodeURIComponent(query)}`;
    
    return apiClient(`lookup/phone-code/search${queryString}`, {
      method: "GET",
    });
  }
};