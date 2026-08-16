"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import type { CustomerEnquiryDetails } from "@/services/SupplierPortalServices/CustomerEnquiryDetails"

type CustomerEnquiryDetailsDialogProps = {
  open: boolean
  details: CustomerEnquiryDetails | null
  loading: boolean
  onClose: () => void
}

export function CustomerEnquiryDetailsDialog({
  open,
  details,
  loading,
  onClose,
}: CustomerEnquiryDetailsDialogProps) {

  const formatDate = (
    value: string | null | undefined
  ) => {
    if (!value) return "-"

    return new Date(value).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col [&>button]:hidden">

        <DialogHeader>
          <DialogTitle>
            Customer Enquiry Details
          </DialogTitle>

          {details && (
            <div className="flex items-center gap-3 pt-1">
              <span className="text-sm font-semibold text-slate-800">
                {details.enquiry_no}
              </span>

              <Badge
                variant="outline"
                className="border-green-200 bg-green-50 text-green-700"
              >
                {details.status}
              </Badge>
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto px-2 py-5">

          {loading && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Loading customer enquiry details...
            </div>
          )}

          {!loading && details && (
            <div className="space-y-6">

              {/* Request Information */}
              <section>
                <h3 className="mb-4 text-sm font-semibold text-[#00AFEF]">
                  Enquiry Information
                </h3>

                <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Enquiry No
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.enquiry_no}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Subject
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.subject || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Source
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.source || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Destination
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.destination || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Travel Date
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {formatDate(details.travel_date)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Travellers
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.pax ?? "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Created Date
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {formatDate(details.created_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-slate-500">
                      Status
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {details.status}
                    </p>
                  </div>

                </div>
              </section>

              {/* Customer Requirement */}
              <section className="border-t border-slate-200 pt-5">
                <h3 className="mb-4 text-sm font-semibold text-[#00AFEF]">
                  Customer Requirement
                </h3>

                <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {details.description || "-"}
                  </p>
                </div>
              </section>

            </div>
          )}

          {!loading && !details && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No customer enquiry details available.
            </div>
          )}

        </div>

        <div className="shrink-0 border-t border-slate-200 bg-white px-2 py-3">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}