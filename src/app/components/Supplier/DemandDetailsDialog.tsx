"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ServiceRequestListItem } from "@/services/SupplierPortalServices/SupplierServiceRequestService";

type DemandDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  demand: ServiceRequestListItem | null;
};

export default function DemandDetailsDialog({
  open,
  onOpenChange,
  demand,
}: DemandDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Service Request Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            <strong>Demand No:</strong>{" "}
            {demand?.demand_request_no}
          </p>

          <p>
            <strong>Destination:</strong>{" "}
            {demand?.destination}
          </p>

          <p>
            <strong>Travel Date:</strong>{" "}
            {demand?.travel_date}
          </p>

          <p>
            <strong>Passengers:</strong>{" "}
            {demand?.pax}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}