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
    
    // Add cache control headers for GET requests to prevent caching
    const cacheHeaders: Record<string, string> = {};
    if (method === "GET") {
        cacheHeaders["Cache-Control"] = "no-cache, no-store, must-revalidate";
        cacheHeaders["Pragma"] = "no-cache";
        cacheHeaders["Expires"] = "0";
    }

    const isFormData = body instanceof FormData;
  

const response = await fetch(`${BASE_URL}${endpoint}`, {
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
        let errorMessage = "Failed to process your request.";
        
        // Check for 409 Conflict (duplicate username/phone)
        if (response.status === 409) {
            if (data?.detail?.includes("username")) {
                errorMessage = "Your username already exists. Please choose a different username.";
            } else if (data?.detail?.includes("phone")) {
                errorMessage = "Your phone number already exists. Please use a different number.";
            } else {
                errorMessage = data?.detail || "This information already exists. Please use different credentials.";
            }
        }
        // Check for 400 Bad Request
        else if (response.status === 400) {
            if (data?.detail) {
                if (Array.isArray(data.detail) && data.detail[0]?.msg) {
                    errorMessage = data.detail[0].msg;
                } else {
                    errorMessage = data.detail;
                }
            } else if (data?.message) {
                errorMessage = data.message;
            }
        }
        // Check for 422 Unprocessable Entity
        else if (response.status === 422) {
            if (data?.detail) {
                if (Array.isArray(data.detail) && data.detail[0]?.msg) {
                    errorMessage = data.detail[0].msg;
                } else {
                    errorMessage = data.detail;
                }
            } else {
                errorMessage = "Invalid data provided. Please check your information.";
            }
        }
        // Check for 500 Server Error
        else if (response.status === 500) {
            errorMessage = "Server error. Please try again later.";
        }
        // For any other error, try to extract message from response
        else if (data?.detail) {
            if (typeof data.detail === 'string') {
                errorMessage = data.detail;
            } else if (Array.isArray(data.detail) && data.detail[0]?.msg) {
                errorMessage = data.detail[0].msg;
            }
        } else if (data?.message) {
            errorMessage = data.message;
        }
        
        console.error(`❌ API Error:`, errorMessage, data);
        throw new Error(errorMessage);
    }

    return data;
}

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ascendus.bonhomiee.com";

// type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

// interface ApiOptions {
//     method?: RequestMethod;
//     body?: any;
//     headers?: Record<string, string>;
// }

// export async function apiClient(endpoint: string, options: ApiOptions = {}) {
//     const { method = "GET", body, headers = {} } = options;

//     console.log(`📡 API Call: ${method} ${BASE_URL}${endpoint}`);
//     if (body) {
//         console.log(`📡 Request Body:`, body);
//     }
    
//     // Add cache control headers for GET requests to prevent caching
//     const cacheHeaders: Record<string, string> = {};
//     if (method === "GET") {
//         cacheHeaders["Cache-Control"] = "no-cache, no-store, must-revalidate";
//         cacheHeaders["Pragma"] = "no-cache";
//         cacheHeaders["Expires"] = "0";
//     }
    
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//         method,
//         headers: {
//             "Content-Type": "application/json",
//             ...cacheHeaders,
//             ...headers,
//         },
//         body: body ? JSON.stringify(body) : undefined,
//     });

//     console.log(`📡 Response Status: ${response.status} ${response.statusText}`);
    
//     let data;
//     try {
//         data = await response.json();
//         console.log(`📡 Response Data:`, data);
//     } catch (e) {
//         data = {};
//         console.log(`📡 Could not parse response as JSON`);
//     }

//     if (!response.ok) {
//         let errorMessage = "Failed to process your request.";
        
//         // Check for 409 Conflict (duplicate username/phone)
//         if (response.status === 409) {
//             if (data?.detail?.includes("username")) {
//                 errorMessage = "Your username already exists. Please choose a different username.";
//             } else if (data?.detail?.includes("phone")) {
//                 errorMessage = "Your phone number already exists. Please use a different number.";
//             } else {
//                 errorMessage = data?.detail || "This information already exists. Please use different credentials.";
//             }
//         }
//         // Check for 400 Bad Request
//         else if (response.status === 400) {
//             if (data?.detail) {
//                 if (Array.isArray(data.detail) && data.detail[0]?.msg) {
//                     errorMessage = data.detail[0].msg;
//                 } else {
//                     errorMessage = data.detail;
//                 }
//             } else if (data?.message) {
//                 errorMessage = data.message;
//             }
//         }
//         // Check for 422 Unprocessable Entity
//         else if (response.status === 422) {
//             if (data?.detail) {
//                 if (Array.isArray(data.detail) && data.detail[0]?.msg) {
//                     errorMessage = data.detail[0].msg;
//                 } else {
//                     errorMessage = data.detail;
//                 }
//             } else {
//                 errorMessage = "Invalid data provided. Please check your information.";
//             }
//         }
//         // Check for 500 Server Error
//         else if (response.status === 500) {
//             errorMessage = "Server error. Please try again later.";
//         }
//         // For any other error, try to extract message from response
//         else if (data?.detail) {
//             if (typeof data.detail === 'string') {
//                 errorMessage = data.detail;
//             } else if (Array.isArray(data.detail) && data.detail[0]?.msg) {
//                 errorMessage = data.detail[0].msg;
//             }
//         } else if (data?.message) {
//             errorMessage = data.message;
//         }
        
//         console.error(`❌ API Error:`, errorMessage, data);
//         throw new Error(errorMessage);
//     }

//     return data;
// }