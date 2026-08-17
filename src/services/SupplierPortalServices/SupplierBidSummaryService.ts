import { apiClient } from "@/lib/apiClient";

export type SupplierBidSummary = {
  lowest_bid: number | null;
  supplier_bid: number | null;
  supplier_rank: number | null;
  bid_id: number | null;
  currency: string | null;
};

export const supplierBidSummaryService = {
  getBidSummary: (
    token: string,
    demandId: number
  ) => {
    return apiClient<SupplierBidSummary>(
      `/supplier/bids/demand/${demandId}/summary?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      }
    );
  },
};