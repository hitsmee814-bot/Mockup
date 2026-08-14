// Mockup/src/services/agent/payoutService.ts

import { apiClient } from "@/lib/apiClient";

export interface PendingPayout {
  booking_id: number;
  booking_no: string;
  booking_type: string;
  total_amount: number;
  commission_amount: number;
  created_at: string;
  payout_status: string;
}

export interface TotalPayoutsResponse {
  total_payouts: number;
}

export interface MonthlyPayout {
  month: string;
  total: number;
}

export interface ProcessPayoutResponse {
  booking_id?: number;
  total_bookings?: number;
  total_amount_paid?: number;
  new_balance?: number;
  message: string;
}

// Helper to get token from localStorage
const getToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const payoutService = {
  /**
   * API 9: Get pending payouts for authenticated agent
   * GET /agent/dashboard/payouts/pending?token={token}
   */
  getPendingPayouts: (): Promise<PendingPayout[]> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/payouts/pending?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },

  /**
   * API 10: Get total payouts for authenticated agent
   * GET /agent/dashboard/payouts/total?token={token}
   */
  getTotalPayouts: (): Promise<TotalPayoutsResponse> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/payouts/total?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },

  /**
   * API 11: Get monthly payouts for authenticated agent
   * GET /agent/dashboard/payouts/monthly?token={token}
   */
  getMonthlyPayouts: (): Promise<MonthlyPayout[]> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/payouts/monthly?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },

  /**
   * API 13: Process commission payout for agent
   * POST /agent/dashboard/payouts/process?token={token}&booking_id={bookingId}
   */
  processPayout: (bookingId?: number | null): Promise<ProcessPayoutResponse> => {
    const token = getToken();
    let url = `/agent/dashboard/payouts/process?token=${encodeURIComponent(token)}`;
    if (bookingId) {
      url += `&booking_id=${bookingId}`;
    }
    return apiClient(url, {
      method: "POST",
    });
  },
};