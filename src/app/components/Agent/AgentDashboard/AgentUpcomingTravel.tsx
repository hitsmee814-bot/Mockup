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
import { Progress } from "@/components/ui/progress";
import { upcomingTravel } from "./data";
import { CalendarRange } from "lucide-react";

const statusColor: Record<string, string> = {
  Confirmed: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "Partial Payment": "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "On Hold": "bg-red-500/15 text-red-600 dark:text-red-400",
};

export function AgentUpcomingTravel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="flex-row items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <CalendarRange className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base sm:text-lg">
              Upcoming Travel
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {upcomingTravel.length} trips lined up
          </Badge>
        </CardHeader>
        <CardContent className="p-0 sm:px-6 sm:pb-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Contact
                  </TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Travel Date
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Return
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="text-center hidden sm:table-cell">
                    Pax
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Payment
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingTravel.map((trip, i) => (
                  <motion.tr
                    key={trip.bookingId}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: i * 0.04,
                    }}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-mono text-xs font-semibold text-primary">
                      {trip.bookingId}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {trip.customerName}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">
                      {trip.contact}
                    </TableCell>
                    <TableCell className="text-sm">
                      {trip.destination}
                    </TableCell>
                    <TableCell className="text-xs hidden md:table-cell">
                      {new Date(trip.travelDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </TableCell>
                    <TableCell className="text-xs hidden xl:table-cell">
                      {new Date(trip.returnDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="text-[10px]">
                        {trip.packageType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      {trip.pax}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          statusColor[trip.status]
                        }`}
                      >
                        {trip.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Progress
                          value={trip.paymentProgress}
                          className="h-1.5 flex-1"
                        />
                        <span className="text-[10px] text-muted-foreground w-7">
                          {trip.paymentProgress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-sm">
                      ₹{trip.totalAmount.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-emerald-600 text-sm">
                      ₹{trip.commission.toLocaleString("en-IN")}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}