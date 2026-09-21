import { apiClient } from "@/lib/apiClient"

export const supplierDeleteRateService = {
  deleteRate: (rateId: number, token: string) => {
    return apiClient(
      `/supplier/rates/${rateId}?token=${encodeURIComponent(token)}`,
      {
        method: "DELETE",
      }
    )
  },
}