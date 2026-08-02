import { apiClient } from "@/lib/apiClient"

export type CatalogDetails = {
  id: number
  supplier_service_id: number
  service_name: string
  description: string
  city: string
  country: string
  currency: string
  status: string
  valid_from: string
  valid_to: string
  created_at: string
  updated_at: string
  service_type: string
}

export type CatalogRate = {
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

export type CatalogAndRatesResponse = {
  catalog: CatalogDetails
  rates: CatalogRate[]
}

export const SupplierCatalogAndRates = {
  getById: (
    catalogId: number
  ): Promise<CatalogAndRatesResponse> => {
    return apiClient(
      `/supplier/rates/catalog/${catalogId}`,
      {
        method: "GET",
      }
    )
  },
}