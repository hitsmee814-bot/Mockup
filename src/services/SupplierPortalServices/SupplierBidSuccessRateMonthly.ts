import { apiClient } from "@/lib/apiClient"

export type SupplierBidSuccessRateMonthlyResponse = {
  data: {
    label: string
    round: number
  }[]
}

export const SupplierBidSuccessRateMonthly = {
  getBidSuccessRateMonthly: (
    token: string
  ): Promise<SupplierBidSuccessRateMonthlyResponse> => {
    return apiClient(
      `/supplier/analytics/bids/success-rate-monthly?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      }
    )
  },
}