// Mockup/src/services/agent/bookingService.ts

import { apiClient } from "@/lib/apiClient";

export interface TotalBookingsResponse {
  total_bookings: number;
}

export interface MonthlyBooking {
  month: string;
  total: number;
}

// Helper to get token from localStorage
const getToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const bookingService = {
  /**
   * API 1: Get total bookings for authenticated agent
   * GET /agent/dashboard/bookings/total?token={token}
   */
  getTotalBookings: (): Promise<TotalBookingsResponse> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/bookings/total?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },

  /**
   * API 2: Get monthly bookings for authenticated agent
   * GET /agent/dashboard/bookings/monthly?token={token}
   */
  getMonthlyBookings: (): Promise<MonthlyBooking[]> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/bookings/monthly?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },
};