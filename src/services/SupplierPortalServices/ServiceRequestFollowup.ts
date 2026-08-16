import { apiClient } from "@/lib/apiClient"

export type ServiceRequestFollowupCreate = {
  remarks: string
  next_followup_date?: string | null
}

export type ServiceRequestFollowup = {
  id: number
  service_request_id: number
  supplier_id: number
  followup_date: string
  remarks: string | null
  next_followup_date: string | null
  created_by: number
  created_at: string
  updated_by: number | null
  updated_at: string
}

export const ServiceRequestFollowup = {
  addFollowup: (
    token: string,
    serviceRequestId: number,
    payload: ServiceRequestFollowupCreate
  ): Promise<ServiceRequestFollowup> => {
    const params = new URLSearchParams()

    params.append("token", token)

    return apiClient(
  `/supplier/enquiries/service-requests/${serviceRequestId}/followups?${params.toString()}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  }
)
  },
}