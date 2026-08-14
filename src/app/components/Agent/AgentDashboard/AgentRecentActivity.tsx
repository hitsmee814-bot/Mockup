// Mockup/src/app/components/Agent/AgentDashboard/AgentRecentActivity.tsx

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  CalendarCheck,
  CreditCard,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { payoutService } from "@/services/agent/payoutService";
import { paymentService } from "@/services/agent/paymentService";
import type { PendingPayout } from "@/services/agent/payoutService";
import type { PendingPayment } from "@/services/agent/paymentService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const typeIcon = {
  booking: CalendarCheck,
  payment: CreditCard,
  enquiry: MessageSquare,
  commission: TrendingUp,
};

const typeColor = {
  booking: "text-emerald-500",
  payment: "text-blue-500",
  enquiry: "text-violet-500",
  commission: "text-amber-500",
};

interface ActivityItem {
  id: string;
  action: string;
  customer: string;
  time: string;
  type: "booking" | "payment" | "enquiry" | "commission";
}

export function AgentRecentActivity() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token") || "";

      if (!token) {
        setError("Unable to load recent activity. Login token was not found.");
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

      const [pendingPayouts, pendingPayments] = await Promise.all([
        payoutService.getPendingPayouts().catch(() => [] as PendingPayout[]),
        paymentService.getPendingPayments().catch(() => [] as PendingPayment[]),
      ]);

      const items: ActivityItem[] = [];

      pendingPayouts.slice(0, 3).forEach((p: PendingPayout) => {
        items.push({
          id: `commission-${p.booking_id}`,
          action: `Commission ₹${p.commission_amount.toLocaleString(
            "en-IN"
          )} pending`,
          customer: p.booking_type || "Booking",
          time: new Date(p.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          }),
          type: "commission",
        });
      });

      pendingPayments.slice(0, 2).forEach((p: PendingPayment) => {
        items.push({
          id: `payment-${p.id}`,
          action: `Payment pending ₹${p.pending_amount.toLocaleString(
            "en-IN"
          )}`,
          customer: `Invoice #${p.invoice_no}`,
          time: "Pending",
          type: "payment",
        });
      });

      if (items.length === 0) {
        items.push({
          id: "placeholder",
          action: "No recent activity",
          customer: "All caught up!",
          time: "Now",
          type: "booking",
        });
      }

      setActivities(items.slice(0, 5));
    } catch (err: any) {
      console.error("Failed to fetch activities:", err);
      setError(
        err?.message ||
          "Unable to load recent activity. Please try again later."
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

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-20">
            <p className="text-muted-foreground">Loading activity...</p>
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

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base sm:text-lg">
            Recent Activity
          </CardTitle>
        </div>
        <Badge variant="outline" className="text-xs">
          {activities.length} activities
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        {activities.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No recent activity
          </p>
        ) : (
          activities.map((a, i) => {
            const Icon = typeIcon[a.type] || CalendarCheck;
            return (
              <div
                key={a.id}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/60 transition-colors cursor-default group hover:translate-x-1 transition-transform duration-200"
              >
                <div
                  className={`p-1.5 rounded-lg shrink-0 ${typeColor[a.type]}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.customer}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 pt-0.5">
                  {a.time}
                </span>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}