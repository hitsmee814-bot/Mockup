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
import { Camera, Calendar, Eye } from "lucide-react";

const sightseeingBookings = [
  {
    id: "SS-001",
    customer: "Rahul Sharma",
    tour: "Ubud Monkey Forest Tour",
    destination: "Bali",
    date: "2025-07-16",
    amount: 4500,
    commission: 450,
    status: "Confirmed",
  },
  {
    id: "SS-002",
    customer: "Priya Mehta",
    tour: "Desert Safari",
    destination: "Dubai",
    date: "2025-07-23",
    amount: 8500,
    commission: 850,
    status: "Confirmed",
  },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-emerald-500/15 text-emerald-600",
  Pending: "bg-amber-500/15 text-amber-600",
  Cancelled: "bg-red-500/15 text-red-600",
};

export default function SightseeingBookingsPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Sightseeing Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage all tours and activities
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>All Sightseeing Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Tour</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sightseeingBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-xs font-semibold text-primary">
                      {booking.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {booking.customer}
                    </TableCell>
                    <TableCell>{booking.tour}</TableCell>
                    <TableCell>{booking.destination}</TableCell>
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