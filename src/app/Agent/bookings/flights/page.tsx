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
import { Plane, Calendar, MapPin, Eye } from "lucide-react";

const flightBookings = [
  {
    id: "FLY-001",
    pnr: "PNR123456",
    customer: "Rahul Sharma",
    airline: "IndiGo",
    flight: "6E-234",
    origin: "DEL",
    destination: "BKK",
    departure: "2025-07-15",
    amount: 72000,
    commission: 2160,
    status: "Confirmed",
  },
  {
    id: "FLY-002",
    pnr: "PNR123457",
    customer: "Priya Mehta",
    airline: "Emirates",
    flight: "EK-515",
    origin: "BOM",
    destination: "DXB",
    departure: "2025-07-20",
    amount: 180000,
    commission: 5400,
    status: "Confirmed",
  },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-emerald-500/15 text-emerald-600",
  Pending: "bg-amber-500/15 text-amber-600",
  Cancelled: "bg-red-500/15 text-red-600",
};

export default function FlightBookingsPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Flight Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage all flight ticket bookings
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>All Flight Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PNR</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Airline</TableHead>
                  <TableHead>Flight</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flightBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-xs font-semibold text-primary">
                      {booking.pnr}
                    </TableCell>
                    <TableCell className="font-medium">
                      {booking.customer}
                    </TableCell>
                    <TableCell>{booking.airline}</TableCell>
                    <TableCell>{booking.flight}</TableCell>
                    <TableCell>
                      {booking.origin} → {booking.destination}
                    </TableCell>
                    <TableCell className="text-sm">
                      {booking.departure}
                    </TableCell>
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