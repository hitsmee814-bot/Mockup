"use client"

import { useEffect, useState } from "react"
import { ServiceTypes } from  "@/services/serviceTypesService"
import { useRouter } from 'next/navigation'
import { supplierCreateEnquiryService } from "@/services/SupplierPortalServices/SupplierCreateEnquiry"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus } from "lucide-react"
import { toast } from "sonner"

const labelClass = "text-slate-700 text-[13px] font-medium"

const inputClass =
  "h-12 bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"

const textareaClass =
  "bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] resize-none"

  
export function RaiseEnquiry() {
   const router = useRouter()
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [details, setDetails] = useState("")
  const [loading, setLoading] = useState(false)
  const [serviceTypes, setServiceTypes] = useState<any[]>([])
const [serviceTypeLoading, setServiceTypeLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (loading) return

  if (!subject.trim() || !serviceType || !details.trim()) {
    toast.error("Please fill all required fields", {
     position: "top-right",
     duration: 3000,
})
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
const supplierId = Number(localStorage.getItem("userId"));
    const payload = {
  supplier_id: supplierId,
  customer_id: supplierId,
  cust_type: "SUP",
  subject: subject.trim(),
  service_type: serviceType,
  details: {
    MSG: details.trim(),
  },
}

    console.log("Create enquiry payload:", payload)

    const response = await supplierCreateEnquiryService.createEnquiry(
      token,
      payload
    )

    console.log("Create enquiry response:", response)

   toast.success("Enquiry raised successfully!", {
  position: "top-right",
  duration: 3000,
})

    setSubject("")
    setServiceType("")
    setDetails("")
    setOpen(false)
  } catch (error: any) {
    console.error("Failed to create enquiry:", error)
    toast.error(
  error?.message || "Failed to raise enquiry. Please try again.",
  {
    position: "top-right",
    duration: 3000,
  }
)
  } finally {
    setLoading(false)
  }
}

  const handleCancel = () => {
    setSubject("")
    setServiceType("")
    setDetails("")
    setOpen(false)
  }

  useEffect(() => {
  fetchServiceTypes()
}, [])

const fetchServiceTypes = async () => {
  try {
    setServiceTypeLoading(true)

    const response = await ServiceTypes.getServiceTypes()

    console.log("Service types response:", response)

    let types: any[] = []

    if (Array.isArray(response)) {
      types = response
    } else if (Array.isArray(response?.data)) {
      types = response.data
    } else if (typeof response === "string") {
      types = response
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    }

    setServiceTypes(types)
  } catch (error) {
    console.error("Failed to fetch service types:", error)
    toast.error("Failed to load service types",{
      position: "top-right",
     duration: 3000,})

    
  } finally {
    setServiceTypeLoading(false)
  }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Raise Enquiry
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          w-[99vw] max-w-[1600px]
          h-[72vh] max-h-[72vh]
          p-0 overflow-hidden
          flex flex-col
          bg-white rounded-[4px]
        "
      >
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="h-full min-h-0 flex flex-col"
        >
          <div className="shrink-0 bg-white px-5 pt-5 pb-3 border-b border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold text-center text-[#00AFEF]">
                Raise New Enquiry
              </DialogTitle>
            </DialogHeader>

            <div className="mx-12 mt-4 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
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
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="subject" className={labelClass}>
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter subject"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className={labelClass}>Service Type</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                    <SelectContent>
                      {serviceTypeLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : serviceTypes.length > 0 ? (
                        serviceTypes.map((type: any, index: number) => {
                          const value =
                            typeof type === "string"
                              ? type
                              : type.service_type || type.name || type.value || ""

                          return (
                            <SelectItem key={`${value}-${index}`} value={value}>
                              {value}
                            </SelectItem>
                          )
                        })
                      ) : (
                        <SelectItem value="empty" disabled>
                          No service types found
                        </SelectItem>
                      )}
                    </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="details" className={labelClass}>
                      Message
                    </Label>
                    <Textarea
                      id="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Enter enquiry details..."
                      rows={6}
                      className={textareaClass}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="shrink-0 bg-white px-5 py-4 border-t border-slate-200">
            <div className="flex gap-3 w-full">
              <Button
                type="button"
                variant="destructive"
                onClick={handleCancel}
                className="h-11 flex-1"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 flex-1 bg-[#00AFEF] hover:bg-[#0098d6]"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </div>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}