"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Enquiry } from "./types"
import { MessageSquare, Filter } from "lucide-react"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import {
  SupplierEnquiryList,
  type SupplierEnquiryListItem,
} from "@/services/SupplierPortalServices/SupplierEnquiryList"

import {
  SupplierEnquiryCount,
  type SupplierEnquiryCountItem,
} from "@/services/SupplierPortalServices/SupplierEnquiryCount"
import { SupplierResponseEnquiry } from "./supplierResponseEnquiry"
import {
  SupplierEnquiryDetailsById,
  type SupplierEnquiryDetailsByIdResponse,
} from "@/services/SupplierPortalServices/SupplierEnquiryDetailsById"
import { RaiseEnquiry } from "./SupplierRaiseEnquiry"

const statusColor: Record<string, string> = {
  New: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "In Progress": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Quoted: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  "Follow Up": "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  Converted: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Closed: "bg-red-500/15 text-red-600 dark:text-red-400",
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

const statusOrder: string[] = [
  "NEW",
  "IN_PROGRESS",
  "FOLLOWUP",
  "QUOTED",
  "CONVERTED",
  "CLOSED",
]

type FilterStatus =  Enquiry["status"]

export function EnquiryTable() {
   const router = useRouter()
 const [filter, setFilter] = useState<FilterStatus>("New")
const [filterOptions, setFilterOptions] = useState<FilterStatus[]>([])
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({})
  const [loadingCounts, setLoadingCounts] = useState(true)
  const [enquiries, setEnquiries] = useState<SupplierEnquiryListItem[]>([])
const [loadingEnquiries, setLoadingEnquiries] = useState(false)
const [page, setPage] = useState(1)
const [pageSize] = useState(20)

const [selectedEnquiry, setSelectedEnquiry] =
  useState<SupplierEnquiryDetailsByIdResponse | null>(null)

const [openResponse, setOpenResponse] = useState(false) 

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
     
    const response: any = await SupplierEnquiryList.getEnquiries(
        token,
        apiStatus,
        page,
        pageSize
      )
   
      const data: SupplierEnquiryListItem[] = Array.isArray(response)
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
}, [filter, page, pageSize])

  useEffect(() => {
    const fetchEnquiryCounts = async () => {
      try {
        setLoadingCounts(true)

        const token = localStorage.getItem("access_token") || ""

        if (!token) {
          console.error("Unable to load enquiry counts. Token not found.")
          return
        }

        const response: any = await SupplierEnquiryCount.getEnquiryCount(token)

        const data: SupplierEnquiryCountItem[] = Array.isArray(response)
          ? response
          : response?.data ?? []

        const counts: Record<string, number> = {}
        
        const dynamicOptions: FilterStatus[] = statusOrder
        .map((status) => apiStatusToUiStatus[status])
        .filter((status): status is FilterStatus => Boolean(status))

        data.forEach((item) => {
          const uiStatus = apiStatusToUiStatus[item.status]

          if (uiStatus) {
            const count = Number(item.cnt ?? 0)

            counts[uiStatus] = count
           
            
          }
        })

       

        setStatusCounts(counts)
        setFilterOptions(dynamicOptions)
      } catch (err) {
        console.error("Enquiry count API error:", err)
      } finally {
        setLoadingCounts(false)
      }
    }

    fetchEnquiryCounts()
  }, [])


   
const resultCount = loadingCounts
  ? "..."
  : statusCounts[filter] ?? enquiries.length


const visibleFields: (keyof SupplierEnquiryListItem)[] = [
  "enquiry_no",
  "subject",
  "service_type",
  "details",
  "status",
  "next_followup",
  "assigned_to",
  "created_at",
  "updated_at",
]
const formatHeader = (key: string) => {
  return key
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const formatCellValue = (
  field: keyof SupplierEnquiryListItem,
  value: any,
  enquiry?: SupplierEnquiryListItem
) => {
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

  if (field === "service_type") {
    return (
      <Badge variant="outline" className="text-[10px]">
        {String(value)}
      </Badge>
    )
  }

  return String(value)
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
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>

            <CardTitle className="text-base sm:text-lg">
              Customer Enquiries
            </CardTitle>

            <Badge variant="outline" className="text-[10px]">
              {resultCount} results
            </Badge>
          </div>

          <RaiseEnquiry />
        </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />

            {filterOptions.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "ghost"}
                size="sm"
                className="h-7 text-xs px-2.5"
                onClick={() => {
                setPage(1)
                setFilter(f)
              }}
              >
                {f}
                
              </Button>
            ))}
          </div>
        </CardHeader>
          <CardContent className="p-0 sm:px-6 sm:pb-6">
                    <div className="overflow-x-auto">
                      <Table>
                            <TableHeader>
                            <TableRow className="bg-muted/50">
                              {visibleFields.map((field) => (
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
      No enquiries found for {filter}.
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
                  {visibleFields.map((field) => (
                    <TableCell key={field} className="text-sm">
                      {formatCellValue(field, enq[field], enq)}
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
      <SupplierResponseEnquiry
      open={openResponse}
      onOpenChange={setOpenResponse}
      enquiry={selectedEnquiry}
      apiStatusToUiStatus={apiStatusToUiStatus}
    />
    </motion.div>
  )
}