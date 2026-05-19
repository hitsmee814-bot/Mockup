import { apiClient } from "@/lib/apiClient"

export type BidSuccessRateResponse = {
  value: number
}

export const supplierBidSuccessRateService = {
  getBidSuccessRate: (
    token: string
  ): Promise<BidSuccessRateResponse> => {
    return apiClient(
      `/supplier/dashboard/bid-success-rate?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      }
    )
  },
}