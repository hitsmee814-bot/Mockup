import { apiClient } from "@/lib/apiClient"

export type SupplierRateListItem = {
  id: number
  catalog_id: number
  rate_name: string
  base_price: number
  tax_percent: number
  markup_percent: number
  currency: string
  min_pax: number
  max_pax: number
  effective_from: string
  effective_to: string
  status: string
  created_at: string
  service_type: string
}

export const SupplierRateList = {
  getRates: (
    supplyId: number,
    status: string,
    page: number = 1,
    size: number = 20
  ): Promise<SupplierRateListItem[]> => {
    const params = new URLSearchParams()

    params.append("page", String(page))
    params.append("size", String(size))

    return apiClient(
      `/supplier/rates/list_rates/${supplyId}/${status}?${params.toString()}`,
      {
        method: "GET",
      }
    )
  },
}