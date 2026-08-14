// Mockup/src/services/agent/upcomingTravelService.ts

import { apiClient } from "@/lib/apiClient";

export interface UpcomingTravel {
  booking_id: number;
  customer_name: string;
  phone: string;
  destination: string;
  travel_date: string;
  type: string;
  pax: number;
  status: string;
  total_amount: number;
  commission: number;
}

// Helper to get token from localStorage
const getToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const upcomingTravelService = {
  /**
   * API 8: Get upcoming travel for authenticated agent
   * GET /agent/dashboard/upcoming-travel?token={token}
   */
  getUpcomingTravel: (): Promise<UpcomingTravel[]> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/upcoming-travel?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },
};