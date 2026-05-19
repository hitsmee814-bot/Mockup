import { apiClient } from "@/lib/apiClient";

export interface SupplierAddFollowupPayload {
  responded_by_user_id: number;
  note: string;
  status: string;
  stage: string;
}

export const supplierAddFollowupService = {
  addFollowup: (
    enquiryId: number,
    token: string,
    payload: SupplierAddFollowupPayload
  ) => {
    return apiClient(
      `/supplier/enquiries/${enquiryId}/followup?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }
    );
  },
};