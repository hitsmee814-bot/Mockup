
import { apiClient } from "@/lib/apiClient";

export const scanUploadService = async (
  file: File,
  mobile: string,
  documentType: string
) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("mobile_no", mobile);
    formData.append("document_type", documentType);

    console.log("📡 Calling scan-upload API");

    const data = await apiClient("/files/scan-upload/", {
      method: "POST",
      body: formData,
    });

    console.log("Scan Success:", data);
    
    return data;
  } catch (error) {
        console.error(" Upload error:", error);
    throw error;
  }
};




