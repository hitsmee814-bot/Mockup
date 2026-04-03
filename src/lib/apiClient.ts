const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ascendus.bonhomiee.com";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
    method?: RequestMethod;
    body?: any;
    headers?: Record<string, string>;
}

export async function apiClient(endpoint: string, options: ApiOptions = {}) {
    const { method = "GET", body, headers = {} } = options;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
        throw data
    }

    return data;
}
