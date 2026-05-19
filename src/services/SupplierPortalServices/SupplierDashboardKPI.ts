import { apiClient } from "@/lib/apiClient";


type KPIResponse = {
  total_bids: number;
  active_requests: number;
  won_bids: number;
  revenue: number;
  bid_success_rate: number;
};


export const kpiService = {
  getKpis: (token: string): Promise<KPIResponse> => {
    return apiClient(
      `/supplier/dashboard/kpis?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      }
    );
  },
};