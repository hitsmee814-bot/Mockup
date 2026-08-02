import { apiClient } from "@/lib/apiClient"

export type CatalogRateItem = {
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
}

export const SupplierCatalogRates = {
  getByCatalogId: (
    catalogId: number
  ): Promise<CatalogRateItem[]> => {
    return apiClient(
      `/supplier/rates/catalog/${catalogId}/rates`,
      {
        method: "GET",
      }
    )
  },
}