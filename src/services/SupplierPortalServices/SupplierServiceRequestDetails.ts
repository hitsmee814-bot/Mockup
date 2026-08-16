import { apiClient } from "@/lib/apiClient"

export type ServiceRequestDetails = {
  // Common service request details
  id: number
  enquiry_no: string
  service_request_no: string
  subject: string
  service_type: string
  destination: string
  travel_date: string
  status: string

  pax?: number | null
  budget?: number | null
  description?: string | null

  demand_request_id: number
  bid_close_at: string | null
  assigned_at: string | null
  created_at: string | null

  // Common customer requirements
  adult_count?: number | null
  child_count?: number | null
  infant_count?: number | null
  child_age_details?: string | null
  guide_language?: string | null
  special_requirements?: string | null
  remarks?: string | null

  // HOTEL
  hotel_type?: string | null
  hotel_room_type?: string | null
  hotel_meal_plan?: string | null
  hotel_occupancy?: string | null
  hotel_season?: string | null
  hotel_stay_duration?: string | null
  hotel_star_rating?: string | null
  hotel_view?: string | null
  hotel_bed_type?: string | null

  // TRANSFER
  transfer_vehicle_type?: string | null
  transfer_trip_type?: string | null
  transfer_route?: string | null
  transfer_distance_slab?: string | null
  transfer_passenger_capacity?: string | null
  transfer_time_slot?: string | null
  transfer_luggage_count?: number | null

  // CAR RENTAL
  car_rental_vehicle_category?: string | null
  car_rental_driver_type?: string | null
  car_rental_rental_duration?: string | null
  car_rental_distance_slab?: string | null
  car_rental_extra_km_slab?: string | null
  car_rental_fuel_policy?: string | null
  car_rental_transmission_type?: string | null

  // TOUR PACKAGE
  tour_package_duration?: string | null
  tour_package_number_of_persons?: string | null
  tour_package_hotel_star_rating?: string | null
  tour_package_season?: string | null
  tour_package_inclusion_type?: string | null

  // ACTIVITY
  activity_name?: string | null
  activity_passenger_category?: string | null
  activity_time_slot?: string | null
  activity_type?: string | null
  activity_group_size?: string | null
  activity_duration?: string | null

  // INSURANCE
  insurance_destination?: string | null
  insurance_traveller_age_band?: string | null
  insurance_trip_duration?: string | null
  insurance_coverage_plan?: string | null
  insurance_trip_type?: string | null

  // VISA
  visa_country?: string | null
  visa_type?: string | null
  visa_processing_type?: string | null
  visa_validity?: string | null

  // CRUISE
  cruise_name?: string | null
  cruise_cabin_type?: string | null
  cruise_duration?: string | null
  cruise_occupancy?: string | null
  cruise_embarkation_port?: string | null

  // RAIL
  rail_train_class?: string | null
  rail_route?: string | null
  rail_seat_berth_type?: string | null
  rail_passenger_category?: string | null
  rail_fare_type?: string | null
  rail_coach_type?: string | null

  // BUS
  bus_type?: string | null
  bus_route?: string | null
  bus_seat_type?: string | null
  bus_time_slot?: string | null
  bus_operator_type?: string | null
}

export const SupplierServiceRequestDetails = {
  getServiceRequestDetails: (
    token: string,
    serviceRequestId: number
  ): Promise<ServiceRequestDetails> => {
    const params = new URLSearchParams()

    params.append("token", token)

    return apiClient(
      `/supplier/enquiries/service-requests/${serviceRequestId}?${params.toString()}`,
      {
        method: "GET",
      }
    )
  },
}