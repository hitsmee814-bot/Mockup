import { apiClient } from "@/lib/apiClient";

export type SupplierAddQuotePayload = {
  quoted_amount: number;
  currency: string;
  remarks: string;
};

export const supplierAddQuoteService = {
  addQuote: (
    enquiryId: number | string,
    token: string,
    payload: SupplierAddQuotePayload
  ) => {
    return apiClient(
      `/supplier/enquiries/${enquiryId}/quote?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },
};