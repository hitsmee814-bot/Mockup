import { apiClient } from "@/lib/apiClient";

export const documentCreationService = {
  createDocument: (documentData: {
    user_id: number;
    document_type: string;
    path: string;
  }) => {
    return apiClient("/documents/", {
      method: "POST",
      body: documentData,
    });
  },
};