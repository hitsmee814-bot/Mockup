import { apiClient } from "@/lib/apiClient"

export type ServiceSubcategoryParameter = {
  id: number
  subcategory_id: number
  parameter_name: string
  description: string | null
  display_order: number
  status: string
  created_at: string
}

export const ServiceSubcategoryParameters = {
  getBySubcategory: (
    subcategoryId: number
  ): Promise<ServiceSubcategoryParameter[]> => {
    return apiClient(
      `/supplier/services/service-subcategory-parameters/${subcategoryId}`,
      {
        method: "GET",
      }
    )
  },
}