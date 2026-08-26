"use client"

import { useEffect, useState } from "react"
import { SupplierServiceTypes } from "@/services/SupplierPortalServices/SupplierServiceTypes"
import { ServiceSubcategories } from "@/services/SupplierPortalServices/ServiceSubcategories"
import { ServiceSubcategoryParameters } from "@/services/SupplierPortalServices/ServiceSubcategoryParameters"
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

import { ErrorMessage } from "../../signup/supplier/SupplierUtils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { SupplierCatalogAndRates } from "@/services/SupplierPortalServices//SupplierCatalogAndRates"

const labelClass = "text-slate-700 text-[13px] font-medium"

const inputClass =
  "h-12 bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"

const inputClassSelect =
  "h-11 w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"

const thClass =
  "border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold"

  const tdClass =
  "border border-slate-200 px-4 py-3 whitespace-nowrap"

interface EditCatalogAndRateDetailsProps {
  catalogId: number
}

export function EditCatalogAndRateDetails({
  catalogId,
}: EditCatalogAndRateDetailsProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [serviceType, setServiceType] = useState("")
  const [loading, setLoading] = useState(false)
  const [serviceTypes, setServiceTypes] = useState<any[]>([])
  const [serviceTypeLoading, setServiceTypeLoading] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [submittedEnquiryNo, setSubmittedEnquiryNo] = useState("")
  const [serviceTypeError, setServiceTypeError] = useState("")
  const [serviceName, setServiceName] = useState("")
  const [description, setDescription] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [currency, setCurrency] = useState("")
  const [validFrom, setValidFrom] = useState("")
  const [validTo, setValidTo] = useState("")
  const [status, setStatus] = useState("ACTIVE")

  const [serviceNameError, setServiceNameError] = useState("")
  const [currencyError, setCurrencyError] = useState("")

  const [rates, setRates] = useState<any[]>([])
const [editingRateId, setEditingRateId] =
  useState<number | null>(null)
  const [deletingRateId, setDeletingRateId] =
  useState<number | null>(null)
  const [showDeleteRateConfirm, setShowDeleteRateConfirm] =
  useState(false)
  const [rateName, setRateName] = useState("")
  const [basePrice, setBasePrice] = useState("")
  const [minPax, setMinPax] = useState("")
  const [maxPax, setMaxPax] = useState("")
  const [serviceTypeCategory, setServiceTypeCategory] = useState("")
  const [rateCurrency, setRateCurrency] = useState("")
  const [taxPercent, setTaxPercent] = useState("")
  const [markupPercent, setMarkupPercent] = useState("")
  const [effectiveFrom, setEffectiveFrom] = useState("")
  const [effectiveTo, setEffectiveTo] = useState("")
  const [subcategories, setSubcategories] = useState<any[]>([])
  const [subcategoryLoading, setSubcategoryLoading] = useState(false)
  const [selectedSubcategories, setSelectedSubcategories] =
  useState<number[]>([])

const [parameterOptions, setParameterOptions] =
  useState<Record<number, any[]>>({})

const [selectedParameters, setSelectedParameters] =
  useState<Record<number, string>>({})

const [rateFactorSelections, setRateFactorSelections] =
  useState<Record<number, Record<number, string>>>({})
  
  useEffect(() => {
    if (validFrom) {
      setEffectiveFrom(validFrom)
    }
  }, [validFrom])

  useEffect(() => {
    if (validTo) {
      setEffectiveTo(validTo)
    }
  }, [validTo])
  

  const validateEffectiveDates = () => {
    if (effectiveFrom && validFrom && effectiveFrom < validFrom) {
      toast.error("Effective From cannot be earlier than Valid From")
      return false
    }

    if (effectiveTo && validTo && effectiveTo > validTo) {
      toast.error("Effective To cannot be later than Valid To")
      return false
    }

    if (effectiveFrom && effectiveTo && effectiveFrom > effectiveTo) {
      toast.error("Effective From cannot be after Effective To")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) return

    let hasError = false

    setServiceTypeError("")

    if (!serviceType) {
      setServiceTypeError("Service type is required")
      hasError = true
    }

    if (hasError) return

    try {
      setLoading(true)

      const token = localStorage.getItem("access_token")

      if (!token) {
        toast.error("Session expired. Please login again.", {
          position: "top-right",
          duration: 3000,
        })
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")

        router.push("/login")
        return
      }

      const payload = {
        supplier_service_id: serviceType,
        service_name: serviceName,
        description,
        city,
        country,
        currency,
        status,
        valid_from: validFrom,
        valid_to: validTo,
      }

      console.log("Update payload:", payload)
      setShowSuccessAlert(true)

      setServiceType("")
      setServiceName("")
      setDescription("")
      setCity("")
      setCountry("")
      setCurrency("")
      setValidFrom("")
      setValidTo("")
      setStatus("ACTIVE")
    } catch (error: any) {
      console.error("Failed to update catalog:", error)
      toast.error(error?.message || "Failed to update catalog. Please try again.", {
        position: "top-right",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setServiceType("")
    setServiceTypeCategory("")
    setServiceName("")
    setDescription("")
    setCity("")
    setCountry("")
    setCurrency("")
    setValidFrom("")
    setValidTo("")
    setStatus("ACTIVE")

    setRates([])
    setRateName("")
    setBasePrice("")
    setMinPax("")
    setMaxPax("")
    setRateCurrency("")
    setTaxPercent("")
    setMarkupPercent("")
    setEffectiveFrom("")
    setEffectiveTo("")

    setSubcategories([])

    setServiceTypeError("")
    setServiceNameError("")
    setCurrencyError("")

    setShowSuccessAlert(false)
    setSubmittedEnquiryNo("")
  }

  const handleCancel = () => {
    resetForm()
    setOpen(false)
  }

  

  useEffect(() => {
    fetchServiceTypes()
  }, [])

  useEffect(() => {
    if (open && catalogId) {
      fetchCatalogDetails()
    }
  }, [open, catalogId])

  const fetchServiceTypes = async () => {
    try {
      setServiceTypeLoading(true)

      const token = localStorage.getItem("access_token")
      if (!token) {
        toast.error("Session expired. Please login again.")
        return
      }

      const response = await SupplierServiceTypes.getAll(token)
      setServiceTypes(response || [])
    } catch (error) {
      console.error("Failed to fetch service types:", error)
      toast.error("Failed to load service types", {
        position: "top-right",
        duration: 3000,
      })
    } finally {
      setServiceTypeLoading(false)
    }
  }

  const fetchSubcategories = async (selectedServiceType: string) => {
    try {
      setSubcategoryLoading(true)
      const response = await ServiceSubcategories.getByServiceType(selectedServiceType)
      setSubcategories(response || [])
      console.log("EDIT SUBCATEGORIES:", response)
    } catch (error) {
      console.error("Failed to fetch subcategories:", error)
      toast.error("Failed to load subcategories", {
        position: "top-right",
        duration: 3000,
      })
    } finally {
      setSubcategoryLoading(false)
    }
  }

const getRateCardFieldName = (subcategoryName: string) => {
  const name = subcategoryName.trim().toLowerCase()

  const map: Record<string, string> = {
    // HOTEL
    "hotel type": "hotel_type",
    "room type": "hotel_room_type",
    "hotel room type": "hotel_room_type",
    "meal plan": "hotel_meal_plan",
    "hotel meal plan": "hotel_meal_plan",
    "occupancy": "hotel_occupancy",
    "hotel occupancy": "hotel_occupancy",
    "season": "hotel_season",
    "hotel season": "hotel_season",
    "stay duration": "hotel_stay_duration",
    "number of nights": "hotel_stay_duration",

    // TRANSFER
    "vehicle type": "transfer_vehicle_type",
    "transfer vehicle type": "transfer_vehicle_type",
    "route": "transfer_route",
    "transfer route": "transfer_route",
    "trip type": "transfer_trip_type",
    "transfer trip type": "transfer_trip_type",
    "distance slab": "transfer_distance_slab",
    "passenger capacity": "transfer_passenger_capacity",
    "time slot": "transfer_time_slot",

    // CAR RENTAL
    "vehicle category": "car_rental_vehicle_category",
    "rental duration": "car_rental_rental_duration",
    "driver type": "car_rental_driver_type",
    "extra km slab": "car_rental_extra_km_slab",
    "fuel policy": "car_rental_fuel_policy",

    // TOUR PACKAGE
    "package name": "tour_package_name",
    "duration": "tour_package_duration",
    "number of persons": "tour_package_number_of_persons",
    "hotel star rating": "tour_package_hotel_star_rating",
    "inclusions": "tour_package_inclusion_type",
    "inclusion type": "tour_package_inclusion_type",

    // ACTIVITY
    "activity name": "activity_name",
    "passenger category": "activity_passenger_category",
    "activity time slot": "activity_time_slot",
    "activity type": "activity_type",
    "group size": "activity_group_size",

    // INSURANCE
    "destination": "insurance_destination",
    "traveller age band": "insurance_traveller_age_band",
    "trip duration": "insurance_trip_duration",
    "coverage plan": "insurance_coverage_plan",
    "insurance trip type": "insurance_trip_type",

    // VISA
    "visa country": "visa_country",
    "visa type": "visa_type",
    "processing type": "visa_processing_type",
    "validity": "visa_validity",

    // CRUISE
    "cruise name": "cruise_name",
    "cabin type": "cruise_cabin_type",
    "cruise duration": "cruise_duration",
    "departure date": "cruise_departure_date",
    "cruise occupancy": "cruise_occupancy",

    // RAIL
    "train class": "rail_train_class",
    "seat/berth type": "rail_seat_berth_type",
    "passenger type": "rail_passenger_category",
    "rail passenger category": "rail_passenger_category",
    "fare type": "rail_fare_type",

    // BUS
    "bus type": "bus_type",
    "bus route": "bus_route",
    "bus seat type": "bus_seat_type",
    "bus time slot": "bus_time_slot",
  }

  return map[name]
}

  const fetchCatalogDetails = async () => {
    try {
      const token = localStorage.getItem("access_token")
      if (!token) return

      const response = await SupplierCatalogAndRates.getById(catalogId)
      console.log("EDIT CATALOG RESPONSE:", response)
      const catalog = response.catalog

     setServiceType(catalog.service_type || "")
      setServiceName(catalog.service_name || "")
      setDescription(catalog.description || "")
      setCity(catalog.city || "")
      setCountry(catalog.country || "")
      setCurrency(catalog.currency || "")
      setStatus(catalog.status || "ACTIVE")
      console.log("STATUS USED BY DROPDOWN:", catalog.status || "ACTIVE")
    
      setValidFrom(catalog.valid_from || "")
      setValidTo(catalog.valid_to || "")
      setRates(response.rates || [])
     setServiceTypeCategory(
  (catalog as any).service_type_category || ""
)
      if (catalog.service_type) {
  fetchSubcategories(catalog.service_type)
}
    } catch (error) {
      console.error(error)
      toast.error("Failed to load catalog")
    }
  }


  useEffect(() => {
  if (subcategories.length === 0 || rates.length === 0) {
    setSelectedSubcategories([])
    return
  }

  const selectedIds = subcategories
    .filter((subcategory: any) => {
      const fieldName = getRateCardFieldName(
        subcategory.subcategory_name
      )

      if (!fieldName) return false

      return rates.some(
        (rate: any) =>
          rate[fieldName] !== null &&
          rate[fieldName] !== undefined &&
          rate[fieldName] !== ""
      )
    })
    .map((subcategory: any) => subcategory.id)

  setSelectedSubcategories(selectedIds)
}, [subcategories, rates])

useEffect(() => {
  if (selectedSubcategories.length === 0) {
    setParameterOptions({})
    setSelectedParameters({})
    return
  }

  const loadParameters = async () => {
    try {
      setParameterOptions({})
      
      const map: Record<number, any[]> = {}

      for (const id of selectedSubcategories) {
        const response =
          await ServiceSubcategoryParameters.getBySubcategory(id)

        map[id] = response || []
      }

      setParameterOptions(map)
    } catch (error) {
      console.error(
        "Failed to load pricing factor values:",
        error
      )

      toast.error("Failed to load pricing factor values", {
        position: "top-right",
        duration: 3000,
      })
    }
  }

  loadParameters()
}, [selectedSubcategories])

useEffect(() => {
  if (
    rates.length === 0 ||
    selectedSubcategories.length === 0 ||
    Object.keys(parameterOptions).length === 0
  ) {
    setRateFactorSelections({})
    return
  }

  const mappedSelections: Record<
    number,
    Record<number, string>
  > = {}

  rates.forEach((rate: any, index: number) => {
    const rateId = Number(rate.id ?? -(index + 1))

    mappedSelections[rateId] = {}

    selectedSubcategories.forEach((subcategoryId) => {
      const subcategory = subcategories.find(
        (item: any) => item.id === subcategoryId
      )

      if (!subcategory) return

      const fieldName = getRateCardFieldName(
        subcategory.subcategory_name
      )

      if (!fieldName) return

      const savedValue = rate[fieldName]

      if (
        savedValue === null ||
        savedValue === undefined ||
        savedValue === ""
      ) {
        return
      }

      const parameter = (
        parameterOptions[subcategoryId] || []
      ).find(
        (item: any) =>
          String(item.parameter_name).trim().toLowerCase() ===
          String(savedValue).trim().toLowerCase()
      )

      if (parameter) {
        mappedSelections[rateId][subcategoryId] =
          String(parameter.id)
      }
    })
  })

  setRateFactorSelections(mappedSelections)
  console.log(
    "EDIT RATE FACTOR SELECTIONS:",
    mappedSelections)
}, [
  rates,
  selectedSubcategories,
  subcategories,
  parameterOptions,
]
)

const updateRateField = (
  rateId: number,
  field: string,
  value: string
) => {
  setRates((prev) =>
    prev.map((rate) =>
      Number(rate.id) === rateId
        ? { ...rate, [field]: value }
        : rate
    )
  )
}



  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          resetForm()
        }
        setOpen(value)
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" title="Edit service and rate details" className="text-blue-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50">
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !max-w-[1000px] h-[80vh] max-h-[80vh] p-0 overflow-hidden flex flex-col bg-white">
        <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="h-full min-h-0 flex flex-col">
          {showSuccessAlert && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-center text-green-600">Success</h3>
                <p className="mt-3 text-sm text-center text-slate-600">Catalog item updated successfully</p>
                {submittedEnquiryNo && (
                  <p className="mt-2 text-sm font-semibold text-center text-[#00AFEF]">Enquiry No: {submittedEnquiryNo}</p>
                )}
                <Button type="button" className="mt-5 w-full bg-[#00AFEF] hover:bg-[#0098d6]" onClick={() => {
                  setShowSuccessAlert(false)
                  setOpen(false)
                }}>
                  OK
                </Button>
              </div>
            </div>
          )}

          <div className="shrink-0 bg-white px-5 pt-5 pb-3 border-b border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-slate-800">Edit Supplier Catalog Item</DialogTitle>
              <p className="text-sm text-slate-500 mt-1">Update service details and rates</p>
            </DialogHeader>
          </div>

          <AnimatePresence>
            {open && (
              <div className="flex-1 min-h-0 overflow-y-auto touch-pan-y px-5 py-4 scrollbar-thin scrollbar-thumb-[#00AFEF] scrollbar-track-transparent [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#00AFEF] [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="space-y-3">
                  <div className="w-full space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 shadow-sm">
                    <h3 className="text-lg font-semibold">Service Details</h3>
                    <div className="grid grid-cols-2 gap-6 w-full">
                      <div>
                        <Label className={labelClass}>Service Type *</Label>
                        <Select
                          value={serviceType}
                          onValueChange={(value) => {
                            setServiceType(value)
                            setServiceTypeError("")
                            setServiceTypeCategory("")
                            setSubcategories([])
                            fetchSubcategories(value)
                          }}
                        >
                          <SelectTrigger className={`${inputClassSelect}`}>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((item: any) => (
                              <SelectItem key={item.id ?? item} value={item.service_type ?? item}>
                                {item.service_type ?? item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <ErrorMessage message={serviceTypeError} />
                      </div>
                      <div>
                        <Label className={labelClass}>Service Name *</Label>
                        <Input value={serviceName} onChange={(e) => {
                          setServiceName(e.target.value)
                          setServiceNameError("")
                        }} placeholder="Enter service name" className={inputClass} />
                        <ErrorMessage message={serviceNameError} />
                      </div>
                    </div>
                    <div>
                      <Label className={labelClass}>Description *</Label>
                      <Textarea value={description} onChange={(e) => {
                        const text = e.target.value
                        const words = text.trim().split(/\s+/)
                        if (text.trim() === "" || words.length <= 100) {
                          setDescription(text)
                        }
                      }} placeholder="Enter service description (Maximum 100 words)" className="w-full min-h-[140px] bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] resize-none" />
                      <div className="mt-1 text-xs text-slate-500">{description.trim() ? description.trim().split(/\s+/).length : 0}/100 words</div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 w-full">
                      <div>
                        <Label className={labelClass}>City *</Label>
                        <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" className={inputClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Country *</Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger className={`${inputClassSelect}`}>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="Thailand">Thailand</SelectItem>
                            <SelectItem value="Singapore">Singapore</SelectItem>
                            <SelectItem value="Malaysia">Malaysia</SelectItem>
                            <SelectItem value="Indonesia">Indonesia</SelectItem>
                            <SelectItem value="UAE">UAE</SelectItem>
                            <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                            <SelectItem value="Nepal">Nepal</SelectItem>
                            <SelectItem value="Bhutan">Bhutan</SelectItem>
                            <SelectItem value="Maldives">Maldives</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 w-full">
                      <div>
                        <Label className={labelClass}>Valid From</Label>
                        <Input type="date" title="Allowed format: YYYY-MM-DD" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Valid To</Label>
                        <Input type="date" title="Allowed format: YYYY-MM-DD" value={validTo} onChange={(e) => setValidTo(e.target.value)} className={inputClass} />
                      </div>
                      <div>
  <Label className={labelClass}>Status *</Label>

  <Select
  value={status}
  onValueChange={setStatus}
>
  <SelectTrigger className={inputClassSelect}>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>

  <SelectContent>
    {status === "DRAFT" ? (
      <>
        <SelectItem value="DRAFT">Draft</SelectItem>
        <SelectItem value="ACTIVE">Active</SelectItem>
      </>
    ) : (
      <>
        <SelectItem value="ACTIVE">Active</SelectItem>
        <SelectItem value="INACTIVE">Inactive</SelectItem>
      </>
    )}
  </SelectContent>
</Select>
</div>
                    </div>
                  </div>
                  <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 shadow-sm">
                   <h3 className="text-lg font-semibold">
                    Rate Details
                  </h3>

                <p className="text-sm text-slate-500">
                  Review and update each existing rate.
                </p>
                    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <div>
    <h4 className="text-base font-semibold text-slate-800">
      Pricing Factors
    </h4>

    <p className="mt-1 text-sm text-slate-500">
      Select the factors that affect the price of this service.
    </p>
  </div>

  {subcategoryLoading ? (
    <p className="text-sm text-slate-500">
      Loading pricing factors...
    </p>
  ) : (
    <div className="grid grid-cols-2 gap-3">
      {subcategories.map((item: any) => (
        <label
          key={item.id}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedSubcategories.includes(item.id)}
            onChange={() => {
              setSelectedSubcategories((prev) =>
                prev.includes(item.id)
                  ? prev.filter((id) => id !== item.id)
                  : [...prev, item.id]
              )
            }}
            className="h-4 w-4 accent-[#00AFEF]"
          />

          <span className="text-sm">
            {item.subcategory_name}
          </span>
        </label>
      ))}
    </div>
  )}
</div>
 
                    {rates.length > 0 && (
                      <div className="mt-4 rounded-lg border border-slate-200 overflow-hidden bg-white">
                        <div className="px-4 py-3 border-b bg-slate-50 font-medium">Added Rates ({rates.length})</div>
                       <table className="w-full text-sm">
  <thead className="bg-slate-100">
    <tr>
      <th className={thClass}>
        Rate Name
      </th>

      {selectedSubcategories.map((subcategoryId) => {
        const subcategory = subcategories.find(
          (item: any) => item.id === subcategoryId
        )

        return (
          <th
            key={subcategoryId}
            className={thClass}
          >
            {subcategory?.subcategory_name}
          </th>
        )
      })}

      <th className={thClass}>
        Price
      </th>

      <th className={thClass}>
        Currency
      </th>

      <th className={thClass}>
        Min Pax
      </th>

      <th className={thClass}>
        Max Pax
      </th>

      <th className={thClass}>
        Actions
      </th>
    </tr>
  </thead>

  <tbody>
                          {rates.map((rate: any, index: number) => {
                            const rateId = Number(rate.id ?? -(index + 1))

                            return (
                              <tr
                                key={rateId}
                                className="border-t hover:bg-slate-50 transition-colors"
                              >
                                {/* Rate Name */}
                                <td className={tdClass}>
                                  {rate.rate_name || "-"}
                                </td>

                                {/* Pricing Factor Values */}
                                {selectedSubcategories.map((subcategoryId) => {
                                  const subcategory = subcategories.find(
                                    (item: any) => item.id === subcategoryId
                                  )

                                  const parameterId =
                                    rateFactorSelections[rateId]?.[subcategoryId]

                                  const parameter = (
                                    parameterOptions[subcategoryId] || []
                                  ).find(
                                    (item: any) =>
                                      String(item.id) === String(parameterId)
                                  )

                                  return (
                                    <td
                                      key={subcategoryId}
                                      className={tdClass}
                                    >
                                      {parameter?.parameter_name || "-"}
                                    </td>
                                  )
                                })}

                                {/* Price */}
                                <td className={tdClass}>
                                  {rate.base_price ?? "-"}
                                </td>

                                {/* Currency */}
                                <td className={tdClass}>
                                  {rate.currency || "-"}
                                </td>

                                {/* Min Pax */}
                                <td className={tdClass}>
                                  {rate.min_pax ?? "-"}
                                </td>

                                {/* Max Pax */}
                                <td className={tdClass}>
                                  {rate.max_pax ?? "-"}
                                </td>

                                {/* Actions */}
 <td className={tdClass}>
  <div className="flex items-center gap-2">
    <Button
      type="button"
      size="icon"
      variant="outline"
      title="Edit rate"
      onClick={() => {
        setEditingRateId(rateId)
      }}
      className="text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50"
    >
      <Pencil className="h-4 w-4" />
    </Button>

    <Button
      type="button"
      size="icon"
      variant="outline"
      title="Delete rate"
     onClick={() => {
        setDeletingRateId(rateId)
        setShowDeleteRateConfirm(true)
      }}
      className="text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
</td>                                        </tr>
                            )
                          })}
                        </tbody>
                        </table>

                            {editingRateId !== null && (
  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
    {(() => {
      const rate = rates.find(
        (item: any) => Number(item.id) === editingRateId
      )

      if (!rate) return null

      return (
        <>
          <div className="mb-5">
            <h4 className="text-base font-semibold text-slate-800">
              Edit Rate
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              Update pricing-factor values and rate details.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {selectedSubcategories.map((subcategoryId) => {
              const subcategory = subcategories.find(
                (item: any) => item.id === subcategoryId
              )

              if (!subcategory) return null

              const selectedValue =
                rateFactorSelections[editingRateId]?.[
                  subcategoryId
                ] || ""

              return (
                <div key={subcategoryId}>
                  <Label className={labelClass}>
                    {subcategory.subcategory_name}
                  </Label>

                  <Select
                    value={selectedValue}
                    onValueChange={(value) => {
                      setRateFactorSelections((prev) => ({
                        ...prev,
                        [editingRateId]: {
                          ...(prev[editingRateId] || {}),
                          [subcategoryId]: value,
                        },
                      }))
                    }}
                  >
                    <SelectTrigger className={inputClassSelect}>
                      <SelectValue placeholder="Select value" />
                    </SelectTrigger>

                    <SelectContent>
                      {(parameterOptions[subcategoryId] || []).map(
                        (parameter: any) => (
                          <SelectItem
                            key={parameter.id}
                            value={String(parameter.id)}
                          >
                            {parameter.parameter_name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )
            })}

            <div>
              <Label className={labelClass}>
                Rate Name
              </Label>

              <Input
                value={rate.rate_name || ""}
                onChange={(e) =>
                  updateRateField(
                    editingRateId,
                    "rate_name",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <Label className={labelClass}>
                Base Price
              </Label>

              <Input
                type="number"
                value={rate.base_price ?? ""}
                onChange={(e) =>
                  updateRateField(
                    editingRateId,
                    "base_price",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <Label className={labelClass}>
                Currency
              </Label>

              <Select
                value={rate.currency || ""}
                onValueChange={(value) =>
                  updateRateField(
                    editingRateId,
                    "currency",
                    value
                  )
                }
              >
                <SelectTrigger className={inputClassSelect}>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="INR">
                    INR - Indian Rupee
                  </SelectItem>
                  <SelectItem value="USD">
                    USD - US Dollar
                  </SelectItem>
                  <SelectItem value="EUR">
                    EUR - Euro
                  </SelectItem>
                  <SelectItem value="GBP">
                    GBP - British Pound
                  </SelectItem>
                  <SelectItem value="AED">
                    AED - UAE Dirham
                  </SelectItem>
                  <SelectItem value="SGD">
                    SGD - Singapore Dollar
                  </SelectItem>
                  <SelectItem value="THB">
                    THB - Thai Baht
                  </SelectItem>
                  <SelectItem value="MYR">
                    MYR - Malaysian Ringgit
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className={labelClass}>
                Tax %
              </Label>

              <Input
                type="number"
                value={rate.tax_percent ?? ""}
                onChange={(e) =>
                  updateRateField(
                    editingRateId,
                    "tax_percent",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <Label className={labelClass}>
                Markup %
              </Label>

              <Input
                type="number"
                value={rate.markup_percent ?? ""}
                onChange={(e) =>
                  updateRateField(
                    editingRateId,
                    "markup_percent",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <Label className={labelClass}>
                Min Pax
              </Label>

              <Input
                type="number"
                value={rate.min_pax ?? ""}
                onChange={(e) =>
                  updateRateField(
                    editingRateId,
                    "min_pax",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <Label className={labelClass}>
                Max Pax
              </Label>

              <Input
                type="number"
                value={rate.max_pax ?? ""}
                onChange={(e) =>
                  updateRateField(
                    editingRateId,
                    "max_pax",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <Label className={labelClass}>
                Effective From
              </Label>

              <Input
                type="date"
                value={rate.effective_from || ""}
                onChange={(e) =>
                  updateRateField(
                    editingRateId,
                    "effective_from",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <Label className={labelClass}>
                Effective To
              </Label>

              <Input
                type="date"
                value={rate.effective_to || ""}
                onChange={(e) =>
                  updateRateField(
                    editingRateId,
                    "effective_to",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingRateId(null)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="bg-[#00AFEF] hover:bg-[#0099d6]"
              onClick={() => setEditingRateId(null)}
            >
              Save Rate
            </Button>
          </div>
        </>
      )
    })()}
  </div>
)}
                        
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="shrink-0 bg-white px-5 py-4 border-t border-slate-200">
            <div className="flex justify-end gap-3">
              <Button type="button" variant="destructive" onClick={handleCancel} className="h-10 min-w-[120px]">Cancel</Button>
              <Button type="submit" className="h-10 min-w-[180px] bg-[#00AFEF] hover:bg-[#0099d6]">Update Catalog & Rates</Button>
            </div>
          </div>
        </motion.form>
        {showDeleteRateConfirm && (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-[90%] max-w-sm rounded-xl bg-white p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-slate-800">
        Delete Rate
      </h3>

      <p className="mt-3 text-sm text-slate-600">
        Are you sure you want to delete this rate?
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setShowDeleteRateConfirm(false)
            setDeletingRateId(null)
          }}
        >
          Cancel
        </Button>

        <Button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={() => {
            console.log(
              "DELETE RATE REQUESTED:",
              deletingRateId
            )

            setShowDeleteRateConfirm(false)
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  </div>
)}
      </DialogContent>
    </Dialog>
  )
}
