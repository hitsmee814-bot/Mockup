"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2} from "lucide-react"
import {  AddSupplierCatalogItem } from "./AddSupplierCatalogItem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EditCatalogAndRateDetails } from "./EditCatalogAndRateDetails"
import {
  Hotel,
  Car,
  Package,
  MapPinned,
  Shield,
  Stamp,
  Ship,
  Train,
  Bus,
  HelpCircle,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { supplierDeleteCatalogService }
from "@/services/SupplierPortalServices/SupplierDeleteCatalog";
import {
  supplierServiceList,
  type CatalogWithRateCountItem,
} from "@/services/SupplierPortalServices/SupplierServiceList";
import {
  SupplierCatalogRates,
  type CatalogRateItem,
} from "@/services/SupplierPortalServices/SupplierCatalogRates"
type RateStatus = 
  | "ACTIVE"
  | "INACTIVE"
  | "DRAFT"
  | "DELETED"


const rateStatusOptions: RateStatus[] = [
   "ACTIVE",
  "INACTIVE",
  "DRAFT",
  "DELETED",
 
]
const statusStyles: Record<string, string> = {
  ACTIVE:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",

  DELETED:
    "bg-red-50 text-red-700 border border-red-200",

  DRAFT:
    "bg-orange-50 text-orange-700 border border-orange-200",

  INACTIVE:
    "bg-purple-50 text-purple-700 border border-purple-200",
}
const statusLabel: Record<RateStatus, string> = {
   ACTIVE: "Active",
  INACTIVE: "Inactive",
  DRAFT: "Draft",
  DELETED: "Deleted",
 
}

const typeStyles: Record<string, string> = {
  HOTEL:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",

  TRANSFER:
    "bg-orange-50 text-orange-700 border border-orange-200",

  CAR_RENTAL:
    "bg-orange-50 text-orange-700 border border-orange-200",

  TOUR_PACKAGE:
    "bg-violet-50 text-violet-700 border border-violet-200",

  ACTIVITY:
    "bg-cyan-50 text-cyan-700 border border-cyan-200",

  INSURANCE:
    "bg-pink-50 text-pink-700 border border-pink-200",

  VISA:
    "bg-blue-50 text-blue-700 border border-blue-200",

  CRUISE:
    "bg-sky-50 text-sky-700 border border-sky-200",

  RAIL:
    "bg-indigo-50 text-indigo-700 border border-indigo-200",

  BUS:
    "bg-yellow-50 text-yellow-700 border border-yellow-200",
}
const serviceTypeIcons: Record<string, any> = {
  HOTEL: Hotel,
  TRANSFER: Car,
  CAR_RENTAL: Car,
  TOUR_PACKAGE: Package,
  ACTIVITY: MapPinned,
  INSURANCE: Shield,
  VISA: Stamp,
  CRUISE: Ship,
  RAIL: Train,
  BUS: Bus,
}
export default function SupplierServiceRates() {
  
  const [catalogs, setCatalogs] = useState<CatalogWithRateCountItem[]>([])
const [loadingCatalogs, setLoadingCatalogs] = useState(false)
  
const [activeStatus, setActiveStatus] = useState<RateStatus>("ACTIVE")
 const [rates, setRates] = useState<CatalogRateItem[]>([])
const [loadingRates, setLoadingRates] = useState(false)
  const [selectedCatalog, setSelectedCatalog] = useState<any>(null)
const [rateDialogOpen, setRateDialogOpen] =
  useState(false)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
const showActionsColumn =
  activeStatus !== "DELETED";

  const [deleteDialogOpen, setDeleteDialogOpen] =
  useState(false)

const [catalogToDelete, setCatalogToDelete] =
  useState<{
    id: number
    status: string
  } | null>(null)


const handleViewRates = async (catalog: any) => {
  try {
    setSelectedCatalog(catalog)
    setRateDialogOpen(true)

    setLoadingRates(true)

    const response =
      await SupplierCatalogRates.getByCatalogId(
        catalog.id
      )

    console.log("Rates:", response)

    setRates(response || [])
  } catch (error) {
    console.error(error)

    toast.error("Unable to load rates")

    setRates([])
  } finally {
    setLoadingRates(false)
  }
}
  

  useEffect(() => {
  const fetchCatalogs = async () => {
    try {
      setLoadingCatalogs(true)

      const token = localStorage.getItem("access_token")

      if (!token) {
        toast.error("Session expired. Please login again.")
        return
      }

      const response =
      await supplierServiceList.getCatalogWithRateCount({
      token,
      page,
      size: pageSize,
      status: activeStatus,
    })

      console.log("Catalog API Response:", response)

      setCatalogs(Array.isArray(response) ? response : [])
    } catch (error: any) {
      console.error("Catalog API Error:", error)

      toast.error(
        error?.message || "Unable to load catalog items."
      )

      setCatalogs([])
    } finally {
      setLoadingCatalogs(false)
    }
  }

  fetchCatalogs()
}, [page, pageSize, activeStatus])


  const handleDelete = async () => {
  if (!catalogToDelete) return

  try {
    const token =
      localStorage.getItem("access_token")

    if (!token) {
      toast.error("Session expired")
      return
    }

    await supplierDeleteCatalogService.deleteCatalog(
      catalogToDelete.id,
      catalogToDelete.status,
      token
    )

    toast.success("Deleted successfully")

    setDeleteDialogOpen(false)

    // refresh list here

  } catch (error) {
    toast.error("Delete failed")
  }
}
  const formatDate = (date?: string | null) => {
    if (!date) return ""

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatDateRange = (start?: string | null, end?: string | null) => {
    const startDate = formatDate(start)
    const endDate = formatDate(end)

    if (!startDate && !endDate) return ""
    if (startDate && !endDate) return startDate
    if (!startDate && endDate) return endDate

    return `${startDate} → ${endDate}`
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Services & Rates
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your travel catalog and pricing
        </p>  
        </div>

      <AddSupplierCatalogItem />
      </motion.div>

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
                

               <CardTitle className="text-base sm:text-lg">
               Service Catalog

              </CardTitle>
               
              </div>
            </div>

           <div className="inline-flex items-center rounded-lg bg-muted p-1">
  {rateStatusOptions.map((status) => (
    <Button
      key={status}
      type="button"
      size="sm"
      variant="ghost"
      onClick={() => {
        setActiveStatus(status)
        setPage(1)
      }}
      className={`
        h-9 px-4 rounded-md transition-all
        ${
          activeStatus === status
            ? "bg-background shadow-sm text-primary font-medium"
            : "text-muted-foreground hover:text-foreground"
        }
      `}
    >
      {statusLabel[status]}
    </Button>
  ))}
</div>
          </CardHeader>

          <CardContent className="p-0 sm:px-6 sm:pb-6">
            <div className="overflow-x-auto">
              
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50">
        <TableHead className="w-[200px] text-left">Service Name</TableHead>
        <TableHead className="w-[150px] text-left">
  Description
</TableHead>
        <TableHead className="w-[150px] text-left">Service Type</TableHead>
        <TableHead className="text-left">City</TableHead>
        <TableHead className="text-left">Country</TableHead>
        <TableHead className="text-center">Validity</TableHead>
        <TableHead className="w-[100px] text-center">Status</TableHead>
        <TableHead className="text-center">
        Rates
      </TableHead>
        
        {showActionsColumn && (
        <TableHead className="text-center">
          Actions
        </TableHead>
      )}
      </TableRow>
    </TableHeader>
<TableBody>
  {loadingCatalogs && (
    <TableRow>
      <TableCell
        colSpan={9}
        className="text-center py-6"
      >
        Loading catalog items...
      </TableCell>
    </TableRow>
  )}

  {!loadingCatalogs &&
    catalogs.length === 0&& (
      <TableRow>
        <TableCell
          colSpan={9}
          className="text-center py-6"
        >
          No catalog items found.
        </TableCell>
      </TableRow>
    )}

  {!loadingCatalogs &&
    catalogs.map((catalog) => (
      <TableRow key={catalog.id}
       className="border-b hover:bg-muted/30 transition-colors"
      >
        <TableCell className="max-w-[200px] text-left">
  <div
  className="truncate font-medium hover:text-[#00AFEF] cursor-help transition-colors"
  title={catalog.service_name || undefined}
>
  {catalog.service_name}
</div>
</TableCell>
      <TableCell className="w-[150px] max-w-[150px] text-left">
  <div
   className="truncate font-medium hover:text-[#00AFEF] cursor-help transition-colors"
    title={catalog.description || undefined}
  >
    {catalog.description || "-"}
  </div>
</TableCell>
        <TableCell className="w-[15px] text-left">
  {(() => {
    const Icon =
      serviceTypeIcons[catalog.service_type] ||
      HelpCircle

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
        typeStyles[catalog.service_type] ||
        "bg-slate-50 text-slate-700 border border-slate-200"
      }`}
      >
        <Icon className="h-3.5 w-3.5" />

        {catalog.service_type.replaceAll("_", " ")}
      </span>
    )
  })()}
</TableCell>

        <TableCell className="text-left">{catalog.city}</TableCell>

        <TableCell className="text-left">{catalog.country}</TableCell>

        <TableCell className="text-left">{catalog.validity}</TableCell>
       <TableCell className="w-[100px] text-left">
  <span
   className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
  statusStyles[catalog.status] ||
  "bg-slate-100 text-slate-700"
}`}
  >
    {catalog.status}
  </span>
</TableCell>
       <TableCell className="text-center">
  <button
    type="button"
    onClick={() => handleViewRates(catalog)}
    className="text-[#00AFEF] hover:underline font-medium"
    title="Click to view rate details"
  >
    {catalog.rates_available} Rates
  </button>
</TableCell>

        
{showActionsColumn && (
  <TableCell className="text-center">

    {catalog.status !== "DELETED" && (
      <EditCatalogAndRateDetails
        catalogId={catalog.id}
      />
    )}

    {["ACTIVE", "INACTIVE", "DRAFT"].includes(
      catalog.status
    ) && (
      <Button
        size="icon"
        variant="ghost"
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      onClick={() => {
  setCatalogToDelete({
    id: catalog.id,
    status: catalog.status,
  })

  setDeleteDialogOpen(true)
}}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    )}

  </TableCell>
)}
      </TableRow>
    ))}
</TableBody>
  </Table>


            </div>

            <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
             <Button
            variant="outline"
            size="sm"
            disabled={page === 1 || loadingCatalogs}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>

              <span className="text-sm text-muted-foreground">
                Page {page}
              </span>

            
            </div>
          </CardContent>
        </Card>
      </motion.div>
     <Dialog
  open={rateDialogOpen}
  onOpenChange={setRateDialogOpen}
>
<DialogContent className="sm:max-w-[900px]">

  <DialogHeader className="sr-only">
  <DialogTitle>
    Rate Details
  </DialogTitle>
</DialogHeader>

   <div className="border-b px-6 py-5 bg-gradient-to-r from-sky-50 to-cyan-50">
  <h2 className="text-2xl font-semibold text-slate-800">
    {selectedCatalog?.service_name}
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    {selectedCatalog?.description}
  </p>
</div>

   <div>


    

      {/* Rates Table */}

    <div
  className="
    max-h-[700px]
    overflow-auto
    rounded-xl
    border
    border-slate-200
    bg-white
    shadow-sm
    mb-8
  "
>

        {loadingRates ? (
          <div className="p-8 text-center">
            Loading rates...
          </div>
        ) : rates.length === 0 ? (
          <div className="p-8 text-center">
            No rates found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-slate-700">
                  Rate Name
                </TableHead>
               <TableHead className="font-semibold text-slate-700">
                Price
              </TableHead>

              <TableHead className="font-semibold text-slate-700">
                Tax %
              </TableHead>

              <TableHead className="font-semibold text-slate-700">
                Markup %
              </TableHead>

              <TableHead className="font-semibold text-slate-700">
                Currency
              </TableHead>

              <TableHead className="font-semibold text-slate-700">
                Pax
              </TableHead>

              <TableHead className="font-semibold text-slate-700">
                Validity
              </TableHead>

              <TableHead className="font-semibold text-slate-700">
                Status
              </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rates.map((rate) => (
                <TableRow
                key={rate.id}
                className="
                  hover:bg-sky-50/60
                  transition-colors
                "
              >
                  <TableCell className="font-medium text-slate-800">
                  {rate.rate_name}
                </TableCell>

                  <TableCell className="font-semibold text-slate-800">
                  ₹ {Number(rate.base_price).toLocaleString()}
                </TableCell>
                  <TableCell>
                    {rate.tax_percent}
                  </TableCell>

                  <TableCell>
                    {rate.markup_percent}
                  </TableCell>

                  <TableCell>
                    {rate.currency}
                  </TableCell>

                  <TableCell>
                    {rate.min_pax} - {rate.max_pax}
                  </TableCell>
                  <TableCell className="text-slate-600 whitespace-nowrap">
                  {formatDate(rate.effective_from)}
                  <span className="mx-1 text-[#00AFEF]">
                    →
                  </span>
                  {formatDate(rate.effective_to)}
                </TableCell>

                   <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[rate.status] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {rate.status}
                  </span>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        )}

      </div>

    </div>

  </DialogContent>
</Dialog>
<Dialog
  open={deleteDialogOpen}
  onOpenChange={setDeleteDialogOpen}
>
  <DialogContent className="sm:max-w-[380px] rounded-2xl">

  <DialogHeader>
    <DialogTitle className="text-center text-lg font-semibold">
      Delete Catalog Item
    </DialogTitle>
  </DialogHeader>

  <div className="py-2 text-center">
    <p className="text-slate-600">
      This will delete the catalog item and all associated
      rate details.
    </p>
  </div>

  <div className="flex justify-center gap-4 pt-2">
    <Button
      variant="outline"
      className="min-w-[110px]"
      onClick={() => setDeleteDialogOpen(false)}
    >
      Cancel
    </Button>

    <Button
      variant="destructive"
      className="min-w-[110px]"
      onClick={handleDelete}
    >
      Delete
    </Button>
  </div>

</DialogContent>
</Dialog>


    </div>
  )
}