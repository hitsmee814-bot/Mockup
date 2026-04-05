import { apiClient } from "@/lib/apiClient";

export const userCreationService = {
  createUser: (userData: {
    username: string;
    password: string;
    user_org_id: number;
    email: string;
    phone: string;
  }) => {
    // Remove the leading slash if apiClient already handles it
    // Or keep it as is - check how other services work
    return apiClient("/users/", {
      method: "POST",
      body: userData,
    });
  },
};