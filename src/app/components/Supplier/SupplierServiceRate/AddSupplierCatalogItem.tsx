"use client"

import { useEffect, useState } from "react"
import { SupplierServiceTypes } from "@/services/SupplierPortalServices/SupplierServiceTypes"
import { ServiceSubcategories } from "@/services/SupplierPortalServices/ServiceSubcategories"
import { useRouter } from 'next/navigation'

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

import { CalendarIcon } from "lucide-react"
import { ErrorMessage } from "../../signup/supplier/SupplierUtils"
import { ServiceSubcategoryParameters } from "@/services/SupplierPortalServices/ServiceSubcategoryParameters"
import SectionHeader from "../SectionHeader";
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Info } from "lucide-react";
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { SupplierCreateCatalogRateService } from "@/services/SupplierPortalServices/SupplierCreateCatalogRateService"


const labelClass =
  "text-slate-700 text-[14px] font-medium mb-2 block"
const inputClass =
  "h-10 w-full cursor-text bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"

  const inputClassSelect =
  "h-11 w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
    const thClass =
  "border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold";

  const tdClass =
  "border border-slate-200 px-4 py-3 whitespace-nowrap";

type AddSupplierCatalogItemProps = {
  onSaved?: (status: "ACTIVE" | "DRAFT") => void
}

export function AddSupplierCatalogItem({
  onSaved,
}: AddSupplierCatalogItemProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
   const [serviceType, setServiceType] = useState("")
    const [loading, setLoading] = useState(false)
  const [serviceTypes, setServiceTypes] = useState<any[]>([])
const [serviceTypeLoading, setServiceTypeLoading] = useState(false)
const [showSuccessAlert, setShowSuccessAlert] = useState(false)
const [submittedEnquiryNo, setSubmittedEnquiryNo] = useState("")
const [serviceTypeError, setServiceTypeError] = useState("")
const [validFromCalendarOpen, setValidFromCalendarOpen] = useState(false)
const [validToCalendarOpen, setValidToCalendarOpen] = useState(false)
const [effectiveFromCalendarOpen, setEffectiveFromCalendarOpen] =
  useState(false)
const [effectiveToCalendarOpen, setEffectiveToCalendarOpen] = useState(false)
const [serviceName, setServiceName] = useState("")
const [description, setDescription] = useState("")
const [city, setCity] = useState("")
const [country, setCountry] = useState("")
const [currency, setCurrency] = useState("")
const [validFrom, setValidFrom] = useState("")
const [validTo, setValidTo] = useState("")
const [status, setStatus] = useState("ACTIVE")
const [effectiveFromError, setEffectiveFromError] = useState("")
const [effectiveToError, setEffectiveToError] = useState("")
const [serviceNameError, setServiceNameError] = useState("")
const [currencyError, setCurrencyError] = useState("")
const [descriptionError, setDescriptionError] = useState("")
const [cityError, setCityError] = useState("")
const [countryError, setCountryError] = useState("")
const [validFromError, setValidFromError] = useState("")
const [validToError, setValidToError] = useState("")
const [rateCurrencyError, setRateCurrencyError] = useState("")
const [selectedPricingFactorsError, setSelectedPricingFactorsError] = useState("")

const [rates, setRates] = useState<any[]>([])

const [rateName, setRateName] = useState("")
const [basePrice, setBasePrice] = useState("")
const [minPax, setMinPax] = useState("")
const [maxPax, setMaxPax] = useState("")
const [rateCurrency, setRateCurrency] = useState("")
const [taxPercent, setTaxPercent] = useState("")
const [markupPercent, setMarkupPercent] = useState("")
const [effectiveFrom, setEffectiveFrom] = useState("")
const [effectiveTo, setEffectiveTo] = useState("")
const [subcategories, setSubcategories] = useState<any[]>([])
const [subcategoryLoading, setSubcategoryLoading] = useState(false)
const [parameterLoading, setParameterLoading] = useState(false)
const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>([])

const [parameterOptions, setParameterOptions] = useState<
  Record<number, any[]>
>({})

const [selectedParameters, setSelectedParameters] = useState<
  Record<number, string>
>({})



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

const toggleSubcategory = (id: number) => {
  setSelectedPricingFactorsError("")

  setSelectedSubcategories((prev) => {
    const updated = prev.includes(id)
      ? prev.filter(x => x !== id)
      : [...prev, id]

    return updated
  })
}

const validateEffectiveDates = () => {

  if (!effectiveFrom) {
  toast.error("Effective From is required", {
    position: "top-right",
    duration: 3000,
  })
  return false
}

if (!effectiveTo) {
  toast.error("Effective To is required", {
    position: "top-right",
    duration: 3000,
  })
  return false
}
  if (
    effectiveFrom &&
    validFrom &&
    effectiveFrom < validFrom
  ) {
    toast.error(
      "Effective From cannot be earlier than Valid From",{
      position: "top-right",
     duration: 3000,}
    )
    return false
  }

  if (
    effectiveTo &&
    validTo &&
    effectiveTo > validTo
  ) {
    toast.error(
      "Effective To cannot be later than Valid To",{
      position: "top-right",
     duration: 3000,}
    )
    return false
  }

  if (
    effectiveFrom &&
    effectiveTo &&
    effectiveFrom > effectiveTo
  ) {
    toast.error(
      "Effective From cannot be after Effective To",{
      position: "top-right",
     duration: 3000,}
    )
    return false
  }

  return true
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
    "country": "visa_country",
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
    "bus time slot": "bus_time_slot"
  }

  return map[name]
}

const validateServiceDetails = () => {
  let isValid = true

  // Clear previous errors
  setServiceTypeError("")
  setServiceNameError("")
  setDescriptionError("")
  setCountryError("")
  setCityError("")
  setCurrencyError("")
  setValidFromError("")
  setValidToError("")

  if (!serviceType.trim()) {
    setServiceTypeError("Required")
    isValid = false
  }

  if (!serviceName.trim()) {
    setServiceNameError("Required")
    isValid = false
  }

  if (!description.trim()) {
    setDescriptionError("Required")
    isValid = false
  }

  if (!country.trim()) {
    setCountryError("Required")
    isValid = false
  }

  if (!city.trim()) {
    setCityError("Required")
    isValid = false
  }


  const today = new Date().toISOString().split("T")[0]

if (!validFrom) {
  setValidFromError("Required")
  isValid = false
} else if (validFrom < today) {
  setValidFromError("Date cannot be earlier than today")
  isValid = false
}

if (!validTo) {
  setValidToError("Required")
  isValid = false
} else if (validTo < today) {
  setValidToError("Date cannot be earlier than today")
  isValid = false
}

if (validFrom && validTo && validFrom > validTo) {
  setValidToError("Valid To cannot be earlier than Valid From")
  isValid = false
}

  return isValid
}

const validatePricingFactors = () => {
  if (selectedSubcategories.length === 0) {
    toast.error("Select at least one pricing factor", {
      position: "top-right",
      duration: 3000,
    })
    return false
  }

  return true
}
const validateRates = () => {
  if (rates.length === 0) {
    toast.error("Add at least one rate", {
      position: "top-right",
      duration: 3000,
    })
    return false
  }

  return true
}


const handleSaveAsDraft = async () => {
  if (loading) return

  if (!serviceType.trim()) {
    toast.error("Service Type is required", {
      position: "top-right",
      duration: 3000,
    })
    return
  }

  if (!serviceName.trim()) {
    toast.error("Service Name is required", {
      position: "top-right",
      duration: 3000,
    })
    return
  }

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

    const selectedService = serviceTypes.find(
      (item) => item.service_type === serviceType
    )

    if (!selectedService?.id) {
      throw new Error(
        "Selected service type could not be identified."
      )
    }

    const draftPayload = {
      supplier_service_id: Number(selectedService.id),
      service_name: serviceName.trim(),
      description: description.trim() || undefined,
      city: city.trim() || undefined,
      country: country || undefined,
      currency: currency || "INR",
      valid_from: validFrom || undefined,
      valid_to: validTo || undefined,
      status: "DRAFT",
    }

    const catalog =
      await SupplierCreateCatalogRateService.createCatalog(
        draftPayload
      )

    if (!catalog?.id) {
      throw new Error(
        "Draft was created but no catalog ID was returned."
      )
    }

    toast.success("Catalog saved as draft.", {
      position: "top-right",
      duration: 3000,
    })

onSaved?.("DRAFT")

    setOpen(false)
    resetForm()
  } catch (error: any) {
    console.error("Failed to save draft:", error)

    toast.error(
      error?.message || "Failed to save draft. Please try again.",
      {
        position: "top-right",
        duration: 3000,
      }
    )
  } finally {
    setLoading(false)
  }
}

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
   


  if (loading) return
  const serviceDetailsValid = validateServiceDetails()

if (!serviceDetailsValid) {
  return
}
const pricingFactorsValid = validatePricingFactors()


if (!pricingFactorsValid) {
  return
}

const ratesValid = validateRates()

if (!ratesValid) {
  return
}



  try {
    setLoading(true)

    const token = localStorage.getItem("access_token")

    if (!token) {
     toast.error("Session expired. Please login again.",{
      position: "top-right",
     duration: 3000,})
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  router.push("/login");

  return;
    }

const selectedService = serviceTypes.find(
  (item) => item.service_type === serviceType
)
if (!selectedService?.id) {
  throw new Error(
    "Selected service type could not be identified."
  )
}

const catalogPayload = {
 supplier_service_id: Number(selectedService.id),
  service_name: serviceName.trim(),
  description: description.trim(),
  city: city.trim(),
  country,
  currency,
  valid_from: validFrom,
  valid_to: validTo,
  status: "ACTIVE",
}

const catalog =
  await SupplierCreateCatalogRateService.createCatalog(
    catalogPayload
  )

if (!catalog?.id) {
  throw new Error(
    "Catalog was created but no catalog ID was returned."
  )
}
for (const rate of rates) {
  const ratePayload = {
    catalog_id: catalog.id,

    rate_name: rate.rate_name,
    base_price: Number(rate.base_price),
    tax_percent: Number(rate.tax_percent || 0),
    markup_percent: Number(rate.markup_percent || 0),
    currency: rate.currency,

    min_pax: rate.min_pax
      ? Number(rate.min_pax)
      : 1,

    max_pax: rate.max_pax
      ? Number(rate.max_pax)
      : undefined,

    effective_from: rate.effective_from,
    effective_to: rate.effective_to || undefined,

    status: "ACTIVE",

    ...Object.fromEntries(
      Object.entries(rate).filter(
        ([key]) =>
          key !== "combinationKey" &&
          key !== "attributes" &&
          ![
            "rate_name",
            "base_price",
            "tax_percent",
            "markup_percent",
            "currency",
            "min_pax",
            "max_pax",
            "effective_from",
            "effective_to",
          ].includes(key)
      )
    ),
  }

  await SupplierCreateCatalogRateService.createRate(
    ratePayload
  )
}
toast.success("Catalog and rates created successfully.", {
  position: "top-right",
  duration: 3000,
})
onSaved?.("ACTIVE")
setOpen(false)
resetForm()

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
    console.error("Failed :", error)
    toast.error(
  error?.message || "Failed . Please try again.",
  {
    position: "top-right",
    duration: 3000,
  }
)
  } finally {
    setLoading(false)
  }
}

const resetForm = () => {
  // Service Details
  setServiceType("")
  
  setServiceName("")
  setDescription("")
  setCity("")
  setCountry("")
  setCurrency("")
  setValidFrom("")
  setValidTo("")
  setStatus("ACTIVE")

  // Rates
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

  // Dropdown Data
  setSubcategories([])

  // Errors
  setServiceTypeError("")
  setServiceNameError("")
  setCurrencyError("")

  // Success Popup
  setShowSuccessAlert(false)
  setSubmittedEnquiryNo("")
}

const resetCurrentRate = () => {
  setRateName("");
  setBasePrice("");
  setRateCurrency("");
  setTaxPercent("");
  setMarkupPercent("");
  setMinPax("");
  setMaxPax("");
  setEffectiveFrom(validFrom);
  setEffectiveTo(validTo);
}

  const handleCancel = () => {
  resetForm()
  setOpen(false)
}



  useEffect(() => {
  fetchServiceTypes()
}, [])
const fetchServiceTypes = async () => {
  try {
    setServiceTypeLoading(true)

    const token =
      localStorage.getItem("access_token")

    if (!token) {
      toast.error(
        "Session expired. Please login again.",{
      position: "top-right",
     duration: 3000,}
      )
      return
    }

    const response =
      await SupplierServiceTypes.getAll(token)

    setServiceTypes(response || [])
  } catch (error) {
    console.error(
      "Failed to fetch service types:",
      error
    )

    toast.error(
      "Failed to load service types",
      {
        position: "top-right",
        duration: 3000,
      }
    )
  } finally {
    setServiceTypeLoading(false)
  }
}


const handleServiceTypeChange = async (value: string) => {

  setServiceType(value);

  setServiceTypeError("");

  // Clear old subcategories
  setSubcategories([]);

  // Clear selected checkboxes
  setSelectedSubcategories([]);

  // Clear parameter dropdown data
  setParameterOptions({});

  // Clear selected parameter values
  setSelectedParameters({});

  // Clear all rates already added
  setRates([]);

  // Clear current rate details
  resetCurrentRate();

  // Load new subcategories
  await fetchSubcategories(value);

};

const fetchSubcategories = async (
  selectedServiceType: string
) => {
  try {
    setSubcategoryLoading(true)

    const response =
      await ServiceSubcategories.getByServiceType(
        selectedServiceType
      )

    setSubcategories(response || [])
  } catch (error) {
    console.error(
      "Failed to fetch subcategories:",
      error
    )

    toast.error(
      "Failed to load subcategories",
      {
        position: "top-right",
        duration: 3000,
      }
    )
  } finally {
    setSubcategoryLoading(false)
  }
}
 
useEffect(() => {

  if (selectedSubcategories.length === 0) {
    setParameterOptions({})
    setSelectedParameters({})
    return
  }

  const loadParameters = async () => {

    setParameterLoading(true)

    const map: Record<number, any[]> = {}

    try {

      for (const id of selectedSubcategories) {

        const response =
          await ServiceSubcategoryParameters.getBySubcategory(id)

        map[id] = response || []

      }

      setParameterOptions(map)

    } finally {

      setParameterLoading(false)

    }

  }

  loadParameters()

}, [selectedSubcategories])


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
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
         Add Catalog Item
        </Button>
      </DialogTrigger>

      <DialogContent
  className="
    !w-[95vw]
    !max-w-[850px]
    h-[80vh]
    max-h-[80vh]
    p-0
    overflow-hidden
    flex
    flex-col
    bg-white
  "
>
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="h-full min-h-0 flex flex-col"
        >
          {showSuccessAlert && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-center text-green-600">
                Success
              </h3>

              <p className="mt-3 text-sm text-center text-slate-600">
              Catalog item created successfully
            </p>

            {submittedEnquiryNo && (
              <p className="mt-2 text-sm font-semibold text-center text-[#00AFEF]">
                Enquiry No: {submittedEnquiryNo}
              </p>
            )}

              <Button
                type="button"
                className="mt-5 w-full bg-[#00AFEF] hover:bg-[#0098d6]"
                onClick={() => {
                  setShowSuccessAlert(false)
                  setOpen(false)
                }}
              >
                OK
              </Button>
            </div>
          </div>
        )}
          <div className="shrink-0 bg-white px-5 pt-5 pb-3 border-b border-slate-200">
            <DialogHeader>
           <DialogTitle className="text-xl font-semibold text-slate-800">
  Add Catalog Item
</DialogTitle>

<p className="text-sm text-slate-500 mt-1">
  Create service details and configure rates
</p>

       </DialogHeader>

            
          </div>

          <AnimatePresence>
            {open && (
              <div
                className="flex-1 min-h-0 overflow-y-auto touch-pan-y px-5 py-4
                scrollbar-thin scrollbar-thumb-[#00AFEF] scrollbar-track-transparent
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-[#00AFEF]
                [&::-webkit-scrollbar-thumb]:rounded-full"
              >
               <div className="space-y-3">
      

<div className="w-full space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 shadow-sm">

    <SectionHeader
    step={1}
    title="Service Details"
    description="Basic information about the service you're offering."
  />

         <div className="grid grid-cols-2 gap-6 w-full">

  <div>
     <Label className={labelClass}>
      Service Type *
    </Label>

   <Select
  value={serviceType}
  onValueChange={handleServiceTypeChange}
>
    <SelectTrigger
  className={`${inputClassSelect} ${
    serviceTypeError
      ? "border-red-500 ring-1 ring-red-500"
      : ""
  }`}
>
        <SelectValue placeholder="Select service type" />
      </SelectTrigger>

      <SelectContent>
        {serviceTypes.map((item: any) => (
  <SelectItem
    key={item.id}
    value={item.service_type}
  >
    {item.service_type}
  </SelectItem>
))}
      </SelectContent>
    </Select>

    <ErrorMessage message={serviceTypeError} />
  </div>

  <div>
     <Label className={labelClass}>
      Service Name *
    </Label>

    <Input
      value={serviceName}
      onChange={(e) => {
        setServiceName(e.target.value)
        setServiceNameError("")
      }}
      placeholder="Enter service name"
      className={`${inputClass} ${
      serviceNameError
    ? "border-red-500 ring-1 ring-red-500"
    : ""
    }`}
    />

    <ErrorMessage message={serviceNameError} /> 

  </div>

</div>
    
        <div>
       
    <div>
      
      </div>
      </div>
    
    <div>
       
    <div>
  <Label className={labelClass}>
    Description *
  </Label>

  <Textarea
    value={description}
    onChange={(e) => {
      const text = e.target.value
      setDescriptionError("")
      // Limit to approximately 100 words
      const words = text.trim().split(/\s+/)

      if (text.trim() === "" || words.length <= 100) {
        setDescription(text)
      }
    }}
    placeholder="Enter service description (Maximum 100 words)"
    className={`w-full min-h-[140px] bg-white border text-slate-900
  placeholder:text-slate-400
  focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]
  resize-none ${
    descriptionError
      ? "border-red-500 ring-1 ring-red-500"
      : "border-slate-300"
  }`}
  />

  <div className="mt-1 text-xs text-slate-500">
    {description.trim()
      ? description.trim().split(/\s+/).length
      : 0}
    /100 words
  </div>
  <ErrorMessage message={descriptionError} />
</div>
     <div className="grid grid-cols-2 gap-6 w-full">


      <div>
    <Label className={labelClass}>
      Country *
    </Label>

    <Select
      value={country}
      onValueChange={(value) => {
      setCountry(value)
      setCountryError("")
      setCity("")
      setCityError("")
    }}
    >
            <SelectTrigger
        className={`${inputClassSelect} ${
          countryError
            ? "border-red-500 ring-1 ring-red-500"
            : ""
        }`}
      >
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
          <ErrorMessage message={countryError} />
  </div>
  <div>
    <Label className={labelClass}>
      City *
    </Label>

  <Input
  value={city}
  readOnly={!country}
  placeholder={country ? "Enter city" : "Select Country First"}
  className={`${inputClass} ${
  cityError
    ? "border-red-500 ring-1 ring-red-500"
    : "border-slate-300"
} ${!country ? "bg-gray-100 cursor-not-allowed" : ""}`}
  onClick={() => {
    if (!country) {
      toast.info("Please select a country first.");
    }
  }}
 onChange={(e) => {
  if (country) {
    setCity(e.target.value)
    setCityError("")
  }
}}
/>
<ErrorMessage message={cityError} />
  </div>

  

</div>
    
     <div className="grid grid-cols-2 gap-6 w-full">
<div>
  <Label className={labelClass}>
    Valid From
  </Label>

<Popover
  open={validFromCalendarOpen}
  onOpenChange={setValidFromCalendarOpen}
>
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant="outline"
        className={`
          h-10
          w-full
          justify-start
          cursor-pointer
          rounded-md
          bg-white
          px-3
          text-left
          font-normal
          text-slate-900
          hover:bg-white
          hover:text-slate-900
          ${
            validFromError
              ? "border-red-500 ring-1 ring-red-500"
              : "border-slate-300"
          }
        `}
      >
        <CalendarIcon
          className="mr-2 h-4 w-4 shrink-0 text-[#00AFEF]"
        />

        {validFrom ? (
          format(new Date(validFrom), "dd MMM yyyy")
        ) : (
          <span className="text-slate-400">
            Select valid from
          </span>
        )}
      </Button>
    </PopoverTrigger>

    <PopoverContent
      className="w-auto p-0"
      align="start"
    >
      <Calendar
        mode="single"
        selected={
          validFrom
            ? new Date(validFrom)
            : undefined
        }
      onSelect={(date) => {
      if (!date) return

      const formattedDate =
        format(date, "yyyy-MM-dd")

      setValidFrom(formattedDate)
      setValidFromError("")
      setValidFromCalendarOpen(false)
    }}
        disabled={(date) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          return date < today
        }}
      />
    </PopoverContent>
  </Popover>

  <ErrorMessage message={validFromError} />
</div>

<div>
  <Label className={labelClass}>
    Valid To
  </Label>

 <Popover
  open={validToCalendarOpen}
  onOpenChange={setValidToCalendarOpen}
>
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant="outline"
        className={`
          h-10
          w-full
          justify-start
          cursor-pointer
          rounded-md
          bg-white
          px-3
          text-left
          font-normal
          text-slate-900
          hover:bg-white
          hover:text-slate-900
          ${
            validToError
              ? "border-red-500 ring-1 ring-red-500"
              : "border-slate-300"
          }
        `}
      >
        <CalendarIcon
          className="mr-2 h-4 w-4 shrink-0 text-[#00AFEF]"
        />

        {validTo ? (
          format(new Date(validTo), "dd MMM yyyy")
        ) : (
          <span className="text-slate-400">
            Select valid to
          </span>
        )}
      </Button>
    </PopoverTrigger>

    <PopoverContent
      className="w-auto p-0"
      align="start"
    >
      <Calendar
        mode="single"
        selected={
          validTo
            ? new Date(validTo)
            : undefined
        }
       onSelect={(date) => {
        if (!date) return

        const formattedDate =
          format(date, "yyyy-MM-dd")

        setValidTo(formattedDate)
        setValidToError("")
        setValidToCalendarOpen(false)
      }}
        disabled={(date) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          if (date < today) {
            return true
          }

          if (validFrom) {
            const fromDate = new Date(validFrom)
            fromDate.setHours(0, 0, 0, 0)

            return date < fromDate
          }

          return false
        }}
      />
    </PopoverContent>
  </Popover>

  <ErrorMessage message={validToError} />
</div>

    </div>
</div>
   

  </div>
  <div className="w-full space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 shadow-sm">
  <SectionHeader
  step={2}
  title="Pricing Factors"
  description="Select the factors that affect the price of this service."
/>

  <div>
  <div className="mb-3 flex items-center justify-between">
  <Label className={`${labelClass} mb-0`}>
    Select Pricing Factors
  </Label>

  <Popover>
    <PopoverTrigger asChild>
      <button
        type="button"
        className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700 hover:underline"
      >
        <span>Learn more</span>
        <Info className="h-4 w-4" />
      </button>
    </PopoverTrigger>

    <PopoverContent
      className="w-96"
      align="start"
    >
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900">
          How to Choose Pricing Factors
        </h4>

       

        <div className="text-sm space-y-2">
         

          <ul className="list-disc pl-5 space-y-1">
            

            <li>
              Select a factor if changing its value changes the price.
            </li>
            <li>
              Leave a factor unselected if it does not affect the price.
            </li>
            <li>
              Once the first rate is added, these pricing factors are locked. Delete all rates to modify selected pricing factors.
            </li>
          </ul>
        </div>

        
      </div>
    </PopoverContent>
  </Popover>
  </div>
  {subcategoryLoading ? (
  <p className="text-sm text-slate-500">
    Loading...
  </p>
) : (
  <div>
    <div className="grid grid-cols-2 gap-3 mt-2">
      {subcategories.map((item: any) => (
        <label
          key={item.id}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedSubcategories.includes(item.id)}
            disabled={rates.length > 0}
            onChange={() => toggleSubcategory(item.id)}
            className="h-4 w-4 accent-[#00AFEF] disabled:cursor-not-allowed disabled:opacity-50"
          />

          <span className="text-sm">
            {item.subcategory_name}
          </span>
        </label>
      ))}
    </div>

    <ErrorMessage message={selectedPricingFactorsError} />
  </div>
)}
</div>

  </div>
  <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 shadow-sm">

    <SectionHeader
    step={3}
    title="Rate Configuration"
    description="Enter values for the selected rate attributes."
  />
     {selectedSubcategories.map((subcategoryId) => {

  const subcategory = subcategories.find(
    s => s.id === subcategoryId
  )

  return (

    <div key={subcategoryId} className="mb-6">

      <Label className={labelClass}>
        {subcategory?.subcategory_name}
      </Label>

      <Select
        value={selectedParameters[subcategoryId] || ""}
        onValueChange={(value) =>
          setSelectedParameters(prev => ({
            ...prev,
            [subcategoryId]: value
          }))
        }
      >

        <SelectTrigger className={inputClass}>
          <SelectValue placeholder="Select value" />
        </SelectTrigger>

        <SelectContent>

          {(parameterOptions[subcategoryId] || []).map((item:any)=>(
            <SelectItem
              key={item.id}
              value={item.id.toString()}
            >
              {item.parameter_name}
            </SelectItem>
          ))}

        </SelectContent>

      </Select>

    </div>

  )

})}
  </div>
<div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 shadow-sm">

    <SectionHeader
    step={4}
    title="Rate Details"
    description="Enter pricing information."
  />

    <div className="grid grid-cols-2 gap-6">
         
  <div>
   

  </div>
        {/* Parameter */}



    </div>
  


  {/* Rate Name */}
    <div className="mt-6">
      <Label className={labelClass}>
        Rate Name
      </Label>

      <Input
    value={rateName}
    onChange={(e) =>
      setRateName(e.target.value)
    }
    placeholder="Enter rate name"
    className={inputClass}
  />
  </div>

  {/* Base Price */}
  <div className="grid grid-cols-2 gap-6 mt-6">
    <div>
    <Label className={labelClass}>
      Base Price
    </Label>

    <Input
      type="number"
      value={basePrice}
      onChange={(e) => setBasePrice(e.target.value)}
      placeholder="Enter base price"
      className={inputClass}
    />
  </div>

  {/* Currency */}
  <div>
    <Label className={labelClass}>
      Currency
    </Label>

   <Select
     value={rateCurrency}
      onValueChange={(value) => {
        setRateCurrency(value)
         setRateCurrencyError("")
      }}
    >
      <SelectTrigger
      className={`${inputClass} ${
  rateCurrencyError
    ? "border-red-500 ring-1 ring-red-500"
    : ""
    }`}
    >
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
        <SelectItem value="USD">USD - US Dollar</SelectItem>
        <SelectItem value="EUR">EUR - Euro</SelectItem>
        <SelectItem value="GBP">GBP - British Pound</SelectItem>
        <SelectItem value="AED">AED - UAE Dirham</SelectItem>
        <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
        <SelectItem value="THB">THB - Thai Baht</SelectItem>
        <SelectItem value="MYR">MYR - Malaysian Ringgit</SelectItem>
      </SelectContent>
    </Select>
    <ErrorMessage message={rateCurrencyError} />
  </div>

  {/* Tax Percent */}
  <div>
    <Label className={labelClass}>
      Tax %
    </Label>

    <Input
      type="number"
      value={taxPercent}
      onChange={(e) => setTaxPercent(e.target.value)}
      placeholder="Enter tax percentage"
      className={inputClass}
    />
  </div>

  {/* Markup Percent */}
  <div>
    <Label className={labelClass}>
      Markup %
    </Label>

    <Input
      type="number"
      value={markupPercent}
      onChange={(e) => setMarkupPercent(e.target.value)}
      placeholder="Enter markup percentage"
      className={inputClass}
    />
  </div>

  {/* Min Pax */}
  <div>
    <Label className={labelClass}>
      Min Pax
    </Label>

    <Input
      type="number"
      value={minPax}
      onChange={(e) => setMinPax(e.target.value)}
      className={inputClass}
    />
  </div>

  {/* Max Pax */}
  <div>
    <Label className={labelClass}>
      Max Pax
    </Label>

    <Input
      type="number"
      value={maxPax}
      onChange={(e) => setMaxPax(e.target.value)}
      className={inputClass}
    />
  </div>

  {/* Effective From */}
  <div>
  <Label className={labelClass}>
    Effective From
  </Label>

<Popover
  open={effectiveFromCalendarOpen}
  onOpenChange={setEffectiveFromCalendarOpen}
>
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant="outline"
        className={`
          h-10
          w-full
          justify-start
          cursor-pointer
          rounded-md
          bg-white
          px-3
          text-left
          font-normal
          text-slate-900
          hover:bg-white
          hover:text-slate-900
          ${
            effectiveFromError
              ? "border-red-500 ring-1 ring-red-500"
              : "border-slate-300"
          }
        `}
      >
        <CalendarIcon
          className="mr-2 h-4 w-4 shrink-0 text-[#00AFEF]"
        />

        {effectiveFrom ? (
          format(
            new Date(effectiveFrom),
            "dd MMM yyyy"
          )
        ) : (
          <span className="text-slate-400">
            Select effective from
          </span>
        )}
      </Button>
    </PopoverTrigger>

    <PopoverContent
      className="w-auto p-0"
      align="start"
    >
      <Calendar
        mode="single"
        selected={
          effectiveFrom
            ? new Date(effectiveFrom)
            : undefined
        }
      onSelect={(date) => {
        if (!date) return

        const formattedDate =
          format(date, "yyyy-MM-dd")

        setEffectiveFrom(formattedDate)
        setEffectiveFromError("")
        setEffectiveFromCalendarOpen(false)
}}
        disabled={(date) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          if (date < today) {
            return true
          }

          if (validFrom) {
            const fromDate = new Date(validFrom)
            fromDate.setHours(0, 0, 0, 0)

            if (date < fromDate) {
              return true
            }
          }

          if (validTo) {
            const toDate = new Date(validTo)
            toDate.setHours(0, 0, 0, 0)

            if (date > toDate) {
              return true
            }
          }

          return false
        }}
      />
    </PopoverContent>
  </Popover>

  <ErrorMessage message={effectiveFromError} />
</div>

  {/* Effective To */}
 <div>
  <Label className={labelClass}>
    Effective To
  </Label>

 <Popover
  open={effectiveToCalendarOpen}
  onOpenChange={setEffectiveToCalendarOpen}
>
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant="outline"
        
        className={`
          h-10
          w-full
          justify-start
          cursor-pointer
          rounded-md
          bg-white
          px-3
          text-left
          font-normal
          text-slate-900
          hover:bg-white
          hover:text-slate-900
          ${
            effectiveToError
              ? "border-red-500 ring-1 ring-red-500"
              : "border-slate-300"
          }
        `}
      >
        <CalendarIcon
          className="mr-2 h-4 w-4 shrink-0 text-[#00AFEF]"
        />

        {effectiveTo ? (
          format(
            new Date(effectiveTo),
            "dd MMM yyyy"
          )
        ) : (
          <span className="text-slate-400">
            Select effective to
          </span>
        )}
      </Button>
    </PopoverTrigger>

    <PopoverContent
      className="w-auto p-0"
      align="start"
    >
      <Calendar
        mode="single"
        selected={
          effectiveTo
            ? new Date(effectiveTo)
            : undefined
        }
          onSelect={(date) => {
        if (!date) return

        const formattedDate =
          format(date, "yyyy-MM-dd")

        setEffectiveTo(formattedDate)
        setEffectiveToError("")
        setEffectiveToCalendarOpen(false)
      }}
        disabled={(date) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          if (date < today) {
            return true
          }

          if (effectiveFrom) {
            const fromDate = new Date(effectiveFrom)
            fromDate.setHours(0, 0, 0, 0)

            if (date < fromDate) {
              return true
            }
          }

          if (validTo) {
            const validToDate = new Date(validTo)
            validToDate.setHours(0, 0, 0, 0)

            if (date > validToDate) {
              return true
            }
          }

          return false
        }}
      />
    </PopoverContent>
  </Popover>

  <ErrorMessage message={effectiveToError} />
</div>

</div>


<div className="mt-6">
   <Button
    type="button"
     
    className="h-11 px-6 rounded-xl bg-[#00AFEF] hover:bg-[#0099d6]"
    onClick={() => {

     if (!rateName.trim()) {
  toast.error("Rate Name is required", {
    position: "top-right",
    duration: 3000,
  })
  return
}

if (!basePrice || Number(basePrice) <= 0) {
  toast.error("Base Price must be greater than 0", {
    position: "top-right",
    duration: 3000,
  })
  return
}
if (!rateCurrency.trim()) {
  toast.error("Currency is required", {
    position: "top-right",
    duration: 3000,
  })
  return
}
if (taxPercent !== "" && Number(taxPercent) < 0) {
  toast.error("Tax % cannot be negative", {
    position: "top-right",
    duration: 3000,
  })
  return
}
if (markupPercent !== "" && Number(markupPercent) < 0) {
  toast.error("Markup % cannot be negative", {
    position: "top-right",
    duration: 3000,
  })
  return
}
if (minPax !== "" && Number(minPax) < 1) {
  toast.error("Min Pax must be at least 1", {
    position: "top-right",
    duration: 3000,
  })
  return
}

if (
  maxPax !== "" &&
  minPax !== "" &&
  Number(maxPax) < Number(minPax)
) {
  toast.error("Max Pax cannot be less than Min Pax", {
    position: "top-right",
    duration: 3000,
  })
  return
}



      if (!validateEffectiveDates()) {
        return
      }

    if (selectedSubcategories.length === 0) {
    toast.error("Select at least one pricing factor", {
    position: "top-right",
    duration: 3000,
  })
  return
}
      // Ensure every selected pricing factor has a value
const missingParameter = selectedSubcategories.some(
  (id) => !selectedParameters[id]
);

if (missingParameter) {
  toast.error(
    "Please select a value for every pricing factor.",{
      position: "top-right",
     duration: 3000,}
  );
  return;
}

// Generate a unique combination key
const combinationKey = [...selectedSubcategories]
  .sort((a, b) => a - b)
  .map((id) => `${id}:${selectedParameters[id]}`)
  .join("|");
      const duplicate = rates.some(
  (rate) => rate.combinationKey === combinationKey
);

if (duplicate) {
  toast.error(
    "A rate already exists for this pricing factor combination.",{
      position: "top-right",
     duration: 3000,}
  );
  return;
}
                const attributes = selectedSubcategories.map((id) => {

            const subcategory = subcategories.find(
              s => s.id === id
            );

            const parameter = parameterOptions[id]?.find(
              p => p.id.toString() === selectedParameters[id]
            );

            return {
              name: subcategory?.subcategory_name,
              value: parameter?.parameter_name
            };

          });

  const rateCardFields: Record<string, string> = {}

attributes.forEach((attribute) => {
  if (!attribute.name || !attribute.value) return

  const fieldName = getRateCardFieldName(attribute.name)

  if (fieldName) {
    rateCardFields[fieldName] = attribute.value
  }
})

const newRate = {
  combinationKey,

  rate_name: rateName,
  base_price: basePrice,
  tax_percent: taxPercent,
  markup_percent: markupPercent,
  currency: rateCurrency,

  min_pax: minPax,
  max_pax: maxPax,

  effective_from: effectiveFrom,
  effective_to: effectiveTo,

  ...rateCardFields,

  attributes
}
setRates(prev => [
    ...prev,
    newRate
]);

      setRateName("")
      setBasePrice("")
      setTaxPercent("")
      setMarkupPercent("")
      setRateCurrency("")
      setMinPax("")
      setMaxPax("")
      setEffectiveFrom(validFrom)
      setEffectiveTo(validTo)
      
    }}
  >
    Add Rate
  </Button>
    <p className="mt-1 text-xs text-slate-500">
  Add this rate to your list.
</p>
</div>

  </div>
  <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 shadow-sm">
  
    <SectionHeader
      step={5}
      title="Added Rates"
      description="Review all added rates before saving the catalog."
/>

{rates.length > 0 && (
  <div className="mt-4 rounded-lg border border-slate-200 overflow-hidden bg-white">

    

    <div className="overflow-x-auto rounded-lg">
    <table className="min-w-max border-collapse text-sm">
      <thead className="bg-slate-100">
      <tr  className="border-t hover:bg-slate-50 transition-colors">
         <th
              className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " >Rate Name</th>
             

            {selectedSubcategories.map((id)=>{

                const sub = subcategories.find(
                    s=>s.id===id
                )

                return (
                    <th className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " key={id}>
                        {sub?.subcategory_name}
                    </th>
                )

            })}

            <th className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " >Price</th>
            <th className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " >Currency</th>
            <th className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " >Tax %</th>
            <th className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " >Markup %</th>
            <th className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " >Min Pax</th>
            <th className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " >Max Pax</th>
            <th className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " >Effective From</th>
            <th className="border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold " >Effective To</th>
            <th className="border border-slate-200 px-4 py-3 text-center whitespace-nowrap">
    Actions
</th>
        </tr>
      </thead>

      <tbody>
        {rates.map((r, index) => (
          <tr key={index} className="border-t">
            <td className="border border-slate-200 px-4 py-3">{r.rate_name}</td>

         {selectedSubcategories.map((subcategoryId) => {

    const subcategory = subcategories.find(
        s => s.id === subcategoryId
    );

    const attribute = r.attributes?.find(
        (a:any) =>
            a.name === subcategory?.subcategory_name
    );

    return (
        <td className={tdClass} key={subcategoryId}>
            {attribute?.value || "-"}
        </td>
    );

})}

          <td className="border border-slate-200 px-4 py-3">{r.base_price}</td>
          <td className="border border-slate-200 px-4 py-3">{r.currency}</td>
          <td className="border border-slate-200 px-4 py-3">{r.tax_percent}</td>
          <td className="border border-slate-200 px-4 py-3">{r.markup_percent}</td>
          <td className="border border-slate-200 px-4 py-3">{r.min_pax}</td>
          <td className="border border-slate-200 px-4 py-3">{r.max_pax}</td>
          <td className="border border-slate-200 px-4 py-3">{r.effective_from}</td>
          <td className="border border-slate-200 px-4 py-3">{r.effective_to}</td>
          <td className="border border-slate-200 px-4 py-3 text-center">

  <Button
  type="button"
  variant="ghost"
  size="icon"
  onClick={() => {
    setRates(prev => {
      const updatedRates = prev.filter((_, i) => i !== index)

      if (updatedRates.length === 0) {
        setSelectedSubcategories([])
        setSelectedParameters({})
        setParameterOptions({})
      }

      return updatedRates
    })
  }}
  className="text-red-600 hover:bg-red-50 hover:text-red-700"
  title="Delete Rate"
>
  <Trash2 className="h-4 w-4" />
</Button>

      </td>
                </tr>
        ))}
      </tbody>
    </table>
    </div>

  </div>
)}
  </div>

</div>
  
              </div>
            )}
          </AnimatePresence>

          <div className="shrink-0 bg-white px-5 py-4 border-t border-slate-200">
            <div className="flex justify-end gap-3">

 
     <Button
  type="button"
  variant="destructive"
  onClick={handleCancel}
  className="h-10 min-w-[120px]"
>
  Cancel
</Button>
<Button
  type="button"
  onClick={handleSaveAsDraft}
  className="h-10 min-w-[140px] border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
>
  Save as Draft
</Button>

<Button
  type="submit"
  className="h-10 min-w-[180px] bg-[#00AFEF] hover:bg-[#0099d6]"
>
  Create Catalog & Rates
</Button>

</div>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}