import { apiClient } from "@/lib/apiClient";

export type SupplierEnquiryCountItem = {
  status: string;
  cnt: number;
};

export const SupplierEnquiryCount = {
  getEnquiryCount: (
    token: string
  ): Promise<SupplierEnquiryCountItem[]> => {
    return apiClient(
      `/supplier/enquiries/enquirycount?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      }
    );
  },
};