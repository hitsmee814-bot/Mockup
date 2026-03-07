import { apiClient } from "@/lib/apiClient";

export const otpService = {
  sendMobileOtp: (mobile: string) => {
    return apiClient("/send-otp", {
      method: "POST",
      body: { mobile },
    });
  },

  verifyMobileOtp: (mobile: string, otp: string) => {
    return apiClient("/verify-otp", {
      method: "POST",
      body: {
        type: "mobile",
        identifier: mobile,
        otp,
      },
    });
  },

  sendEmailOtp: (email: string) => {
    return apiClient("/send-otp", {
      method: "POST",
      body: { email },
    });
  },

  verifyEmailOtp: (email: string, otp: string) => {
    return apiClient("/verify-otp", {
      method: "POST",
      body: {
        type: "email",
        identifier: email,
        otp,
      },
    });
  },
};