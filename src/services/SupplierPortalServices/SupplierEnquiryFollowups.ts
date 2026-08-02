import { apiClient } from "@/lib/apiClient"

export type SupplierEnquiryFollowupItem = {
  responded_by_user_id: number
  enquiry_id: number
  followup_at: string
  note: string
  status: string
  stage: string
  id: number
}

export const SupplierEnquiryFollowups = {
  getFollowups: (
    enquiryId: number,
    token: string
  ): Promise<SupplierEnquiryFollowupItem[]> => {
    const params = new URLSearchParams()

    params.append("token", token)

    return apiClient(
      `/supplier/enquiries/${enquiryId}/followups?${params.toString()}`,
      {
        method: "GET",
      }
    )
  },
}