import { apiClient } from "@/lib/apiClient"

export type ServiceSubcategory = {
  id: number
  service_type: string
  subcategory_name: string
  description: string | null
  status: string
  created_at: string
}

export const ServiceSubcategories = {
  getByServiceType: (
    serviceType: string
  ): Promise<ServiceSubcategory[]> => {
    return apiClient(
      `/supplier/services/service-subcategories/${serviceType}`,
      {
        method: "GET",
      }
    )
  },
}