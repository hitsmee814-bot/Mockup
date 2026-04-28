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
import { Calendar, MapPin, Users, DollarSign, Eye } from "lucide-react";
import { useState } from "react";

// Mock data for package bookings
const packageBookings = [
  {
    id: "PKG-001",
    customer: "Rahul Sharma",
    package: "Exotic Bali Escape",
    destination: "Bali, Indonesia",
    startDate: "2025-07-15",
    endDate: "2025-07-22",
    pax: 4,
    amount: 245000,
    commission: 22050,
    status: "Confirmed",
    paymentStatus: "Paid",
  },
  {
    id: "PKG-002",
    customer: "Priya Mehta",
    package: "Swiss Alps Adventure",
    destination: "Switzerland",
    startDate: "2025-07-20",
    endDate: "2025-07-28",
    pax: 2,
    amount: 325000,
    commission: 29250,
    status: "Confirmed",
    paymentStatus: "Partial",
  },
  {
    id: "PKG-003",
    customer: "Amit Patel",
    package: "Thailand Highlights",
    destination: "Thailand",
    startDate: "2025-08-01",
    endDate: "2025-08-08",
    pax: 3,
    amount: 95000,
    commission: 6650,
    status: "Pending",
    paymentStatus: "Unpaid",
  },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-emerald-500/15 text-emerald-600",
  Pending: "bg-amber-500/15 text-amber-600",
  Completed: "bg-blue-500/15 text-blue-600",
  Cancelled: "bg-red-500/15 text-red-600",
};

const paymentColor: Record<string, string> = {
  Paid: "bg-emerald-500/15 text-emerald-600",
  Partial: "bg-amber-500/15 text-amber-600",
  Unpaid: "bg-red-500/15 text-red-600",
};

export default function PackageBookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Package Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage all package tour bookings
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>All Package Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Travel Dates</TableHead>
                  <TableHead>Pax</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packageBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-xs font-semibold text-primary">
                      {booking.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {booking.customer}
                    </TableCell>
                    <TableCell>{booking.package}</TableCell>
                    <TableCell>{booking.destination}</TableCell>
                    <TableCell className="text-sm">
                      {booking.startDate} → {booking.endDate}
                    </TableCell>
                    <TableCell className="text-center">{booking.pax}</TableCell>
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
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs rounded-full ${paymentColor[booking.paymentStatus]}`}
                      >
                        {booking.paymentStatus}
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