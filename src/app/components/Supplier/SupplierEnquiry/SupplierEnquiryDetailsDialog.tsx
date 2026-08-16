"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

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

type SupplierEnquiryDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  enquiry: SupplierEnquiryDetailsByIdResponse | null
  apiStatusToUiStatus: Record<string, string>
}

export function SupplierEnquiryDetailsDialog({
  open,
  onOpenChange,
  enquiry,
  apiStatusToUiStatus,
}: SupplierEnquiryDetailsDialogProps) {
  const [followups, setFollowups] = useState<
    SupplierEnquiryFollowupItem[]
  >([])

  const [loadingFollowups, setLoadingFollowups] =
    useState(false)

  const formatDate = (date?: string | null) => {
    if (!date) return "-"

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatDateTime = (date?: string | null) => {
    if (!date) return "-"

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    const fetchFollowups = async () => {
      if (!open || !enquiry?.id) return

      try {
        setLoadingFollowups(true)

        const token = localStorage.getItem("access_token")

        if (!token) {
          setFollowups([])
          return
        }

        const response =
          await SupplierEnquiryFollowups.getFollowups(
            enquiry.id,
            token
          )

        setFollowups(
          Array.isArray(response) ? response : []
        )
      } catch (error) {
        console.error(
          "Failed to load follow-up history:",
          error
        )

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

  const uiStatus =
    apiStatusToUiStatus[enquiry.status] ||
    enquiry.status

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          w-[99vw]
          max-w-[1000px]
          h-[82vh]
          max-h-[82vh]
          p-0
          overflow-hidden
          flex flex-col
          bg-white
          rounded-[4px]
          [&>button]:hidden
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full min-h-0 flex flex-col"
        >

          {/* HEADER */}
          <div className="shrink-0 bg-white px-6 pt-5 pb-5 border-b border-slate-200">
            <DialogHeader>
             <DialogTitle className="text-lg font-semibold text-[#00AFEF]">
                Supplier Enquiry Details
              </DialogTitle>
            </DialogHeader>

            <div className="mt-5 flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-800">
                {enquiry.enquiry_no}
              </span>

              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-blue-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-blue-700
                "
              >
                {uiStatus}
              </span>
            </div>
          </div>

          {/* BODY */}
          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
              px-6
              py-6
              scrollbar-thin
              scrollbar-thumb-[#00AFEF]
              scrollbar-track-transparent
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-[#00AFEF]
              [&::-webkit-scrollbar-thumb]:rounded-full
            "
          >

            {/* REQUEST INFORMATION */}
            <section>
             <h3 className="mb-4 text-sm font-semibold text-[#00AFEF]">
              Supplier Enquiry Details
            </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-7">

                {/* Supplier Enquiry No */}
                <div>
                  <p className="text-[12px] text-slate-500">
                    Supplier Enquiry No.
                  </p>

                  <p className="text-[12px] font-medium text-slate-500">
                    {enquiry.enquiry_no || "-"}
                  </p>
                </div>

                {/* Subject */}
                <div>
                  <p className="text-[12px] text-slate-500">
                    Subject
                  </p>

                  <p className="text-[12px] font-medium text-slate-500">
                    {enquiry.subject || "-"}
                  </p>
                </div>

                {/* Service Type */}
                <div>
                  <p className="text-[12px] text-slate-500">
                    Service Type
                  </p>

                  <p className="text-[12px] font-medium text-slate-500">
                    {enquiry.service_type || "-"}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-[12px] text-slate-500">
                    Status
                  </p>

                  <p className="mt-2 text-[14px] text-slate-900">
                    {uiStatus || "-"}
                  </p>
                </div>

                {/* Created Date */}
                <div>
                  <p className="text-[12px] text-slate-500">
                    Created Date
                  </p>

                  <p className="mt-2 text-[14px] text-slate-900">
                    {formatDate(enquiry.created_at)}
                  </p>
                </div>

                {/* Next Follow-up */}
                <div>
                  <p className="text-[12px] text-slate-500">
                    Next Follow-up
                  </p>

                  <p className="text-[12px] font-medium text-slate-500">
                    {formatDateTime(
                      enquiry.next_followup
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* REQUIREMENT DETAILS */}
            <section className="mt-6">
  <h3 className="mb-4 text-[14px] leading-5 font-semibold text-[#00AFEF]">
    Message Details
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5">
    {Object.entries(details).map(([key, value]) => (
  <div
    key={key}
    className={
      key.toLowerCase() === "msg"
        ? "col-span-full"
        : ""
    }
  >
    {key.toLowerCase() !== "msg" && (
      <p className="text-[12px] leading-4 font-medium text-slate-500 capitalize">
        {key.replaceAll("_", " ")}
      </p>
    )}

    <p className="mt-1 text-[14px] leading-5 font-medium text-slate-900 whitespace-pre-wrap">
      {String(value)}
    </p>
  </div>
))}
  </div>
</section>

            {/* FOLLOW-UP HISTORY */}
            <section className="mt-10">

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-[#00AFEF]">
                Follow-up History
              </h3>

                <span className="text-xs text-slate-500">
                {followups.length}{" "}
                {followups.length === 1 ? "follow-up" : "follow-ups"}
              </span>
              </div>

              {loadingFollowups && (
                <p className="text-sm text-slate-500">
                  Loading follow-up history...
                </p>
              )}

              {!loadingFollowups &&
                followups.length === 0 && (
                  <div className="rounded-md border border-dashed border-slate-300 py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No follow-ups yet.
                  </p>
                </div>
                )}{!loadingFollowups &&
  followups.map((item) => (
    <div
      key={item.id}
      className="
        rounded-md
        border border-slate-200
        bg-slate-50
        p-4
        mb-4
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Follow-up Date */}
        <div>
          <p
            className="text-[12px] leading-4 font-medium text-slate-500"
          >
            Follow-up Date
          </p>

          <p
            className="mt-1 text-[14px] leading-5 font-semibold text-slate-800"
          >
            {formatDateTime(item.followup_at)}
          </p>
        </div>

        {/* Next Follow-up */}
        <div>
          <p
            className="text-[12px] leading-4 font-medium text-slate-500"
          >
            Next Follow-up
          </p>

          <p
            className="mt-1 text-[14px] leading-5 font-semibold text-slate-800"
          >
            {formatDateTime(enquiry.next_followup)}
          </p>
        </div>

      </div>

      {/* Divider */}
      <div className="mt-4 border-t border-slate-200" />

      {/* Remarks */}
      <div className="mt-3">
        <p
          className="text-[12px] leading-4 font-medium text-slate-500"
        >
          Remarks
        </p>

        <p
          className="
            mt-1
            text-[14px]
            leading-5
            font-normal
            text-slate-700
            whitespace-pre-wrap
          "
        >
          {item.note || "-"}
        </p>
      </div>
    </div>
  ))}
            </section>
          </div>

          {/* FOOTER */}
          <div className="shrink-0 bg-white px-6 py-4 border-t border-slate-200">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  onOpenChange(false)
                }
                className="h-11 min-w-[120px]"
              >
                Close
              </Button>
            </div>
          </div>

        </motion.div>
      </DialogContent>
    </Dialog>
  )
}