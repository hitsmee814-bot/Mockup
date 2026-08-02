"use client"

import { useEffect, useState } from "react"
import { SupplierServiceTypes } from "@/services/SupplierPortalServices/SupplierServiceTypes"
import { ServiceSubcategories } from "@/services/SupplierPortalServices/ServiceSubcategories"
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
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

  const fetchCatalogDetails = async () => {
    try {
      const token = localStorage.getItem("access_token")
      if (!token) return

      const response = await SupplierCatalogAndRates.getById(catalogId)
      const catalog = response.catalog

      setServiceType(String(catalog.supplier_service_id))
      setServiceName(catalog.service_name || "")
      setDescription(catalog.description || "")
      setCity(catalog.city || "")
      setCountry(catalog.country || "")
      setCurrency(catalog.currency || "")
      setStatus(catalog.status || "ACTIVE")
      setValidFrom(catalog.valid_from || "")
      setValidTo(catalog.valid_to || "")
      setRates(response.rates || [])
      setServiceTypeCategory((catalog as any).service_type_category || "")

      if (catalog.supplier_service_id) {
        fetchSubcategories(String(catalog.supplier_service_id))
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to load catalog")
    }
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
                    </div>
                  </div>
                  <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 shadow-sm">
                    <h3 className="text-lg font-semibold">Rate Details</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label className={labelClass}>Service Type Category</Label>
                        <Select value={serviceTypeCategory} onValueChange={setServiceTypeCategory}>
                          <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {subcategoryLoading ? (
                              <SelectItem value="loading" disabled>Loading...</SelectItem>
                            ) : (
                              subcategories.map((item: any) => (
                                <SelectItem key={item.id} value={item.subcategory_name}>{item.subcategory_name}</SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className={labelClass}>Rate Name</Label>
                        <Input value={rateName} onChange={(e) => setRateName(e.target.value)} placeholder="Enter rate name" className={inputClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Base Price</Label>
                        <Input type="number" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} placeholder="Enter base price" className={inputClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Currency</Label>
                        <Select value={rateCurrency} onValueChange={setRateCurrency}>
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
                      <div>
                        <Label className={labelClass}>Tax %</Label>
                        <Input type="number" value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)} placeholder="Enter tax percentage" className={inputClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Markup %</Label>
                        <Input type="number" value={markupPercent} onChange={(e) => setMarkupPercent(e.target.value)} placeholder="Enter markup percentage" className={inputClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Min Pax</Label>
                        <Input type="number" value={minPax} onChange={(e) => setMinPax(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Max Pax</Label>
                        <Input type="number" value={maxPax} onChange={(e) => setMaxPax(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Effective From</Label>
                        <Input type="date" title="Must be within Valid From and Valid To" value={effectiveFrom} onChange={(e) => setEffectiveFrom(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Effective To</Label>
                        <Input type="date" title="Must be within Valid From and Valid To" value={effectiveTo} onChange={(e) => setEffectiveTo(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <Button type="button" className="h-11 px-6 rounded-xl bg-[#00AFEF] hover:bg-[#0099d6] shadow-sm" onClick={() => {
                      if (!rateName || !basePrice) {
                        toast.error("Rate Name and Base Price are required")
                        return
                      }
                      if (!validateEffectiveDates()) {
                        return
                      }
                      setRates([
                        ...rates,
                        {
                          rate_name: rateName,
                          base_price: basePrice,
                          min_pax: minPax,
                          max_pax: maxPax,
                        },
                      ])
                      setRateName("")
                      setBasePrice("")
                      setMinPax("")
                      setMaxPax("")
                    }}>
                      Add Rate
                    </Button>
                    {rates.length > 0 && (
                      <div className="mt-4 rounded-lg border border-slate-200 overflow-hidden bg-white">
                        <div className="px-4 py-3 border-b bg-slate-50 font-medium">Added Rates ({rates.length})</div>
                        <table className="w-full text-sm">
                          <thead className="bg-slate-100">
                            <tr className="border-t hover:bg-slate-50 transition-colors">
                              <th className="px-3 py-2 text-left">Rate Name</th>
                              <th className="px-3 py-2 text-left">Price</th>
                              <th className="px-3 py-2 text-left">Min Pax</th>
                              <th className="px-3 py-2 text-left">Max Pax</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rates.map((r, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-3 py-2">{r.rate_name}</td>
                                <td className="px-3 py-2">{r.base_price}</td>
                                <td className="px-3 py-2">{r.min_pax}</td>
                                <td className="px-3 py-2">{r.max_pax}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
      </DialogContent>
    </Dialog>
  )
}
