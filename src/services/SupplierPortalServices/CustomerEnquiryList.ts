import { apiClient } from "@/lib/apiClient"

export type CustomerEnquiryListItem = {
  id: number
  enquiry_no: string
  service_request_no: string
  subject: string
  service_type: string
  destination: string
  travel_date: string
  status: string
  demand_request_id: number
  demand_status: string
  bid_close_at: string | null
  assigned_at: string
}

export const CustomerEnquiryList = {
  getCustomerEnquiries: (
    token: string,
    status?: string | null,
    page: number = 1,
    size: number = 20
  ): Promise<CustomerEnquiryListItem[]> => {
    const params = new URLSearchParams()

    params.append("token", token)
    params.append("page", String(page))
    params.append("size", String(size))

    if (status && status.trim() !== "") {
      params.append("status", status)
    }

    return apiClient(
      `/supplier/enquiries/customer-enquiries?${params.toString()}`,
      {
        method: "GET",
      }
    )
  },
}