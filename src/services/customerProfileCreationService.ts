import { apiClient } from "@/lib/apiClient";

export const customerProfileCreationService = {
  createCustomerProfile: (profileData: {
    user_id: number;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    countrycode: string;  // This should now receive the dial code (e.g., "+91")
    phonenumber: string;
  }) => {
    return apiClient("/profiles/customer/", {
      method: "POST",
      body: profileData,
    });
  },
};