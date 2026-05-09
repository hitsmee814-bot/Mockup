const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ascendus.bonhomiee.com";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type ResponseType = "json" | "blob" | "text" | "raw";

interface ApiOptions {
  method?: RequestMethod;
  body?: any;
  headers?: Record<string, string>;
  responseType?: ResponseType;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    responseType = "json",
  } = options;

  console.log(`📡 API Call: ${method} ${BASE_URL}${endpoint}`);

  if (body) {
    console.log(`📡 Request Body:`, body);
  }

  const cacheHeaders: Record<string, string> = {};

  if (method === "GET") {
    cacheHeaders["Cache-Control"] =
      "no-cache, no-store, must-revalidate";
    cacheHeaders["Pragma"] = "no-cache";
    cacheHeaders["Expires"] = "0";
  }

  const isFormData = body instanceof FormData;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      ...(isFormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...cacheHeaders,
      ...headers,
    },
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  console.log(
    `📡 Response Status: ${response.status} ${response.statusText}`
  );

  let data: any;

  try {
    switch (responseType) {
      case "blob":
        data = await response.blob();
        break;

      case "text":
        data = await response.text();
        break;

      case "raw":
        data = response;
        break;

      case "json":
      default:
        data = await response.json();
        break;
    }

    console.log(`📡 Response Data:`, data);
  } catch (e) {
    console.log(`📡 Could not parse response`);
    data = null;
  }

  if (!response.ok) {
    let errorMessage = "Failed to process your request.";

    // Try extracting backend error from JSON response only
    const errorData =
      responseType === "json" && data ? data : {};

    if (response.status === 409) {
      if (errorData?.detail?.includes?.("username")) {
        errorMessage =
          "Your username already exists. Please choose a different username.";
      } else if (errorData?.detail?.includes?.("phone")) {
        errorMessage =
          "Your phone number already exists. Please use a different number.";
      } else {
        errorMessage =
          errorData?.detail ||
          "This information already exists. Please use different credentials.";
      }
    } else if (response.status === 400) {
      if (errorData?.detail) {
        if (
          Array.isArray(errorData.detail) &&
          errorData.detail[0]?.msg
        ) {
          errorMessage = errorData.detail[0].msg;
        } else {
          errorMessage = errorData.detail;
        }
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } else if (response.status === 422) {
      if (errorData?.detail) {
        if (
          Array.isArray(errorData.detail) &&
          errorData.detail[0]?.msg
        ) {
          errorMessage = errorData.detail[0].msg;
        } else {
          errorMessage = errorData.detail;
        }
      } else {
        errorMessage =
          "Invalid data provided. Please check your information.";
      }
    } else if (response.status === 500) {
      errorMessage =
        "Server error. Please try again later.";
    } else if (errorData?.detail) {
      if (typeof errorData.detail === "string") {
        errorMessage = errorData.detail;
      } else if (
        Array.isArray(errorData.detail) &&
        errorData.detail[0]?.msg
      ) {
        errorMessage = errorData.detail[0].msg;
      }
    } else if (errorData?.message) {
      errorMessage = errorData.message;
    }

    console.error(`❌ API Error:`, errorMessage, data);

    throw new Error(errorMessage);
  }

  return data;
}