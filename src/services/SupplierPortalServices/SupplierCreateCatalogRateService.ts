import { apiClient } from "@/lib/apiClient"

export type CatalogPayload = {
  supplier_service_id: number
  service_name: string
  description?: string
  city: string
  country: string
  currency: string
  valid_from: string
  valid_to: string
  status: string
}

export type RatePayload = {
  catalog_id: number
  service_type_subcat_id: number
  parameter_id: number
  rate_name: string
  base_price: number
  tax_percent: number
  markup_percent: number
  currency: string
  min_pax?: number
  max_pax?: number
  effective_from: string
  effective_to?: string
  status: string
}

export const SupplierCreateCatalogRateService = {

  async createCatalog(
    payload: CatalogPayload
  ) {
    return apiClient(
      "/supplier/services",
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    )
  },

  async createRate(
    payload: RatePayload
  ) {
    return apiClient(
      "/supplier/rates/create_rate",
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    )
  },

  async createCatalogAndRate(
    catalogPayload: CatalogPayload,
    ratePayload: Omit<RatePayload, "catalog_id">
  ) {

    // Create Catalog
    const catalog =
      await this.createCatalog(catalogPayload)

    // Create Rate
    const rate =
      await this.createRate({
        ...ratePayload,
        catalog_id: catalog.id
      })

    return {
      catalog,
      rate
    }
  }
}