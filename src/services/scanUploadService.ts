// const API_BASE_URL = "http://150.241.244.100:8000"

// export const scanUploadService = async (
//   file: File,
//   mobile: string,
//   documentType: string
// ) => {
//   try {
//     const formData = new FormData()

//     formData.append("file", file)
//     formData.append("mobile_no", mobile)
//     formData.append("document_type", documentType)

//     const apiUrl =
//       `${API_BASE_URL}/files/scan-upload/`

//     console.log("📡 Calling API:", apiUrl)

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       body: formData,
//     })

//     console.log("📡 Response Status:", response.status)

//     if (!response.ok) {
//       const errorText =
//         await response.text()

//       console.error(
//         "❌ Scan API error:",
//         errorText
//       )

//       throw new Error("Scan failed")
//     }

//     const data =
//       await response.json()

//     console.log(
//       "✅ Scan Success:",
//       data
//     )

//     return data

//   } catch (error) {
//     console.error(
//       "❌ Upload error:",
//       error
//     )
//     throw error
//   }
// }




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

    const data = await apiClient("/files/scan-upload", {
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