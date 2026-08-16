import { apiClient } from "@/lib/apiClient"

export type ServiceRequestFollowupHistoryItem = {
  id: number
  service_request_id: number
  supplier_id: number
  remarks: string | null
  next_followup_date: string | null
  created_by: number
  created_at: string
  updated_by: number | null
  updated_at: string
}

export const ServiceRequestFollowupHistory = {
  getFollowups: (
    token: string,
    serviceRequestId: number
  ): Promise<ServiceRequestFollowupHistoryItem[]> => {
    const params = new URLSearchParams()

    params.append("token", token)

    return apiClient(
      `/supplier/enquiries/service-requests/${serviceRequestId}/followups?${params.toString()}`,
      {
        method: "GET",
      }
    )
  },
}