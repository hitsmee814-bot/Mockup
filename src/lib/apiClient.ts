const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ascendus.bonhomiee.com";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
    method?: RequestMethod;
    body?: any;
    headers?: Record<string, string>;
}

export async function apiClient(endpoint: string, options: ApiOptions = {}) {
    const { method = "GET", body, headers = {} } = options;

    console.log(`📡 API Call: ${method} ${BASE_URL}${endpoint}`);
    if (body) {
        console.log(`📡 Request Body:`, body);
    }
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,  // ← Only stringify ONCE here
    });

    console.log(`📡 Response Status: ${response.status} ${response.statusText}`);
    
    let data;
    try {
        data = await response.json();
        console.log(`📡 Response Data:`, data);
    } catch (e) {
        data = {};
        console.log(`📡 Could not parse response as JSON`);
    }

    if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        
        if (data?.detail) {
            // Handle the new error format
            if (Array.isArray(data.detail) && data.detail[0]?.msg) {
                errorMessage = data.detail[0].msg;
            } else {
                errorMessage = data.detail;
            }
        } else if (data?.message) {
            errorMessage = data.message;
        } else if (typeof data === 'string') {
            errorMessage = data;
        } else {
            errorMessage = `Request failed with status ${response.status}`;
        }
        
        console.error(`❌ API Error:`, errorMessage, data);
        throw new Error(errorMessage);
    }

    return data;
}