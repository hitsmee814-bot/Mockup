import { apiClient } from "@/lib/apiClient";

export type ServiceRequestListItem = {
  id: number;
  demand_request_no: string;
  service_request_no: string;
  destination: string;
  travel_date: string;
  pax: number;
  service_type: string;
  bid_close_at: string;
  status: string;
  assigned_at: string;
};

export type ServiceRequestListParams = {
  token: string;
  page?: number;
  size?: number;
  search?: string;
};

export const supplierServiceRequestService = {
  getAssignedServiceRequests(
    params: ServiceRequestListParams
  ) {
    const queryParams = new URLSearchParams();

    queryParams.append("token", params.token);
    queryParams.append("page", String(params.page ?? 1));
    queryParams.append("size", String(params.size ?? 20));

    if (params.search) {
      queryParams.append("search", params.search);
    }

    return apiClient<ServiceRequestListItem[]>(
      `/supplier/demands/assigned-service-requests?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  },
};