import { apiClient } from "@/lib/apiClient"

export type CatalogPayload = {
  supplier_service_id: number
  service_name: string
  description?: string
  city?: string
  country?: string
  currency?: string
  valid_from?: string
  valid_to?: string
  status: string
}

export type RatePayload = {
  catalog_id: number

  rate_name: string
  base_price: number
  tax_percent: number
  markup_percent: number
  currency: string
  min_pax?: number
  max_pax?: number
  effective_from: string
  effective_to?: string
  status: string

  // HOTEL
  hotel_type?: string
  hotel_room_type?: string
  hotel_meal_plan?: string
  hotel_occupancy?: string
  hotel_season?: string
  hotel_stay_duration?: string

  // TRANSFER
  transfer_vehicle_type?: string
  transfer_route?: string
  transfer_trip_type?: string
  transfer_distance_slab?: string
  transfer_passenger_capacity?: string
  transfer_time_slot?: string

  // CAR RENTAL
  car_rental_vehicle_category?: string
  car_rental_rental_duration?: string
  car_rental_driver_type?: string
  car_rental_distance_slab?: string
  car_rental_extra_km_slab?: string
  car_rental_fuel_policy?: string

  // TOUR PACKAGE
  tour_package_name?: string
  tour_package_duration?: string
  tour_package_number_of_persons?: string
  tour_package_hotel_star_rating?: string
  tour_package_season?: string
  tour_package_inclusion_type?: string

  // ACTIVITY
  activity_name?: string
  activity_passenger_category?: string
  activity_time_slot?: string
  activity_type?: string
  activity_group_size?: string

  // INSURANCE
  insurance_destination?: string
  insurance_traveller_age_band?: string
  insurance_trip_duration?: string
  insurance_coverage_plan?: string
  insurance_trip_type?: string

  // VISA
  visa_country?: string
  visa_type?: string
  visa_processing_type?: string
  visa_validity?: string

  // CRUISE
  cruise_name?: string
  cruise_cabin_type?: string
  cruise_duration?: string
  cruise_departure_date?: string
  cruise_occupancy?: string

  // RAIL
  rail_train_class?: string
  rail_route?: string
  rail_seat_berth_type?: string
  rail_passenger_category?: string
  rail_fare_type?: string

  // BUS
  bus_type?: string
  bus_route?: string
  bus_seat_type?: string
  bus_time_slot?: string
}
export const SupplierCreateCatalogRateService = {

  async createCatalog(
  payload: CatalogPayload
) {
  return apiClient(
    "/supplier/services",
    {
      method: "POST",
      body: payload
    }
  )
},

async createRate(
  payload: RatePayload
) {
  return apiClient(
    "/supplier/rates/create_rate",
    {
      method: "POST",
      body: payload
    }
  )
},

  async createCatalogAndRate(
    catalogPayload: CatalogPayload,
    ratePayload: Omit<RatePayload, "catalog_id">
  ) {

    // Create Catalog
    const catalog =
      await this.createCatalog(catalogPayload)

    // Create Rate
    const rate =
      await this.createRate({
        ...ratePayload,
        catalog_id: catalog.id
      })

    return {
      catalog,
      rate
    }
  }
}