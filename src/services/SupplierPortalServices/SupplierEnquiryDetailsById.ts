import { apiClient } from "@/lib/apiClient"

export type SupplierEnquiryDetailsByIdResponse = {
  id: number
  supplier_id: number
  customer_id: number
  enquiry_no: string
  subject: string
  service_type: string
  details: string
  status: string
  next_followup: string | null
  assigned_to: number
  created_at: string
  updated_at: string
}

export const SupplierEnquiryDetailsById = {
  getEnquiryDetailsById: (
    enquiryId: number,
    token: string
  ): Promise<SupplierEnquiryDetailsByIdResponse> => {
    return apiClient(
      `/supplier/enquiries/${enquiryId}?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      }
    )
  },
}