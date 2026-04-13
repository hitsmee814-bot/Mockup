const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ascendus.bonhomiee.com";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
    method?: RequestMethod;
    body?: any;
    headers?: Record<string, string>;
}

export async function apiClient(endpoint: string, options: ApiOptions = {}) {
    const { method = "GET", body, headers = {} } = options;

    //  ENV + URL DEBUG
    console.log(" ENV NEXT_PUBLIC_API_BASE_URL =", process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log(" BASE_URL (resolved) =", BASE_URL);
    console.log(" ENDPOINT =", endpoint);
    console.log("FULL API URL =", `${BASE_URL}${endpoint}`);

    console.log(` API Call: ${method} ${BASE_URL}${endpoint}`);

    if (body) {
        console.log(" Request Body Type =", body instanceof FormData ? "FormData" : "JSON");
        console.log(" Request Body =", body);
    }

    // Add cache control headers for GET requests
    const cacheHeaders: Record<string, string> = {};
    if (method === "GET") {
        cacheHeaders["Cache-Control"] = "no-cache, no-store, must-revalidate";
        cacheHeaders["Pragma"] = "no-cache";
        cacheHeaders["Expires"] = "0";
    }

    const isFormData = body instanceof FormData;

    console.log(" Is FormData =", isFormData);

    const finalUrl = `${BASE_URL}${endpoint}`;
    console.log(" FETCH URL =", finalUrl);

    try {
        const response = await fetch(finalUrl, {
            method,
            headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...cacheHeaders,
                ...headers,
            },
            body: body
                ? isFormData
                    ? body
                    : JSON.stringify(body)
                : undefined,
        });

        console.log("📡 Response Status =", response.status, response.statusText);

        let data;
        try {
            data = await response.json();
            console.log("📡 Response Data =", data);
        } catch (e) {
            data = {};
            console.log(" Could not parse response as JSON");
        }

        if (!response.ok) {
            let errorMessage = "Failed to process your request.";

            if (response.status === 409) {
                if (data?.detail?.includes("username")) {
                    errorMessage = "Username already exists.";
                } else if (data?.detail?.includes("phone")) {
                    errorMessage = "Phone number already exists.";
                } else {
                    errorMessage = data?.detail || "Duplicate data.";
                }
            } else if (response.status === 400 || response.status === 422) {
                if (data?.detail) {
                    if (Array.isArray(data.detail) && data.detail[0]?.msg) {
                        errorMessage = data.detail[0].msg;
                    } else {
                        errorMessage = data.detail;
                    }
                } else {
                    errorMessage = "Invalid data.";
                }
            } else if (response.status === 500) {
                errorMessage = "Server error.";
            } else if (data?.detail) {
                errorMessage = typeof data.detail === "string"
                    ? data.detail
                    : data.detail[0]?.msg || errorMessage;
            } else if (data?.message) {
                errorMessage = data.message;
            }

            console.error(" API Error =", errorMessage);
            console.error(" Full Error Data =", data);

            throw new Error(errorMessage);
        }

        return data;

    } catch (error) {
        console.error(" FETCH FAILED:", error);
        throw error;
    }
}