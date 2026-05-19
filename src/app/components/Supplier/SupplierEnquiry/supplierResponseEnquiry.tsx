"use client"
import { useState } from "react"
import { supplierAddFollowupService } from "@/services/SupplierPortalServices/SupplierAddFollowup"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { SupplierEnquiryDetailsByIdResponse } from "@/services/SupplierPortalServices/SupplierEnquiryDetailsById"
import { toast } from "sonner"
type SupplierResponseEnquiryProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  enquiry: SupplierEnquiryDetailsByIdResponse | null
  apiStatusToUiStatus: Record<string, string>
  }

const labelClass = "text-slate-700 text-[13px] font-medium"

const inputClass =
  "h-12 bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF]"

const textareaClass =
  "bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] resize-none"

export function SupplierResponseEnquiry({
  open,
  onOpenChange,
  enquiry,
  apiStatusToUiStatus,
  
}: SupplierResponseEnquiryProps) {
  if (!enquiry) return null

  const details = (() => {
    try {
      return JSON.parse(enquiry.details || "{}")
    } catch {
      return {}
    }
  })()
    const [message, setMessage] = useState("")
    const router = useRouter()
 // const [nextFollowupDate, setNextFollowupDate] = useState("")
  const [loading, setLoading] = useState(false)

  const formatDate = (date?: string | null) => {
    if (!date) return "-"

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (loading) return

  try {
    setLoading(true)

    const token = localStorage.getItem("access_token")
    

    if (!token) {
      //alert("Token not found")
     if (!token) {
  toast.error("Session expired. Please login again.",{
      position: "top-right",
     duration: 3000,})
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  router.push("/login");

  return;
}
    }

    
    const payload = {
      responded_by_user_id: Number(enquiry.supplier_id),
      note: message,
      status: "FOLLOWUP",
      stage: "RESPONDED",
    }

   // console.log("Follow-up payload:", payload)

    await supplierAddFollowupService.addFollowup(
      enquiry.id,
      token,
      payload
    )

    toast.success("Follow-up submitted successfully!", {
    position: "top-right",
    duration: 3000,
})

    setMessage("")
    onOpenChange(false)
  } catch (error: any) {
    console.error("Failed to submit follow-up")
    console.error("Actual error:", error)
    console.error("Actual error message:", error?.message)

    toast.error(
    error?.message || "Failed to submit follow-up. Please try again.",
    {
      position: "top-right",
      duration: 3000,
    }
)
  } finally {
    setLoading(false)
  }
}

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          {/* HEADER - ALWAYS VISIBLE */}
          <div className="shrink-0 bg-white px-5 pt-5 pb-3 border-b border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold text-center text-[#00AFEF]">
                Respond to Enquiry
              </DialogTitle>
            </DialogHeader>

            <div className="mx-12 mt-4 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          </div>

          {/* BODY - ONLY THIS PART SCROLLS */}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <Label className={labelClass}>Enquiry No</Label>
                      <Input
                        value={enquiry.enquiry_no}
                        readOnly
                        className={inputClass}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className={labelClass}>Created At</Label>
                      <Input
                        value={formatDate(enquiry.created_at)}
                        readOnly
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <Label className={labelClass}>Status</Label>
                      <Input
                        value={
                          apiStatusToUiStatus[enquiry.status] ||
                          enquiry.status
                        }
                        readOnly
                        className={inputClass}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className={labelClass}>
                        Current Next Follow-up
                      </Label>
                      <Input
                        value={formatDate(enquiry.next_followup)}
                        readOnly
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className={labelClass}>Subject</Label>
                    <Input
                      value={enquiry.subject}
                      readOnly
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className={labelClass}>Service Type</Label>
                    <Input
                      value={enquiry.service_type}
                      readOnly
                      className={inputClass}
                    />
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-muted/20 p-3 space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm text-slate-800">
                        Requirement Details
                      </h3>
                     
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(details).map(([key, value]) => (
                        <div
                          key={key}
                          className="rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm"
                        >
                          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                            {key.replaceAll("_", " ")}
                          </p>

                          <p className="mt-0.5 text-xs font-semibold break-all text-slate-900">
                            {String(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className={labelClass}>
                      Follow-up Message / Query
                    </Label>
                 <Textarea
                  placeholder="Type your follow-up or query here..."
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={textareaClass}
                />
                  </div>

                  

                </div>
              </div>
            )}
          </AnimatePresence>

          {/* FOOTER - ALWAYS VISIBLE */}
          <div className="shrink-0 bg-white px-5 py-4 border-t border-slate-200">
            <div className="flex gap-3 w-full">
             <Button
            type="button"
            variant="destructive"
            onClick={() => onOpenChange(false)}
            className="h-11 flex-1"
             >
            Cancel
          </Button>

            <Button
            type="submit"
            disabled={loading}
            className="h-11 flex-1 bg-[#00AFEF] hover:bg-[#0098d6]"
          >
            {loading ? "Submitting..." : "Submit Response"}
          </Button>
            </div>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}