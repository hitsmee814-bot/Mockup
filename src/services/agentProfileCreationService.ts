import { apiClient } from "@/lib/apiClient";

export const agentProfileCreationService = {
  createAgentProfile: (profileData: {
    user_id: number;
    agencyname: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    countrycode: string;
    phonenumber: string;
    websiteurl: string;
  }) => {
    return apiClient("/profiles/agent/", {
      method: "POST",
      body: profileData,
    });
  },
};