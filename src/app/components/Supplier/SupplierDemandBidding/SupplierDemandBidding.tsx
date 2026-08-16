"use client"
import { motion } from "framer-motion"
import {
  MapPin,
  Calendar,
  Users,
  Gavel,
} from "lucide-react"
import DemandDetailsDialog from "./DemandDetailsDialog";
import { SupplierPlaceBidDialog } from "./SupplierPlaceBidDialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock } from "lucide-react";


import { useEffect, useState } from "react";
import {
  supplierServiceRequestService,
  type ServiceRequestListItem,
} from "@/services/SupplierPortalServices/SupplierServiceRequestService";


type DemandStatus =
  | "OPEN"
  | "IN_BIDDING"
  | "AWARDED"
  | "CANCELLED"
  | "CLOSED"


type BidStatus =
  | "ACTIVE"
  | "OUTBID"
  | "WON"
  | "LOST"
  | "WITHDRAWN"

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatDateTime = (date: string) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/* Service badge colors (same as your service page) */
const serviceStyles: Record<string, string> = {
  Package: "bg-emerald-100 text-emerald-700",
  Transfer: "bg-violet-100 text-violet-700",
  Sightseeing: "bg-orange-100 text-orange-700",
  Visa: "bg-blue-100 text-blue-700",
  Insurance: "bg-pink-100 text-pink-700",
}

/* Status badge colors */
const statusStyles: Record<DemandStatus, string> = {
  OPEN: "bg-blue-100 text-blue-700",
  IN_BIDDING: "bg-amber-100 text-amber-700",
  AWARDED: "bg-emerald-100 text-emerald-700",
  CLOSED: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-700",
}

export default function SupplierDemandBidding() {

const [demands, setDemands] = useState<ServiceRequestListItem[]>([]);
const [loading, setLoading] = useState(false);

  const [selectedDemand, setSelectedDemand] =
  useState<ServiceRequestListItem | null>(null);

const [detailsOpen, setDetailsOpen] =
  useState(false);

 const [dialogId, setDialogId] =
    useState<number | null>(null);

 useEffect(() => {
  loadDemands();
}, []);

const loadDemands = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("access_token") || "";
    const response =
      await supplierServiceRequestService.getAssignedServiceRequests({
        token,
        page: 1,
        size: 20,
      });

    setDemands(response);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Demand & Bidding</h1>
        <p className="text-sm text-muted-foreground">
          View live demand and place competitive bids
        </p>
      </motion.div>

     {loading && (
      <div className="text-center py-8 text-muted-foreground">
        Loading demand requests...
      </div>
    )}
      

      {/* Demand Cards */}
      <div className="grid gap-4">
        {demands
        .filter(
          d =>
            d.status === "OPEN" ||
            d.status === "IN_BIDDING"
        )
        .map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-5">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Left */}
                <div className="space-y-3 flex-1">
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-muted-foreground">
                      {d.demand_request_no}
                    </span>

                   <Badge
                  className={`text-xs px-2 py-0.5 ${
                    statusStyles[d.status as keyof typeof statusStyles]
                  }`}
                >
                  {d.status
                    .replaceAll("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, c => c.toUpperCase())}
                </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{d.destination}</span>
                    
                  </div>

                    <div className="space-y-1 text-sm text-gray-600">

          <span className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              <span className="font-medium text-gray-700">Travel Date:</span>{" "}
              {formatDate(d.travel_date)}
            </span>
          </span>

            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>
                <span className="font-medium text-gray-700">Bid Closes On:</span>{" "}
                {formatDateTime(d.bid_close_at)}
              </span>
            </span>

              <span className="flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>
                  <span className="font-medium text-gray-700">Assigned On:</span>{" "}
                  {formatDateTime(d.assigned_at)}
                </span>
              </span>


                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {d.pax} pax
                    </span>
                    
                  </div>

                  {/* Service badges */}
                <div className="flex flex-wrap gap-2">
           <div className="flex items-center gap-3 mt-3">
              <Badge
                className={`text-xs px-2 py-0.5 ${
                  serviceStyles[d.service_type] ??
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {d.service_type
                  .replaceAll("_", " ")
                  .toLowerCase()
                  .replace(/\b\w/g, c => c.toUpperCase())}
              </Badge>

              <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-[#00AFEF]"
              onClick={() => {
                setSelectedDemand(d);
                setDetailsOpen(true);
              }}
            >
              View Details
            </Button>
            </div>
              </div>
                </div>

               
              {/* Right */}
            <div className="flex flex-col items-end gap-2 min-w-[180px]">

              <Button
                size="sm"
                className="bg-[#00AFEF] text-white hover:bg-[#0099D1]"
                onClick={() => setDialogId(d.id)}
              >
                <Gavel className="mr-1 h-4 w-4" />
                Place Bid
              </Button>

              {/* Place Bid Dialog */}
              <SupplierPlaceBidDialog
                open={dialogId === d.id}
                onOpenChange={(open) =>
                  setDialogId(open ? d.id : null)
                }
                demandId={d.id}
                serviceRequestNo={d.service_request_no}
                destination={d.destination}
              />

            </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
     <DemandDetailsDialog
      open={detailsOpen}
      onOpenChange={setDetailsOpen}
      serviceRequestId={selectedDemand?.service_request_id ?? null}
    />
    </div>
  )
}