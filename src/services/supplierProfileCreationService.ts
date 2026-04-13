import { apiClient } from "@/lib/apiClient";

type SupplierProfilePayload = {
  user_id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  countrycode: string;   
    phonenumber: string;  
  suppliername: string;
  tradename: string;
  servicetype: Record<string, any>;  // flexible object
  country: string;
  websiteurl: string;
};

export const supplierProfileCreationService = {
  createSupplierProfile: (profileData: SupplierProfilePayload) => {
    return apiClient("/profiles/supplier/", {
      method: "POST",
      body: profileData,
    });
  },
};