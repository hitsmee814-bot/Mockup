// Mockup/src/services/agent/commissionService.ts

import { apiClient } from "@/lib/apiClient";

export interface TotalCommissionResponse {
  total_commission: number;
}

export interface MonthlyCommission {
  month: string;
  total: number;
}

export interface CommissionBreakdown {
  category_code: string;
  category_name: string;
  booking_count: number;
  total_amount: number;
  commission_percent: number;
  total_commission: number;
}

export interface CommissionSummary {
  total_commission: number;
  total_paid: number;
  pending: number;
  currency: string;
}

// Helper to get token from localStorage
const getToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const commissionService = {
  /**
   * API 3: Get total commission for authenticated agent
   * GET /agent/dashboard/commissions/total?token={token}
   */
  getTotalCommission: (): Promise<TotalCommissionResponse> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/commissions/total?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },

  /**
   * API 4: Get monthly commission for authenticated agent
   * GET /agent/dashboard/commissions/monthly?token={token}
   */
  getMonthlyCommission: (): Promise<MonthlyCommission[]> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/commissions/monthly?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },

  /**
   * API 5: Get commission breakdown for authenticated agent
   * GET /agent/dashboard/commissions/breakdown?token={token}
   */
  getCommissionBreakdown: (): Promise<CommissionBreakdown[]> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/commissions/breakdown?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },

  /**
   * API 6: Get commission summary for authenticated agent
   * GET /agent/dashboard/commissions/summary?token={token}
   */
  getCommissionSummary: (): Promise<CommissionSummary> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/commissions/summary?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },
};