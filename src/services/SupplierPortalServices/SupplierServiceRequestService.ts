import { apiClient } from "@/lib/apiClient";

export type ServiceRequestListItem = {
  id: number;
  service_request_id: number;
  demand_request_no: string;
  service_request_no: string;
  destination: string;
  travel_date: string;
  pax: number;
  service_type: string;
  bid_close_at: string;
  status: string;
  assigned_at: string;

  // Transfer details
  transfer_route?: string | null;
  transfer_vehicle_type?: string | null;
  transfer_trip_type?: string | null;
  transfer_distance_slab?: string | null;
  transfer_passenger_capacity?: string | null;
  transfer_time_slot?: string | null;
  transfer_luggage_count?: number | null;

  // Hotel details
  hotel_type?: string | null;
  hotel_room_type?: string | null;
  hotel_meal_plan?: string | null;
  hotel_stay_duration?: string | null;
  hotel_star_rating?: string | null;
  hotel_view?: string | null;
  hotel_bed_type?: string | null;

  // Activity details
  activity_name?: string | null;
  activity_type?: string | null;
  activity_time_slot?: string | null;
  activity_duration?: string | null;
  activity_group_size?: string | null;

  // General details
  special_requirements?: string | null;
  remarks?: string | null;
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