import { apiClient } from "@/lib/apiClient";

/**
 * Service to verify if a phone number is already registered or available.
 * Fixed: Removed 'params' and moved logic to URL/Body to match ApiOptions.
 */
export const phoneNumberAvailService = {
  
  /**
   * Checks the availability of a single mobile number.
   */
  checkAvailability: (mobile: string) => {
    return apiClient("lookup/phone-availability/check", {
      method: "POST",
      body: { mobile },
    });
  },

  /**
   * Checks availability by providing both country code and number separately.
   */
  checkByRegion: (countryCode: string, phoneNumber: string) => {
    return apiClient("lookup/phone-availability/region-check", {
      method: "POST",
      body: { 
        countryCode, 
        phoneNumber 
      },
    });
  },

  /**
   * Validates if a number is formatted correctly according to international standards.
   */
  validateFormat: (mobile: string) => {
    return apiClient("lookup/phone-availability/validate", {
      method: "POST",
      body: { mobile },
    });
  }
};