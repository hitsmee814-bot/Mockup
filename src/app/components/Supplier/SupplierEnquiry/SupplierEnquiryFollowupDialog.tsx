"use client"



import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { toast } from "sonner"

import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { supplierAddFollowupService } from "@/services/SupplierPortalServices/SupplierAddFollowup"

type SupplierEnquiryFollowupDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  enquiryId: number | null
  enquiryNo?: string
  onSuccess?: () => void
}


export function SupplierEnquiryFollowupDialog({
  open,
  onOpenChange,
  enquiryId,
  enquiryNo,
  onSuccess,
}: SupplierEnquiryFollowupDialogProps) {
  const router = useRouter()

 const [message, setMessage] = useState("")

const [selectedDate, setSelectedDate] =
  useState<Date | undefined>()
const [messageError, setMessageError] = useState("")
const [dateError, setDateError] = useState("")
const [loading, setLoading] = useState(false)

 const resetForm = () => {
  setMessage("")
  setSelectedDate(undefined)
  setMessageError("")
  setDateError("")
}

  const handleClose = () => {
    if (loading) return

    resetForm()
    onOpenChange(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (loading) return

  setMessageError("")
  setDateError("")

  if (!message.trim()) {
    setMessageError("Remarks are required")
    return
  }

  if (!selectedDate) {
    setDateError("Next follow-up date is required")
    return
  }

  if (!enquiryId) {
    toast.error("Supplier enquiry could not be identified.", {
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

    // Use current time automatically
    const now = new Date()

    const year = selectedDate.getFullYear()

    const month = String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")

    const day = String(
      selectedDate.getDate()
    ).padStart(2, "0")

    const hours = String(
      now.getHours()
    ).padStart(2, "0")

    const minutes = String(
      now.getMinutes()
    ).padStart(2, "0")

    const finalFollowupDate =
      `${year}-${month}-${day}T${hours}:${minutes}`


    const payload = {
  note: message.trim(),
  status: "FOLLOWUP",
  stage: "RESPONDED",
  next_followup_date: finalFollowupDate,
}

    await supplierAddFollowupService.addFollowup(
      enquiryId,
      token,
      payload
    )

    toast.success("Follow-up saved successfully.", {
      position: "top-right",
      duration: 3000,
    })

    resetForm()

    onOpenChange(false)

    onSuccess?.()

  } catch (error: any) {
    console.error(
      "Failed to submit supplier enquiry follow-up:",
      error
    )

    toast.error(
      error?.message ||
        "Failed to save follow-up. Please try again.",
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
  <Dialog
    open={open}
    onOpenChange={(value) => !value && handleClose()}
  >
    <DialogContent className="max-w-xl [&>button]:hidden">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-[#00AFEF]">
          Add Follow-up
        </DialogTitle>

        {enquiryNo && (
          <p className="pt-1 text-sm text-slate-500">
            Supplier Enquiry No.:{" "}
            <span className="font-semibold text-slate-800">
              {enquiryNo}
            </span>
          </p>
        )}
      </DialogHeader>

      <div className="space-y-5 py-4">

        {/* Remarks */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Remarks{" "}
            <span className="text-red-500">*</span>
          </label>

          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              setMessageError("")
            }}
            placeholder="Enter follow-up remarks"
            rows={4}
            className="
              w-full
              rounded-md
              border
              border-slate-300
              px-3
              py-2
              text-sm
              outline-none
              focus:border-[#00AFEF]
              focus:ring-1
              focus:ring-[#00AFEF]
            "
          />

          {messageError && (
            <p className="mt-1 text-xs text-red-500">
              {messageError}
            </p>
          )}
        </div>

        {/* Next Follow-up Date */}
{/* Next Follow-up Date */}
<div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Next Follow-up Date{" "}
    <span className="text-red-500">*</span>
  </label>

  <Popover>
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant="outline"
        className="
          h-12
          w-full
          justify-start
          rounded-md
          border-slate-300
          bg-white
          px-3
          text-left
          font-normal
          text-slate-900
          hover:bg-white
          hover:text-slate-900
        "
      >
        <CalendarIcon
          className="
            mr-2
            h-4
            w-4
            shrink-0
            text-[#00AFEF]
          "
        />

        {selectedDate ? (
          format(selectedDate, "dd MMM yyyy")
        ) : (
          <span className="text-slate-400">
            Select follow-up date
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
        selected={selectedDate}
        onSelect={(date) => {
          setSelectedDate(date)
          setDateError("")
        }}
      />
    </PopoverContent>
  </Popover>

  {dateError && (
    <p className="mt-1 text-xs text-red-500">
      {dateError}
    </p>
  )}
</div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="button"
          className="bg-[#00AFEF] text-white hover:bg-[#0099D1]"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Follow Up"}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)
}