import { apiClient } from "@/lib/apiClient"

export type CatalogUpdatePayload = {
  service_name: string
  description?: string
  city?: string
  country?: string
  currency?: string
  valid_from?: string
  valid_to?: string
  status: string
}

export const SupplierUpdateCatalogService = {
  async updateCatalog(
    catalogId: number,
    payload: CatalogUpdatePayload,
    token: string
  ) {
    return apiClient(
      `/supplier/services/${catalogId}?token=${encodeURIComponent(token)}`,
      {
        method: "PUT",
        body: payload,
      }
    )
  },
}