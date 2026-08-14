// Mockup/src/services/agent/paymentService.ts

import { apiClient } from "@/lib/apiClient";

export interface PendingPayment {
  id: number;
  invoice_no: number;
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
}

// Helper to get token from localStorage
const getToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const paymentService = {
  /**
   * API 12: Get pending payments from dashboard
   * GET /agent/dashboard/payments/pending?token={token}
   */
  getPendingPayments: (): Promise<PendingPayment[]> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/payments/pending?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },
};