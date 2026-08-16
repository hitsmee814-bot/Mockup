import { apiClient } from "@/lib/apiClient";

export interface SupplierBidCreatePayload {
  demand_id: number;
  quoted_amount: number;
  currency: string;
  notes?: string;
  delivery_days?: number;
}

export const createSupplierBidService = {
  createBid: (
    token: string,
    payload: SupplierBidCreatePayload
  ) => {
    return apiClient(
      `/supplier/bids?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }
    );
  },
};