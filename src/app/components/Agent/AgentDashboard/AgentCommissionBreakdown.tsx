// Mockup/src/app/components/Agent/AgentDashboard/AgentCommissionBreakdown.tsx

"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";
import { useState, useEffect } from "react";
import {
  commissionService,
  CommissionBreakdown,
} from "@/services/agent/commissionService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const colors = [
  "from-primary/80 to-primary/40",
  "from-emerald-500/80 to-emerald-500/40",
  "from-violet-500/80 to-violet-500/40",
  "from-amber-500/80 to-amber-500/40",
  "from-pink-500/80 to-pink-500/40",
  "from-blue-500/80 to-blue-500/40",
];

export function AgentCommissionBreakdown() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commissionData, setCommissionData] = useState<CommissionBreakdown[]>(
    []
  );

  useEffect(() => {
    fetchCommissionBreakdown();
  }, []);

  const fetchCommissionBreakdown = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token") || "";

      if (!token) {
        setError(
          "Unable to load commission breakdown. Login token was not found."
        );
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

      const data = await commissionService.getCommissionBreakdown();
      setCommissionData(data || []);
    } catch (err: any) {
      console.error("Failed to fetch commission breakdown:", err);
      setError(
        err?.message ||
          "Unable to load commission breakdown. Please try again later."
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

  const totalCommission = commissionData.reduce(
    (s, c) => s + c.total_commission,
    0
  );

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Loading commission data...</p>
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

  if (commissionData.length === 0) {
    return (
      <Card>
        <CardHeader className="flex-row items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-secondary/10">
              <Coins className="h-4 w-4 text-secondary" />
            </div>
            <CardTitle className="text-base sm:text-lg">
              Commission Breakdown
            </CardTitle>
          </div>
          <span className="text-sm font-bold text-emerald-500">Total: ₹0</span>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No commission data found</p>
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
            <div className="p-1.5 rounded-lg bg-secondary/10">
              <Coins className="h-4 w-4 text-secondary" />
            </div>
            <CardTitle className="text-base sm:text-lg">
              Commission Breakdown
            </CardTitle>
          </div>
          <span className="text-sm font-bold text-emerald-500">
            Total: ₹{formatCurrency(totalCommission)}
          </span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {commissionData.map((c, i) => {
              const pct =
                totalCommission > 0
                  ? (c.total_commission / totalCommission) * 100
                  : 0;
              return (
                <motion.div
                  key={c.category_code}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: i * 0.06,
                  }}
                  whileHover={{
                    y: -3,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  className="rounded-xl border p-4 hover:shadow-md transition-shadow space-y-3 cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {c.category_name || c.category_code}
                    </p>
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {c.commission_percent}%
                    </span>
                  </div>
                  <div>
                    <p className="text-xl font-bold">
                      ₹{formatCurrency(c.total_commission)}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {c.booking_count} bookings · ₹
                      {(c.total_amount / 100000).toFixed(1)}L revenue
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${
                        colors[i % colors.length]
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.2 + i * 0.06,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}