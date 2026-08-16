"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  SupplierServiceRequestDetails,
  type ServiceRequestDetails,
} from "@/services/SupplierPortalServices/SupplierServiceRequestDetails"

type DemandDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceRequestId: number | null
}

export default function DemandDetailsDialog({
  open,
  onOpenChange,
  serviceRequestId,
}: DemandDetailsDialogProps) {
  const [details, setDetails] =
    useState<ServiceRequestDetails | null>(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !serviceRequestId) {
      setDetails(null)
      return
    }

    fetchServiceRequestDetails()
  }, [open, serviceRequestId])

  const fetchServiceRequestDetails = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem("access_token")

      if (!token) {
        toast.error("Session expired. Please login again.", {
          position: "top-right",
          duration: 3000,
        })
        return
      }

      const response =
        await SupplierServiceRequestDetails.getServiceRequestDetails(
          token,
          serviceRequestId!
        )

      setDetails(response)
    } catch (error: any) {
      console.error(
        "Failed to load service request details:",
        error
      )

      toast.error(
        error?.message ||
          "Failed to load service request details.",
        {
          position: "top-right",
          duration: 3000,
        }
      )
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (
    value: string | null | undefined
  ) => {
    if (!value) return "-"

    return new Date(value).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    )
  }

  const DetailItem = ({
    label,
    value,
  }: {
    label: string
    value?: string | number | null
  }) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return null
    }

    return (
      <div>
        <p className="text-[12px] font-medium text-slate-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-900">
          {value}
        </p>
      </div>
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          [&>button]:hidden
          w-[95vw]
          max-w-5xl
          h-[85vh]
          max-h-[90vh]
          p-0
          overflow-hidden
          flex
          flex-col
          bg-white
          rounded-lg
        "
      >
        {/* Header */}
        <DialogHeader
          className="
            shrink-0
            border-b
            border-slate-200
            px-6
            py-4
          "
        >
          <DialogTitle className="text-lg font-semibold text-[#00AFEF]">
            Service Request Details
          </DialogTitle>

          {details && (
            <div className="flex items-center gap-3 pt-1">
              <span className="text-sm font-semibold text-slate-800">
                {details.service_request_no}
              </span>

              <Badge
                variant="outline"
                className="border-green-200 bg-green-50 text-green-700"
              >
                {details.status}
              </Badge>
            </div>
          )}
        </DialogHeader>

        {/* Content */}
        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            px-6
            py-5
          "
        >
          {loading && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Loading service request details...
            </div>
          )}

          {!loading && details && (
            <div className="space-y-6">

              {/* Request Information */}
              <section>
                <h3 className="mb-4 text-sm font-semibold text-[#00AFEF]">
                  Request Information
                </h3>

                <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Customer Enquiry No
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.enquiry_no}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Subject
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.subject || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Service Type
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.service_type || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Destination
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.destination || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Travel Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {formatDate(details.travel_date)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Assigned Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {formatDate(details.assigned_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Bid Close
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {formatDate(details.bid_close_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Created Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {formatDate(details.created_at)}
                    </p>
                  </div>

                </div>
              </section>

              {/* Service Requirements */}
              <section className="border-t border-slate-200 pt-5">

                <h3 className="mb-4 text-sm font-semibold text-[#00AFEF]">
                  {details.service_type} Requirements
                </h3>

                <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">

                  {/* Common Requirements */}

                  <DetailItem
                    label="Adults"
                    value={details.adult_count}
                  />

                  <DetailItem
                    label="Children"
                    value={details.child_count}
                  />

                  <DetailItem
                    label="Infants"
                    value={details.infant_count}
                  />

                  <DetailItem
                    label="Child Age Details"
                    value={details.child_age_details}
                  />

                  <DetailItem
                    label="Guide Language"
                    value={details.guide_language}
                  />

                  <DetailItem
                    label="Special Requirements"
                    value={details.special_requirements}
                  />

                  {/* HOTEL */}

                  {details.service_type === "HOTEL" && (
                    <>
                      <DetailItem
                        label="Hotel Type"
                        value={details.hotel_type}
                      />

                      <DetailItem
                        label="Room Type"
                        value={details.hotel_room_type}
                      />

                      <DetailItem
                        label="Meal Plan"
                        value={details.hotel_meal_plan}
                      />

                      <DetailItem
                        label="Occupancy"
                        value={details.hotel_occupancy}
                      />

                      <DetailItem
                        label="Season"
                        value={details.hotel_season}
                      />

                      <DetailItem
                        label="Stay Duration"
                        value={details.hotel_stay_duration}
                      />

                      <DetailItem
                        label="Star Rating"
                        value={details.hotel_star_rating}
                      />

                      <DetailItem
                        label="View"
                        value={details.hotel_view}
                      />

                      <DetailItem
                        label="Bed Type"
                        value={details.hotel_bed_type}
                      />
                    </>
                  )}

                  {/* TRANSFER */}

                  {details.service_type === "TRANSFER" && (
                    <>
                      <DetailItem
                        label="Vehicle Type"
                        value={details.transfer_vehicle_type}
                      />

                      <DetailItem
                        label="Trip Type"
                        value={details.transfer_trip_type}
                      />

                      <DetailItem
                        label="Route"
                        value={details.transfer_route}
                      />

                      <DetailItem
                        label="Distance Slab"
                        value={details.transfer_distance_slab}
                      />

                      <DetailItem
                        label="Passenger Capacity"
                        value={details.transfer_passenger_capacity}
                      />

                      <DetailItem
                        label="Time Slot"
                        value={details.transfer_time_slot}
                      />

                      <DetailItem
                        label="Luggage Count"
                        value={details.transfer_luggage_count}
                      />
                    </>
                  )}

                  {/* CAR RENTAL */}

                  {details.service_type === "CAR_RENTAL" && (
                    <>
                      <DetailItem
                        label="Vehicle Category"
                        value={details.car_rental_vehicle_category}
                      />

                      <DetailItem
                        label="Driver Type"
                        value={details.car_rental_driver_type}
                      />

                      <DetailItem
                        label="Rental Duration"
                        value={details.car_rental_rental_duration}
                      />

                      <DetailItem
                        label="Distance Slab"
                        value={details.car_rental_distance_slab}
                      />

                      <DetailItem
                        label="Extra KM Slab"
                        value={details.car_rental_extra_km_slab}
                      />

                      <DetailItem
                        label="Fuel Policy"
                        value={details.car_rental_fuel_policy}
                      />

                      <DetailItem
                        label="Transmission Type"
                        value={details.car_rental_transmission_type}
                      />
                    </>
                  )}

                  {/* TOUR PACKAGE */}

                  {details.service_type === "TOUR_PACKAGE" && (
                    <>
                      <DetailItem
                        label="Duration"
                        value={details.tour_package_duration}
                      />

                      <DetailItem
                        label="Number of Persons"
                        value={details.tour_package_number_of_persons}
                      />

                      <DetailItem
                        label="Hotel Star Rating"
                        value={details.tour_package_hotel_star_rating}
                      />

                      <DetailItem
                        label="Season"
                        value={details.tour_package_season}
                      />

                      <DetailItem
                        label="Inclusion Type"
                        value={details.tour_package_inclusion_type}
                      />
                    </>
                  )}

                  {/* ACTIVITY */}

                  {details.service_type === "ACTIVITY" && (
                    <>
                      <DetailItem
                        label="Activity"
                        value={details.activity_name}
                      />

                      <DetailItem
                        label="Passenger Category"
                        value={details.activity_passenger_category}
                      />

                      <DetailItem
                        label="Time Slot"
                        value={details.activity_time_slot}
                      />

                      <DetailItem
                        label="Activity Type"
                        value={details.activity_type}
                      />

                      <DetailItem
                        label="Group Size"
                        value={details.activity_group_size}
                      />

                      <DetailItem
                        label="Duration"
                        value={details.activity_duration}
                      />
                    </>
                  )}

                  {/* INSURANCE */}

                  {details.service_type === "INSURANCE" && (
                    <>
                      <DetailItem
                        label="Destination"
                        value={details.insurance_destination}
                      />

                      <DetailItem
                        label="Traveller Age Band"
                        value={details.insurance_traveller_age_band}
                      />

                      <DetailItem
                        label="Trip Duration"
                        value={details.insurance_trip_duration}
                      />

                      <DetailItem
                        label="Coverage Plan"
                        value={details.insurance_coverage_plan}
                      />

                      <DetailItem
                        label="Trip Type"
                        value={details.insurance_trip_type}
                      />
                    </>
                  )}

                  {/* VISA */}

                  {details.service_type === "VISA" && (
                    <>
                      <DetailItem
                        label="Country"
                        value={details.visa_country}
                      />

                      <DetailItem
                        label="Visa Type"
                        value={details.visa_type}
                      />

                      <DetailItem
                        label="Processing Type"
                        value={details.visa_processing_type}
                      />

                      <DetailItem
                        label="Validity"
                        value={details.visa_validity}
                      />
                    </>
                  )}

                  {/* CRUISE */}

                  {details.service_type === "CRUISE" && (
                    <>
                      <DetailItem
                        label="Cruise"
                        value={details.cruise_name}
                      />

                      <DetailItem
                        label="Cabin Type"
                        value={details.cruise_cabin_type}
                      />

                      <DetailItem
                        label="Duration"
                        value={details.cruise_duration}
                      />

                      <DetailItem
                        label="Occupancy"
                        value={details.cruise_occupancy}
                      />

                      <DetailItem
                        label="Embarkation Port"
                        value={details.cruise_embarkation_port}
                      />
                    </>
                  )}

                  {/* RAIL */}

                  {details.service_type === "RAIL" && (
                    <>
                      <DetailItem
                        label="Train Class"
                        value={details.rail_train_class}
                      />

                      <DetailItem
                        label="Route"
                        value={details.rail_route}
                      />

                      <DetailItem
                        label="Seat / Berth Type"
                        value={details.rail_seat_berth_type}
                      />

                      <DetailItem
                        label="Passenger Category"
                        value={details.rail_passenger_category}
                      />

                      <DetailItem
                        label="Fare Type"
                        value={details.rail_fare_type}
                      />

                      <DetailItem
                        label="Coach Type"
                        value={details.rail_coach_type}
                      />
                    </>
                  )}

                  {/* BUS */}

                  {details.service_type === "BUS" && (
                    <>
                      <DetailItem
                        label="Bus Type"
                        value={details.bus_type}
                      />

                      <DetailItem
                        label="Route"
                        value={details.bus_route}
                      />

                      <DetailItem
                        label="Seat Type"
                        value={details.bus_seat_type}
                      />

                      <DetailItem
                        label="Time Slot"
                        value={details.bus_time_slot}
                      />

                      <DetailItem
                        label="Operator Type"
                        value={details.bus_operator_type}
                      />
                    </>
                  )}

                  {/* Remarks */}

                  <DetailItem
                    label="Remarks"
                    value={details.remarks}
                  />

                </div>
              </section>

            </div>
          )}

          {!loading && !details && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No service request details available.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-3">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}