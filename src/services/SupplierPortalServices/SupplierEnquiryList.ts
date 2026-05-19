import { apiClient } from "@/lib/apiClient"

export type SupplierEnquiryListItem = {
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

export const SupplierEnquiryList = {
  getEnquiries: (
    token: string,
    status?: string | null,
    page: number = 1,
    size: number = 20
  ): Promise<SupplierEnquiryListItem[]> => {
    const params = new URLSearchParams()

    params.append("token", token)
    params.append("page", String(page))
    params.append("size", String(size))

    if (status) {
      params.append("status", status)
    }

    return apiClient(`/supplier/enquiries?${params.toString()}`, {
      method: "GET",
    })
  },
}