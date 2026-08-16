"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import {
  ServiceRequestFollowup
} from "@/services/SupplierPortalServices/ServiceRequestFollowup"
import { toast } from "sonner"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type ServiceRequestFollowupDialogProps = {
  open: boolean
  serviceRequestId: number | null
  serviceRequestNo: string | null
  onClose: () => void
}

export function ServiceRequestFollowupDialog({
  open,
  serviceRequestId,
  serviceRequestNo,
  onClose,
}: ServiceRequestFollowupDialogProps) {
 const [remarks, setRemarks] = useState("")
const [nextFollowupDate, setNextFollowupDate] = useState("")
const [selectedDate, setSelectedDate] =
  useState<Date | undefined>()
const [remarksError, setRemarksError] = useState("")
const [dateError, setDateError] = useState("")
const [saving, setSaving] = useState(false)

useEffect(() => {
  if (open) {
    setRemarks("")
    setNextFollowupDate("")
    setSelectedDate(undefined)
    setRemarksError("")
    setDateError("")
  }
}, [open, serviceRequestId])

const handleSaveFollowup = async () => {
  if (!serviceRequestId) {
    toast.error("Service request not found.", {
      position: "top-right",
      duration: 3000,
    })
    return
  }
if (!remarks.trim()) {
  setRemarksError("Please enter follow-up remarks")
  return
}
  
if (!selectedDate) {
  setDateError("Please select the next follow-up date")
  return
}


  try {
    setSaving(true)

    const token = localStorage.getItem("access_token")

    if (!token) {
      toast.error("Session expired. Please login again.", {
        position: "top-right",
        duration: 3000,
      })
      return
    }

    const now = new Date()

const year = selectedDate.getFullYear()
const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
const day = String(selectedDate.getDate()).padStart(2, "0")

const hours = String(now.getHours()).padStart(2, "0")
const minutes = String(now.getMinutes()).padStart(2, "0")

const finalFollowupDate =
  `${year}-${month}-${day}T${hours}:${minutes}`
await ServiceRequestFollowup.addFollowup(
  token,
  serviceRequestId,
  {
    remarks: remarks.trim(),
    next_followup_date: finalFollowupDate,
  }
)
    toast.success("Follow-up saved successfully.", {
      position: "top-right",
      duration: 3000,
    })

    setRemarks("")
    setNextFollowupDate("")
    setSelectedDate(undefined)
    onClose()
  } catch (error: any) {
    console.error(
      "Failed to save follow-up:",
      error
    )

    toast.error(
      error?.message ||
        "Failed to save follow-up.",
      {
        position: "top-right",
        duration: 3000,
      }
    )
  } finally {
    setSaving(false)
  }
}


  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent
  className="
    max-w-xl
    [&>button]:hidden
  "
>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900">
            Follow Up
          </DialogTitle>

        {serviceRequestNo && (
            <p className="pt-1 text-sm text-slate-500">
                Service Request No.:{" "}
                <span className="font-semibold text-slate-800">
                {serviceRequestNo}
                </span>
            </p>
            )}
        </DialogHeader>

        <div className="space-y-5 py-4">

          {/* Remarks */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
            Remarks <span className="text-red-500">*</span>
            </label>

            <textarea
              value={remarks}
              onChange={(e) => {
              setRemarks(e.target.value)
              setRemarksError("")
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

            {remarksError && (
            <p className="mt-1 text-xs text-red-500">
              {remarksError}
            </p>
          )}
          </div>

          {/* Next Follow-up Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
            Next Follow-up Date <span className="text-red-500">*</span>
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
    className="mr-2 h-4 w-4 shrink-0 text-[#00AFEF]"
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
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="button"
            className="bg-[#00AFEF] text-white hover:bg-[#0099D1]"
            onClick={handleSaveFollowup}
            disabled={saving}
            >
            {saving ? "Saving..." : "Save Follow Up"}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}