// Mockup/src/services/agent/walletService.ts

import { apiClient } from "@/lib/apiClient";

export interface WalletBalanceResponse {
  wallet_balance: number;
}

// Helper to get token from localStorage
const getToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const walletService = {
  /**
   * API 7: Get wallet balance for authenticated agent
   * GET /agent/dashboard/wallet/balance?token={token}
   */
  getWalletBalance: (): Promise<WalletBalanceResponse> => {
    const token = getToken();
    return apiClient(`/agent/dashboard/wallet/balance?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },
};