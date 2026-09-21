// src/lib/apiClient.ts

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

    // Handle 401 Unauthorized - Token expired
    if (response.status === 401) {
      errorMessage = "Your session has expired. Please login again.";
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInType");
    }

    const errorData =
      responseType === "json" && data ? data : {};

    // Get the raw error detail
    let rawDetail = "";
    if (errorData?.detail) {
      if (typeof errorData.detail === "string") {
        rawDetail = errorData.detail;
      } else if (
        Array.isArray(errorData.detail) &&
        errorData.detail[0]?.msg
      ) {
        rawDetail = errorData.detail[0].msg;
      }
    }

    // =========================================================
    // CONVERT DATABASE ERRORS TO USER-FRIENDLY MESSAGES
    // =========================================================
    const lowerDetail = rawDetail.toLowerCase();

    // Check for duplicate email errors
    if (lowerDetail.includes("uniq_agent_customer_email") || 
        lowerDetail.includes("email") && lowerDetail.includes("already exists")) {
      errorMessage = "The entered email address already exists. Please enter a new email address.";
    }
    // Check for duplicate phone errors
    else if (lowerDetail.includes("uniq_agent_customer_phone") || 
             lowerDetail.includes("phone") && lowerDetail.includes("already exists")) {
      errorMessage = "The entered phone number already exists. Please enter a new phone number.";
    }
    // Check for duplicate group name errors
    else if (lowerDetail.includes("group") && lowerDetail.includes("already exists")) {
      errorMessage = "This Group Name already exists. Please use another Group Name.";
    }
    // Check for duplicate username
    else if (lowerDetail.includes("username") && lowerDetail.includes("already exists")) {
      errorMessage = "This username is already taken. Please choose a different username.";
    }
    // Check for server errors with detail
    else if (response.status === 500 && rawDetail) {
      errorMessage = rawDetail;
    }
    // Check for 409 Conflict
    else if (response.status === 409) {
      if (rawDetail) {
        errorMessage = rawDetail;
      } else if (errorData?.detail?.includes?.("username")) {
        errorMessage = "Your username already exists. Please choose a different username.";
      } else if (errorData?.detail?.includes?.("phone")) {
        errorMessage = "Your phone number already exists. Please use a different number.";
      } else {
        errorMessage = errorData?.detail || "This information already exists. Please use different credentials.";
      }
    }
    // Check for 400 Bad Request
    else if (response.status === 400) {
      if (rawDetail) {
        errorMessage = rawDetail;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }
    }
    // Check for 422 Validation Error
    else if (response.status === 422) {
      if (rawDetail) {
        errorMessage = rawDetail;
      } else {
        errorMessage = "Invalid data provided. Please check your information.";
      }
    }
    // Check for 500 Server Error
    else if (response.status === 500) {
      if (rawDetail) {
        errorMessage = rawDetail;
      } else {
        errorMessage = "Server error. Please try again later.";
      }
    }
    // Check for 401 again
    else if (response.status === 401) {
      errorMessage = "Session expired. Please login again.";
    }
    // Fallback to message field
    else if (errorData?.message) {
      errorMessage = errorData.message;
    }

    console.error(`❌ API Error:`, errorMessage, data);

    throw new Error(errorMessage);
  }

  return data;
}