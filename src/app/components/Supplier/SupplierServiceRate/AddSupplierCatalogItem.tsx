"use client"

import { useEffect, useState } from "react"
import { SupplierServiceTypes } from "@/services/SupplierPortalServices/SupplierServiceTypes"
import { ServiceSubcategories } from "@/services/SupplierPortalServices/ServiceSubcategories"
import { useRouter } from 'next/navigation'
import { supplierCreateEnquiryService } from "@/services/SupplierPortalServices/SupplierCreateEnquiry"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  "h-10 w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
  const inputClassSelect =
  "h-11 w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"
    const thClass =
  "border border-slate-200 bg-slate-100 px-4 py-3 text-left whitespace-nowrap font-semibold";

  const tdClass =
  "border border-slate-200 px-4 py-3 whitespace-nowrap";

  export function AddSupplierCatalogItem() {
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
  setSelectedSubcategories((prev) => {
    const updated = prev.includes(id)
      ? prev.filter(x => x !== id)
      : [...prev, id]

    return updated
  })
}


const validateEffectiveDates = () => {
  if (
    effectiveFrom &&
    validFrom &&
    effectiveFrom < validFrom
  ) {
    toast.error(
      "Effective From cannot be earlier than Valid From"
    )
    return false
  }

  if (
    effectiveTo &&
    validTo &&
    effectiveTo > validTo
  ) {
    toast.error(
      "Effective To cannot be later than Valid To"
    )
    return false
  }

  if (
    effectiveFrom &&
    effectiveTo &&
    effectiveFrom > effectiveTo
  ) {
    toast.error(
      "Effective From cannot be after Effective To"
    )
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
     toast.error("Session expired. Please login again.",{
      position: "top-right",
     duration: 3000,})
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  router.push("/login");

  return;
    }
const supplierId = Number(localStorage.getItem("userId"));
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

  //   const response =
  // await SupplierCreateCatalogRateService.createCatalogAndRate(

  //   {
  //     supplier_service_id: Number(serviceType),
  //     service_name: serviceName,
  //     description,
  //     city,
  //     country,
  //     currency,
  //     valid_from: validFrom,
  //     valid_to: validTo,
  //     status,
  //   },

  //   {
      
  //     rate_name: rateName,
  //     base_price: Number(basePrice),
  //     tax_percent: Number(taxPercent || 0),
  //     markup_percent: Number(markupPercent || 0),
  //     currency: rateCurrency,
  //     min_pax: minPax ? Number(minPax) : 1,
  //     max_pax: maxPax ? Number(maxPax) : undefined,
  //     effective_from: effectiveFrom,
  //     effective_to: effectiveTo || undefined,
  //     status,
  //   }

  // )

// console.log(response)

toast.success(
  "Catalog and Rate created successfully",
  {
    position: "top-right",
    duration: 3000,
  }
)

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
        "Session expired. Please login again."
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
  className={`${inputClassSelect}`}>
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
      className={inputClass}
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

      // Limit to approximately 100 words
      const words = text.trim().split(/\s+/)

      if (text.trim() === "" || words.length <= 100) {
        setDescription(text)
      }
    }}
    placeholder="Enter service description (Maximum 100 words)"
    className="w-full min-h-[140px] bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] resize-none"
  />

  <div className="mt-1 text-xs text-slate-500">
    {description.trim()
      ? description.trim().split(/\s+/).length
      : 0}
    /100 words
  </div>
</div>
     <div className="grid grid-cols-2 gap-6 w-full">


      <div>
    <Label className={labelClass}>
      Country *
    </Label>

    <Select
      value={country}
      onValueChange={(value) => {
      setCountry(value);
      setCity("");
}}
    >
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
  <div>
    <Label className={labelClass}>
      City *
    </Label>

  <Input
  value={city}
  readOnly={!country}
  placeholder={country ? "Enter city" : "Select Country First"}
  className={`${inputClass} ${!country ? "bg-gray-100 cursor-not-allowed" : ""}`}
  onClick={() => {
    if (!country) {
      toast.info("Please select a country first.");
    }
  }}
  onChange={(e) => {
    if (country) {
      setCity(e.target.value);
    }
  }}
/>
  </div>

  

</div>
    
     <div className="grid grid-cols-2 gap-6 w-full">
     <div>
  <Label className={labelClass}>Valid From</Label>

  <Input
    type="date"
    title="Allowed format: YYYY-MM-DD"
    value={validFrom}
    onChange={(e) => setValidFrom(e.target.value)}
    className={inputClass}
  />
</div>

<div>
  <Label className={labelClass}>Valid To</Label>

  <Input
    type="date"
    title="Allowed format: YYYY-MM-DD"
    value={validTo}
    onChange={(e) => setValidTo(e.target.value)}
    className={inputClass}
  />
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
      onValueChange={setRateCurrency}
    >
      <SelectTrigger className={inputClass}>
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

    <Input
      type="date"
      title="Must be within Valid From and Valid To"
      value={effectiveFrom}
      onChange={(e) => setEffectiveFrom(e.target.value)}
      className={inputClass}
    />
  </div>

  {/* Effective To */}
  <div>
    <Label className={labelClass}>
      Effective To
    </Label>

    <Input
      type="date"
      title="Must be within Valid From and Valid To"
      value={effectiveTo}
      onChange={(e) => setEffectiveTo(e.target.value)}
      className={inputClass}
    />
  </div>

</div>


<div className="flex gap-3 mt-6">

  

  <Button
    type="button"
    className="h-11 px-6 rounded-xl bg-[#00AFEF] hover:bg-[#0099d6]"
    onClick={() => {

      if (!rateName || !basePrice) {
        toast.error(
          "Rate Name and Base Price are required"
        )
        return
      }

      if (!validateEffectiveDates()) {
        return
      }
      // Ensure every selected pricing factor has a value
const missingParameter = selectedSubcategories.some(
  (id) => !selectedParameters[id]
);

if (missingParameter) {
  toast.error(
    "Please select a value for every pricing factor."
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
    "A rate already exists for this pricing factor combination."
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
    attributes
};

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

          <button
              type="button"
              onClick={() => {
                  setRates(prev =>
                      prev.filter((_, i) => i !== index)
                  )
              }}
              className="text-red-600 hover:text-red-700"
              title="Delete Rate"
          >
              <Trash2 size={18} />
          </button>

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