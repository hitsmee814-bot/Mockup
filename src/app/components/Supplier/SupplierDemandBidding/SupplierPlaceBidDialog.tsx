"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createSupplierBidService } from "@/services/SupplierPortalServices/CreateSupplierBid";

import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type SupplierPlaceBidDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  demandId: number | null
  serviceRequestNo?: string
  destination?: string
}
export function SupplierPlaceBidDialog({
  open,
  onOpenChange,
  demandId,
  serviceRequestNo,
  destination,
}: SupplierPlaceBidDialogProps) {

  const [quotedAmount, setQuotedAmount] = useState("")
  const [currency, setCurrency] = useState("")
  const [deliveryDays, setDeliveryDays] = useState("")
  const [notes, setNotes] = useState("")

  const [amountError, setAmountError] = useState("")
  const [currencyError, setCurrencyError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const resetForm = () => {
    setQuotedAmount("")
    setCurrency("")
    setDeliveryDays("")
    setNotes("")
    setAmountError("")
    setCurrencyError("")
  }

  const handleClose = () => {
   
    onOpenChange(false)
  }

  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  setAmountError("")
  setCurrencyError("")

  let hasError = false

  if (!quotedAmount) {
    setAmountError("Bid amount is required")
    hasError = true
  } else if (Number(quotedAmount) <= 0) {
    setAmountError("Bid amount must be greater than 0")
    hasError = true
  }

  if (!currency.trim()) {
    setCurrencyError("Currency is required")
    hasError = true
  }

  if (hasError) {
    return
  }

  if (!demandId) {
    toast.error("Unable to place bid: demand information is missing")
    return
  }

  try {
    setSubmitting(true)

    const token = localStorage.getItem("access_token") || ""

    if (!token) {
      toast.error("Your session has expired. Please log in again.")
      return
    }

    const payload = {
      demand_id: demandId,
      quoted_amount: Number(quotedAmount),
      currency: currency.trim().toUpperCase(),
      notes: notes.trim() || undefined,
      delivery_days: deliveryDays
        ? Number(deliveryDays)
        : undefined,
    }

    await createSupplierBidService.createBid(
      token,
      payload
    )

     toast.success("Bid submitted successfully.", {
      position: "top-right",
      duration: 3000,
    })
    
    resetForm()
    onOpenChange(false)

  } catch (error) {
    console.error("Create bid error:", error)

    
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to submit bid",
        {
        position: "top-right",
        duration: 3000,
      }
    )
  } finally {
    setSubmitting(false)
  }
}

return (
  <Dialog
    open={open}
    onOpenChange={(value) => {
      if (!value) {
        handleClose()
      }
    }}
  >
   <DialogContent
        className="
            w-[95vw]
            max-w-3xl
            rounded-2xl
            p-8
            max-h-[90vh]
            overflow-y-auto
            [&>button]:hidden
        "
        >
      <DialogHeader className="pb-1">
        <DialogTitle className="text-lg font-semibold text-[#00AFEF]">
          Place Bid
        </DialogTitle>

        <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1 text-sm text-slate-500">
          {serviceRequestNo && (
            <p>
              Service Request No.:{" "}
              <span className="font-semibold text-slate-800">
                {serviceRequestNo}
              </span>
            </p>
          )}

          {destination && (
            <p>
              Destination:{" "}
              <span className="font-semibold text-slate-800">
                {destination}
              </span>
            </p>
          )}
        </div>
      </DialogHeader>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 pt-2"
      >
        {/* Bid Amount + Currency */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Bid Amount */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Bid Amount{" "}
              <span className="text-red-500">*</span>
            </label>

            <Input
              value={quotedAmount}
              onChange={(e) => {
                setQuotedAmount(e.target.value)
                setAmountError("")
              }}
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter bid amount"
              className="
                h-11
                rounded-md
                border-slate-300
                text-sm
                focus:border-[#00AFEF]
                focus:ring-1
                focus:ring-[#00AFEF]
              "
            />

            {amountError && (
              <p className="mt-1 text-xs text-red-500">
                {amountError}
              </p>
            )}
          </div>

          {/* Currency */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Currency{" "}
              <span className="text-red-500">*</span>
            </label>

            <Select
              value={currency}
              onValueChange={(value) => {
                setCurrency(value)
                setCurrencyError("")
              }}
            >
              <SelectTrigger
                className="
                  h-11
                  rounded-md
                  border-slate-300
                  text-sm
                  focus:border-[#00AFEF]
                  focus:ring-1
                  focus:ring-[#00AFEF]
                "
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="INR">
                  INR — Indian Rupee
                </SelectItem>

                <SelectItem value="USD">
                  USD — US Dollar
                </SelectItem>

                <SelectItem value="EUR">
                  EUR — Euro
                </SelectItem>

                <SelectItem value="GBP">
                  GBP — British Pound
                </SelectItem>

                <SelectItem value="AED">
                  AED — UAE Dirham
                </SelectItem>

                <SelectItem value="SGD">
                  SGD — Singapore Dollar
                </SelectItem>

                <SelectItem value="THB">
                  THB — Thai Baht
                </SelectItem>

                <SelectItem value="AUD">
                  AUD — Australian Dollar
                </SelectItem>

                <SelectItem value="CAD">
                  CAD — Canadian Dollar
                </SelectItem>
              </SelectContent>
            </Select>

            {currencyError && (
              <p className="mt-1 text-xs text-red-500">
                {currencyError}
              </p>
            )}
          </div>
        </div>

        {/* Delivery Days */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Delivery Days
          </label>

          <Input
            value={deliveryDays}
            onChange={(e) => setDeliveryDays(e.target.value)}
            type="number"
            min="0"
            placeholder="Enter delivery days"
            className="
              h-11
              rounded-md
              border-slate-300
              text-sm
              focus:border-[#00AFEF]
              focus:ring-1
              focus:ring-[#00AFEF]
            "
          />
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any additional notes"
            rows={3}
            className="
              w-full
              rounded-md
              border
              border-slate-300
              px-3
              py-2
              text-sm
              outline-none
              resize-none
              focus:border-[#00AFEF]
              focus:ring-1
              focus:ring-[#00AFEF]
            "
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 pt-3">

          <Button
 
        type="button"
        variant="outline"
        onClick={handleClose}
        disabled={submitting}
        className="
            border-red-300
            text-red-600
            hover:bg-red-50
            hover:text-red-700
        "
        >
        Cancel
        </Button>
         <Button
        type="submit"
        disabled={submitting}
        className="
            bg-[#00AFEF]
            text-white
            hover:bg-[#0099D1]
            disabled:cursor-not-allowed
            disabled:opacity-60
        "
        >
        {submitting ? "Submitting..." : "Submit Bid"}
        </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
)
}