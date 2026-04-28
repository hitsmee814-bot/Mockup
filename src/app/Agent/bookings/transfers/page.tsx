"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Calendar, Eye } from "lucide-react";

const transferBookings = [
  {
    id: "TRF-001",
    customer: "Rahul Sharma",
    type: "Airport Transfer",
    from: "Bali Airport",
    to: "The Oberoi Bali",
    date: "2025-07-15",
    amount: 3500,
    commission: 175,
    status: "Confirmed",
  },
  {
    id: "TRF-002",
    customer: "Priya Mehta",
    type: "City Tour",
    from: "Dubai Mall",
    to: "Burj Khalifa",
    date: "2025-07-22",
    amount: 5000,
    commission: 250,
    status: "Confirmed",
  },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-emerald-500/15 text-emerald-600",
  Pending: "bg-amber-500/15 text-amber-600",
  Cancelled: "bg-red-500/15 text-red-600",
};

export default function TransferBookingsPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Transfer Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage all ground transfers
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>All Transfer Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transferBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-xs font-semibold text-primary">
                      {booking.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {booking.customer}
                    </TableCell>
                    <TableCell>{booking.type}</TableCell>
                    <TableCell>
                      {booking.from} → {booking.to}
                    </TableCell>
                    <TableCell className="text-sm">{booking.date}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{booking.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-emerald-600">
                      ₹{booking.commission.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs rounded-full ${statusColor[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}