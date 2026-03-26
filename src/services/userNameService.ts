import { apiClient } from "@/lib/apiClient";

/**
 * Service to manage username availability and validation.
 * Fixed: Manual URL construction for GET requests to bypass ApiOptions restriction.
 */
export const userNameService = {
  
  /**
   * Checks if a specific username is available for registration.
   */
  checkAvailability: (username: string) => {
    return apiClient("lookup/username-availability/check", {
      method: "POST",
      body: { username },
    });
  },

  /**
   * Fetches a list of alternative username suggestions if the chosen one is taken.
   * Fixed: Query parameter moved to URL string.
   */
  getSuggestions: (username: string) => {
    const query = `?base=${encodeURIComponent(username)}`;
    return apiClient(`lookup/username-availability/suggestions${query}`, {
      method: "GET",
    });
  },

  /**
   * Validates the username against reserved words or prohibited patterns.
   */
  validateFormat: (username: string) => {
    return apiClient("lookup/username-availability/validate-format", {
      method: "POST",
      body: { username },
    });
  }
};