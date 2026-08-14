// Mockup/src/app/components/Agent/AgentDashboard/AgentUpcomingTravel.tsx

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
import { CalendarRange } from "lucide-react";
import { useState, useEffect } from "react";
import {
  upcomingTravelService,
  UpcomingTravel,
} from "@/services/agent/upcomingTravelService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const statusColor: Record<string, string> = {
  CONFIRMED: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  CANCELLED: "bg-red-500/15 text-red-600 dark:text-red-400",
  COMPLETED: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  PENDING: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "Partial Payment": "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "On Hold": "bg-red-500/15 text-red-600 dark:text-red-400",
};

export function AgentUpcomingTravel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [travelData, setTravelData] = useState<UpcomingTravel[]>([]);

  useEffect(() => {
    fetchUpcomingTravel();
  }, []);

  const fetchUpcomingTravel = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token") || "";

      if (!token) {
        setError("Unable to load upcoming travel. Login token was not found.");
        toast.error("Session expired. Please login again.", {
          position: "top-right",
          duration: 3000,
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInType");
        router.push("/login");
        return;
      }

      const data = await upcomingTravelService.getUpcomingTravel();
      setTravelData(data || []);
    } catch (err: any) {
      console.error("Failed to fetch upcoming travel:", err);
      setError(
        err?.message ||
          "Unable to load upcoming travel. Please try again later."
      );

      if (err?.message?.includes("401") || err?.message?.includes("expired")) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInType");
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Loading upcoming travel...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (travelData.length === 0) {
    return (
      <Card>
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
            0 trips lined up
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No upcoming travel found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            {travelData.length} trips lined up
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
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="text-center hidden sm:table-cell">
                    Pax
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {travelData.map((trip, i) => (
                  <motion.tr
                    key={trip.booking_id}
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
                      {trip.booking_id}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {trip.customer_name || "N/A"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">
                      {trip.phone || "N/A"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {trip.destination || "N/A"}
                    </TableCell>
                    <TableCell className="text-xs hidden md:table-cell">
                      {formatDate(trip.travel_date)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="text-[10px]">
                        {trip.type || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      {trip.pax || 0}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          statusColor[trip.status] ||
                          "bg-gray-500/15 text-gray-600"
                        }`}
                      >
                        {trip.status || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-sm">
                      ₹{formatCurrency(trip.total_amount || 0)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-emerald-600 text-sm">
                      ₹{formatCurrency(trip.commission || 0)}
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