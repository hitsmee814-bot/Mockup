import { apiClient } from "@/lib/apiClient";

export const scanUploadService = {
  scanUpload: (formData: FormData) => {
    // For multipart/form-data, we need to pass FormData directly
    // apiClient will detect FormData and not set Content-Type header
    return apiClient("/files/scan-upload", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type with boundary
    });
  },
};