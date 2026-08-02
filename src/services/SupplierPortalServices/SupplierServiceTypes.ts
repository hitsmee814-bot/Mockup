import { apiClient } from "@/lib/apiClient"

export type SupplierServiceType = {
  id: number
  supplier_id: number
  service_type: string
  is_active: boolean
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
}

export const SupplierServiceTypes = {
  getAll: async (
    token: string
  ): Promise<SupplierServiceType[]> => {
    return apiClient(
      `/supplier/services/supplier-service-types?token=${token}`,
      {
        method: "GET",
      }
    )
  },
}