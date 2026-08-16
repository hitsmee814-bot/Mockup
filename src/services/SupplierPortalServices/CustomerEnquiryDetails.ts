import { apiClient } from "@/lib/apiClient"

export type CustomerEnquiryDetails = {
  id: number
  enquiry_no: string
  subject: string
  source?: string | null
  destination?: string | null
  travel_date?: string | null
  pax?: number | null
  description?: string | null
  status: string
  created_at?: string | null
}

export const CustomerEnquiryDetails = {
  getCustomerEnquiryDetails: (
    token: string,
    enquiryNo: string
  ): Promise<CustomerEnquiryDetails> => {
    const params = new URLSearchParams()

    params.append("token", token)

    return apiClient(
      `/supplier/enquiries/customer-enquiries/${encodeURIComponent(enquiryNo)}?${params.toString()}`,
      {
        method: "GET",
      }
    )
  },
}