"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Enquiry } from "./types"

import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import {
  SupplierEnquiryList,
  type SupplierEnquiryListItem,
} from "@/services/SupplierPortalServices/SupplierEnquiryList"
import { SupplierEnquiryFollowupDialog } from "./SupplierEnquiryFollowupDialog"
import {
  CustomerEnquiryList,
  type CustomerEnquiryListItem,
} from "@/services/SupplierPortalServices/CustomerEnquiryList"
import { ServiceRequestFollowupDialog } from "./ServiceRequestFollowupDialog"
import { SupplierEnquiryDetailsDialog } from "./SupplierEnquiryDetailsDialog"
import { CustomerEnquiryDetailsDialog } from "./CustomerEnquiryDetailsDialog"
import { SupplierServiceRequestDetailsDialog } from "./SupplierServiceRequestDetails"

import {
  SupplierEnquiryDetailsById,
  type SupplierEnquiryDetailsByIdResponse,
} from "@/services/SupplierPortalServices/SupplierEnquiryDetailsById"

import {
  CustomerEnquiryDetails,
  type CustomerEnquiryDetails as CustomerEnquiryDetailsType,
} from "@/services/SupplierPortalServices/CustomerEnquiryDetails"

const serviceTypeLabel: Record<string, string> = {
  HOTEL: "Hotel",
  TRANSFER: "Transfer",
  CAR_RENTAL: "Car Rental",
  TOUR_PACKAGE: "Tour Package",
  ACTIVITY: "Activity",
  VISA: "Visa",
  INSURANCE: "Insurance",
  CRUISE: "Cruise",
  RAIL: "Rail",
  BUS: "Bus",
}

const statusColor: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",

  "In Progress": "bg-green-100 text-green-700",

  "Follow Up": "bg-amber-100 text-amber-700",

  Quoted: "bg-purple-100 text-purple-700",

  Closed: "bg-purple-100 text-purple-700",

  Converted: "bg-purple-100 text-purple-700",
}




const apiStatusToUiStatus: Record<string, Enquiry["status"]> = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  QUOTED: "Quoted",
  FOLLOWUP: "Follow Up",
  CONVERTED: "Converted",
  CLOSED: "Closed",
}

const uiStatusToApiStatus: Record<Enquiry["status"], string> = {
  New: "NEW",
  "In Progress": "IN_PROGRESS",
  Quoted: "QUOTED",
  "Follow Up": "FOLLOWUP",
  Converted: "CONVERTED",
  Closed: "CLOSED",
}

const customerStatusOrder: string[] = [
  "NEW",
  "IN_PROGRESS",
  "FOLLOWUP",
  "QUOTED",
]

const supplierStatusOrder: string[] = [
  "NEW",
  "IN_PROGRESS",
  "FOLLOWUP",
  "CLOSED",
]

type FilterStatus =  Enquiry["status"]
type EnquiryTab = "CUS" | "SUP"

type EnquiryTableProps = {
  activeTab: "CUS" | "SUP"
  setActiveTab: React.Dispatch<React.SetStateAction<"CUS" | "SUP">>
}

export function EnquiryTable({ activeTab, setActiveTab }: EnquiryTableProps) {
   const router = useRouter()
 const [filter, setFilter] = useState<FilterStatus>("New")
const [filterOptions, setFilterOptions] = useState<FilterStatus[]>([])
  
  const [enquiries, setEnquiries] = useState<any[]>([])
const [loadingEnquiries, setLoadingEnquiries] = useState(false)
const [page, setPage] = useState(1)
const [pageSize] = useState(20)


const [selectedEnquiry, setSelectedEnquiry] =
  useState<SupplierEnquiryDetailsByIdResponse | null>(null)

const [openResponse, setOpenResponse] = useState(false) 
useEffect(() => {
  setFilter("New")
  setPage(1)
}, [activeTab])


const [serviceRequestDialogOpen, setServiceRequestDialogOpen] =
  useState(false)

const [selectedServiceRequestId, setSelectedServiceRequestId] =
  useState<number | null>(null)

  const [followupDialogOpen, setFollowupDialogOpen] =
  useState(false)
  const [supplierFollowupDialogOpen, setSupplierFollowupDialogOpen] =
  useState(false)

const [selectedSupplierEnquiryId, setSelectedSupplierEnquiryId] =
  useState<number | null>(null)
  const [selectedSupplierEnquiry, setSelectedSupplierEnquiry] =
  useState<SupplierEnquiryListItem | null>(null)
  const [selectedServiceRequestNo, setSelectedServiceRequestNo] =
  useState<string | null>(null)
  const [customerEnquiryDetailsOpen, setCustomerEnquiryDetailsOpen] =
  useState(false)

const [selectedCustomerEnquiry, setSelectedCustomerEnquiry] =
  useState<CustomerEnquiryDetailsType | null>(null)

const [customerEnquiryDetailsLoading, setCustomerEnquiryDetailsLoading] =
  useState(false)

const handleSupplierFollowUpClick = (
  enquiry: SupplierEnquiryListItem
) => {
  
  setSelectedSupplierEnquiryId(enquiry.id)
  setSelectedSupplierEnquiry(enquiry)
  setSupplierFollowupDialogOpen(true)
}
  
useEffect(() => {
  const fetchEnquiries = async () => {
    try {
      
      setLoadingEnquiries(true)

      const token = localStorage.getItem("access_token") || ""

      if (!token) {
        console.error("Unable to load enquiries. Token not found.")
         toast.error("Session expired. Please login again.",{
      position: "top-right",
     duration: 3000,})
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  router.push("/login");

  return;
      }

      const apiStatus = uiStatusToApiStatus[filter]
     
    let response: any

      if (activeTab === "CUS") {
        response = await CustomerEnquiryList.getCustomerEnquiries(
          token,
          apiStatus,
          page,
          pageSize
        )
      } else {
        response = await SupplierEnquiryList.getEnquiries(
          token,
          apiStatus,
          page,
          pageSize
        )
      }
        const data = Array.isArray(response)
  ? response
  : response?.data ?? []

setEnquiries(data)
    } catch (err) {
      console.error("Enquiry list API error:", err)
    } finally {
      setLoadingEnquiries(false)
    }
  }

  fetchEnquiries()
}, [filter, page, pageSize, activeTab])

  
   
const resultCount = loadingEnquiries ? "..." : enquiries.length


const customerVisibleFields = [
  "service_request_no",
  "enquiry_no",
  "subject",
  "service_type",
  "destination",
  "travel_date",
  "status",
  "action",
]

const supplierVisibleFields = [
  "enquiry_no",
  "subject",
  "service_type",
  "status",
  "created_at",
  "action",
]



const formatHeader = (key: string) => {
 const headers: Record<string, string> = {
  service_request_no: "SR No",
  enquiry_no: "Customer Enquiry No",
  subject: "Subject",
  service_type: "Service Type",
  destination: "Destination",
  travel_date: "Travel Date",
  status: "Status",
  created_at: "Created On",
  action: "Action",
}

  return headers[key] ?? key
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

type CustomerTableField =
  | keyof CustomerEnquiryListItem
  | "action"

const formatCustomerEnquiryCellValue = (
 field: CustomerTableField,
  value: any,
  enquiry?: CustomerEnquiryListItem
) => {


  if (field === "action") {
    return (
      <Button
        size="sm"
        variant="outline"
        className="h-8"
       onClick={() =>
        handleFollowUpClick(
        enquiry!.id,
        enquiry!.service_request_no
  )
}
      >
        Follow Up
      </Button>
    )
  }


  if (value === null || value === undefined || value === "") {
    return "-"
  }

  if (field === "enquiry_no") {
    return (
      <button
        type="button"
        className="cursor-pointer font-mono text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
        onClick={() => {
        if (value) {
          handleCustomerEnquiryClick(String(value))
        }
      }}
      >
        {String(value)}
      </button>
    )
  }

 if (field === "service_request_no") {
  return (
    <button
      type="button"
      className="cursor-pointer font-mono text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
      onClick={() => {
      if (enquiry) {
        handleServiceRequestClick(enquiry)
      }
    }}
    >
      {String(value)}
    </button>
  )
}

  if (
    field === "travel_date" ||
    field === "assigned_at" ||
    field === "bid_close_at"
  ) {
    return value
      ? new Date(value).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-"
  }

  if (field === "status") {
    const displayStatus =
      apiStatusToUiStatus[String(value)] || String(value)

    return (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
          statusColor[displayStatus] || ""
        }`}
      >
        {displayStatus}
      </span>
    )
  }

  if (field === "service_type") 
  {
  return (
    <Badge variant="outline" className="text-[10px]">
      {serviceTypeLabel[String(value)] ?? String(value)}
    </Badge>
  )
}

  return String(value)
}



const formatSupplierEnquiryCellValue = (
  field: keyof SupplierEnquiryListItem | "action",
  value: any,
  enquiry?: SupplierEnquiryListItem
) => {

  // Action column does not have a value in the API response
  if (field === "action") {
    return (
      <Button
        size="sm"
        variant="outline"
        className="h-8"
        onClick={() => {
          if (enquiry?.id) {
            handleSupplierFollowUpClick(enquiry)
          }
        }}
      >
        Follow Up
      </Button>
    )
  }

  // Handle empty values for normal columns
  if (value === null || value === undefined || value === "") {
    return "-"
  }


if (field === "enquiry_no") {
  return (
    <button
      type="button"
      className="cursor-pointer font-mono text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
    onClick={() => {
        if (enquiry?.id) {
          handleEnquiryClick(enquiry.id)
        }
      }}
    >
      {String(value)}
    </button>
  )
}

  if (
    field === "created_at" ||
    field === "updated_at" ||
    field === "next_followup"
  ) {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  if (field === "details") {
    try {
      const parsed = JSON.parse(value)

      return (
        <div className="space-y-1 text-xs">
          {Object.entries(parsed).map(([key, val]) => (
            <div key={key} className="flex gap-1">
              <span className="font-medium capitalize text-foreground">
                {key.replaceAll("_", " ")}:
              </span>

              <span className="text-muted-foreground break-all">
                {String(val)}
              </span>
            </div>
          ))}
        </div>
      )
    } catch {
      return value
    }
  }

  if (field === "status") {
    const displayStatus =
      apiStatusToUiStatus[String(value)] || String(value)

    return (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
          statusColor[displayStatus] || ""
        }`}
      >
        {displayStatus}
      </span>
    )
  }

  if (field === "service_type") 
    {
  return (
    <Badge variant="outline" className="text-[10px]">
      {serviceTypeLabel[String(value)] ?? String(value)}
    </Badge>
  )
}

  return String(value)
}

const handleFollowUpClick = (
  serviceRequestId: number,
  serviceRequestNo: string
) => {
  setSelectedServiceRequestId(serviceRequestId)
  setSelectedServiceRequestNo(serviceRequestNo)
  setFollowupDialogOpen(true)
}

const handleServiceRequestClick = (
  enquiry: CustomerEnquiryListItem
) => {
  setSelectedServiceRequestId(enquiry.id)
  setServiceRequestDialogOpen(true)
}


const handleCustomerEnquiryClick = async (
  enquiryNo: string
) => {
  try {
    setCustomerEnquiryDetailsLoading(true)

    const token = localStorage.getItem("access_token") || ""

    if (!token) {
      toast.error("Session expired. Please login again.", {
        position: "top-right",
        duration: 3000,
      })
      return
    }

    const response =
      await CustomerEnquiryDetails.getCustomerEnquiryDetails(
        token,
        enquiryNo
      )

    setSelectedCustomerEnquiry(response)
    setCustomerEnquiryDetailsOpen(true)

  } catch (error: any) {
    console.error(
      "Failed to load customer enquiry details:",
      error
    )

    toast.error(
      error?.message ||
        "Failed to load customer enquiry details.",
      {
        position: "top-right",
        duration: 3000,
      }
    )
  } finally {
    setCustomerEnquiryDetailsLoading(false)
  }
}

const handleEnquiryClick = async (enquiryId: number) => {
  try {
    const token = localStorage.getItem("access_token") || ""

    if (!token) {
        return
    }

    const response =
      await SupplierEnquiryDetailsById.getEnquiryDetailsById(
        enquiryId,
        token
      )
     
    setSelectedEnquiry(response)
    setOpenResponse(true)
  } catch (err: any) {
    console.error("Enquiry details API error:", err)

  
  }
}


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <Card className="overflow-hidden">
        
      <CardHeader className="!p-0">
  <div className="flex items-center gap-3 border-b px-6 pt-0 pb-2">

    <button
      type="button"
      onClick={() => {
        setActiveTab("CUS")
        setFilter("New")
        setPage(1)
      }}
      className={`text-base sm:text-lg font-semibold transition-colors ${
        activeTab === "CUS"
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      Customer Enquiries
    </button>

    <span className="text-muted-foreground">|</span>

    <button
      type="button"
      onClick={() => {
        setActiveTab("SUP")
        setFilter("New")
        setPage(1)
      }}
      className={`text-base sm:text-lg font-semibold transition-colors ${
        activeTab === "SUP"
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      Supplier Enquiries
    </button>

  </div>
</CardHeader>
          <CardContent className="px-6 pt-0 pb-6">
                    <div className="overflow-x-auto">
                      <Table>
                            <TableHeader>
                            <TableRow className="bg-muted/50">
                            {(activeTab === "CUS"
                                ? customerVisibleFields
                                : supplierVisibleFields
                            ).map((field) => (
                                <TableHead key={field}>
                                    {formatHeader(field)}
                                </TableHead>
                            ))}
                            </TableRow>
                          </TableHeader>
                            <TableBody>
                          <AnimatePresence mode="popLayout">
                            {loadingEnquiries && (
                          <TableRow>
                            <TableCell colSpan={12} className="text-center py-6 text-sm text-muted-foreground">
                              Loading enquiries...
                            </TableCell>
                          </TableRow>
                        )}

{!loadingEnquiries && enquiries.length === 0 && (
  <TableRow>
    <TableCell colSpan={12} className="text-center py-6 text-sm text-muted-foreground">
      No {activeTab === "CUS" ? "customer" : "supplier"} enquiries found for {filter}.
    </TableCell>
  </TableRow>
)}
             {!loadingEnquiries &&
              enquiries.map((enq, i) => (
                <motion.tr
                  key={enq.id}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: i * 0.03,
                  }}
                  className="border-b hover:bg-muted/30 transition-colors"
                >
                 {(activeTab === "CUS"
                      ? customerVisibleFields
                      : supplierVisibleFields
                  ).map((field) => (
                      <TableCell key={field}>
                {activeTab === "CUS"
              ? field === "action"
                ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8"
                     onClick={() =>
                      handleFollowUpClick(
                        (enq as CustomerEnquiryListItem).id,
                        (enq as CustomerEnquiryListItem).service_request_no
                      )
                    }
                    >
                      Follow Up
                    </Button>
                  )
                : formatCustomerEnquiryCellValue(
                    field as keyof CustomerEnquiryListItem,
                    (enq as CustomerEnquiryListItem)[
                      field as keyof CustomerEnquiryListItem
                    ],
                    enq as CustomerEnquiryListItem
                  )
              : formatSupplierEnquiryCellValue(
                  field as keyof SupplierEnquiryListItem,
                  (enq as SupplierEnquiryListItem)[
                    field as keyof SupplierEnquiryListItem
                  ],
                  enq as SupplierEnquiryListItem
                )}
                      </TableCell>
                  ))}
                </motion.tr>
              ))}
              </AnimatePresence>
            </TableBody>
                      </Table>
                    </div>
                      <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1 || loadingEnquiries}
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                      Previous
                    </Button>

                    <span className="text-sm text-muted-foreground">
                      Page {page}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loadingEnquiries || enquiries.length < pageSize}
                      onClick={() => setPage((prev) => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
                  </CardContent>
      </Card>
      <ServiceRequestFollowupDialog
          open={followupDialogOpen}
          serviceRequestId={selectedServiceRequestId}
          serviceRequestNo={selectedServiceRequestNo}
          onClose={() => {
            setFollowupDialogOpen(false)
            setSelectedServiceRequestId(null)
            setSelectedServiceRequestNo(null)
          }}
        />
      <SupplierEnquiryDetailsDialog
      open={openResponse}
      onOpenChange={setOpenResponse}
      enquiry={selectedEnquiry}
      apiStatusToUiStatus={apiStatusToUiStatus}
    />

    <SupplierServiceRequestDetailsDialog
  open={serviceRequestDialogOpen}
  serviceRequestId={selectedServiceRequestId}
  onClose={() => setServiceRequestDialogOpen(false)}
   />

   <CustomerEnquiryDetailsDialog
    open={customerEnquiryDetailsOpen}
    details={selectedCustomerEnquiry}
    loading={customerEnquiryDetailsLoading}
    onClose={() => {
      setCustomerEnquiryDetailsOpen(false)
      setSelectedCustomerEnquiry(null)
    }}
/>
<SupplierEnquiryFollowupDialog
  open={supplierFollowupDialogOpen}
  onOpenChange={(open) => {
    setSupplierFollowupDialogOpen(open)

    if (!open) {
      setSelectedSupplierEnquiryId(null)
      setSelectedSupplierEnquiry(null)
    }
  }}
  enquiryId={selectedSupplierEnquiryId}
  enquiryNo={selectedSupplierEnquiry?.enquiry_no}
  onSuccess={() => {
    
  }}
/>

    </motion.div>
  )
}