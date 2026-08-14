"use client"
import { useEffect, useState } from "react"
import { supplierAddFollowupService } from "@/services/SupplierPortalServices/SupplierAddFollowup"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ErrorMessage } from "../../signup/supplier/SupplierUtils"
import {
  SupplierEnquiryFollowups,
  type SupplierEnquiryFollowupItem,
} from "@/services/SupplierPortalServices/SupplierEnquiryFollowups"
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
  

 
    const [message, setMessage] = useState("")
    const [messageError, setMessageError] = useState("")
     const [nextFollowupDate, setNextFollowupDate] = useState("")
      const [loading, setLoading] = useState(false)
      const [followups, setFollowups] = useState<SupplierEnquiryFollowupItem[]>([])
    const [loadingFollowups, setLoadingFollowups] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const router = useRouter()
    
  const formatDate = (date?: string | null) => {
   if (!date) return ""

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  useEffect(() => {
  const fetchFollowups = async () => {
    if (!open || !enquiry?.id) return

   

    try {
      setLoadingFollowups(true)

      const token = localStorage.getItem("access_token")

      if (!token) {
        return
      }

      const response = await SupplierEnquiryFollowups.getFollowups(
        enquiry.id,
        token
      )

      setFollowups(Array.isArray(response) ? response : [])
    } catch (error) {
      console.error("Failed to load follow-up history:", error)
      setFollowups([])
    } finally {
      setLoadingFollowups(false)
    }
  }

  fetchFollowups()
}, [open, enquiry?.id])

if (!enquiry) return null
     const details = (() => {
    try {
      return JSON.parse(enquiry.details || "{}")
    } catch {
      return {}
    }
  })()
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (loading) return
  setMessageError("")

if (!message.trim()) {
  setMessageError("Followup message is required")
  return
}

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
    

   const updatedFollowups =
  await SupplierEnquiryFollowups.getFollowups(
    enquiry.id,
    token
  )

setFollowups(Array.isArray(updatedFollowups) ? updatedFollowups : [])

setMessage("")
setShowSuccessAlert(true)
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

          {showSuccessAlert && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-center text-green-600">
                Success
              </h3>

              <p className="mt-3 text-sm text-center text-slate-600">
                Follow-up submitted successfully!
              </p>

              <Button
                type="button"
                className="mt-5 w-full bg-[#00AFEF] hover:bg-[#0098d6]"
                onClick={() => {
                  setShowSuccessAlert(false)
                }}
              >
                OK
              </Button>
            </div>
          </div>
        )}
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
                  <Label className={labelClass}>Service Type</Label>
                  <Input
                    value={enquiry.service_type}
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

                  <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-3">
                <h3 className="font-semibold text-sm text-slate-800">
                  Follow-up History
                </h3>

                {loadingFollowups && (
                  <p className="text-xs text-muted-foreground">
                    Loading follow-up history...
                  </p>
                )}

                {!loadingFollowups && followups.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    No follow-up history found.
                  </p>
                )}

                {!loadingFollowups &&
                  followups.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-md border border-slate-200 bg-muted/20 px-3 py-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-slate-800">
                          {item.stage}
                        </p>

                        <p className="text-[11px] text-muted-foreground">
                          {formatDate(item.followup_at)}
                        </p>
                      </div>

                      <p className="mt-1 text-xs text-slate-700 whitespace-pre-wrap">
                        {item.note}
                      </p>

                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Status: {item.status}
                      </p>
                    </div>
                  ))}
              </div>

                  <div className="flex flex-col gap-1">
                    <Label className={labelClass}>
                      Follow-up Message / Query
                    </Label>
                 <Textarea
                  placeholder="Type your follow-up or query here..."
                  rows={3}
                  value={message}
                  onChange={(e) => {
                  setMessage(e.target.value)
                  setMessageError("")
                }}
                  className={textareaClass}
                />
                <ErrorMessage message={messageError} />
                <div className="flex flex-col gap-1 mt-3">
                <Label className={labelClass}>
                  Next Follow-up Date
                </Label>

                  <Input
                  type="date"
                  value={nextFollowupDate}
                  onChange={(e) => setNextFollowupDate(e.target.value)}
                  className={inputClass}
                />
              </div>
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