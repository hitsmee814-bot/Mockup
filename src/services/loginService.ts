import { apiClient } from "@/lib/apiClient";

export const loginService = {
  login: (username: string, password: string) => {
    return apiClient("/users/login", {
      method: "POST",
      body: { username, password },
    });
  },

}