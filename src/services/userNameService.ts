import { apiClient } from "@/lib/apiClient";

export const userNameService = {
  checkAvailability: (username: string) => {
    return apiClient(
      `/lookup/username-availability/${username}`,
      {
        method: "GET",
      }
    );
  },
};