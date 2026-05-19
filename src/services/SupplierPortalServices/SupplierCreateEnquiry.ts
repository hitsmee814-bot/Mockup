import { apiClient } from "@/lib/apiClient"

export type SupplierCreateEnquiryPayload = {
  cust_type: string
  subject: string
  service_type: string
  details: Record<string, any>
}

export type SupplierCreateEnquiryResponse = {
  id: number
  supplier_id: number
  customer_id: number
  enquiry_no: string
  subject: string
  service_type: string
  details: string
  status: string
  next_followup: string | null
  assigned_to: number | null
  created_at: string
  updated_at: string
  stage: string
}

export const supplierCreateEnquiryService = {
  createEnquiry: (
    token: string,
    payload: SupplierCreateEnquiryPayload
  ): Promise<SupplierCreateEnquiryResponse> => {
    return apiClient(
      `/supplier/enquiries/create_enquiry_for_supplier?token=${encodeURIComponent(
        token
      )}`,
      {
        method: "POST",
        body: payload,
      }
    )
  },
}