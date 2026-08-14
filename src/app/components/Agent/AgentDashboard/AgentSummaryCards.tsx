// Mockup/src/app/components/Agent/AgentDashboard/AgentSummaryCards.tsx

"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { bookingService } from "@/services/agent/bookingService";
import { commissionService } from "@/services/agent/commissionService";
import { walletService } from "@/services/agent/walletService";
import { payoutService } from "@/services/agent/payoutService";
import type { PendingPayout } from "@/services/agent/payoutService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ChangeType = "up" | "down" | "neutral";

interface CardItem {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: any;
  color: string;
  bg: string;
  gradient: string;
  loading?: boolean;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
};

export function AgentSummaryCards() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [pendingPayouts, setPendingPayouts] = useState<PendingPayout[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token") || "";

      if (!token) {
        setError("Unable to load dashboard data. Login token was not found.");
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

      const [bookings, commission, wallet, pending] = await Promise.all([
        bookingService.getTotalBookings(),
        commissionService.getTotalCommission(),
        walletService.getWalletBalance(),
        payoutService.getPendingPayouts().catch(() => [] as PendingPayout[]),
      ]);

      setTotalBookings(bookings.total_bookings || 0);
      setTotalCommission(commission.total_commission || 0);
      setWalletBalance(wallet.wallet_balance || 0);

      const actualPending = pending.filter(
        (p: PendingPayout) => p.payout_status === "PENDING"
      );
      setPendingPayouts(actualPending);
    } catch (err: any) {
      console.error("Failed to fetch dashboard data:", err);
      setError(
        err?.message ||
          "Unable to load dashboard data. Please try again later."
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

  const cards: CardItem[] = [
    {
      title: "Total Bookings",
      value: loading ? "..." : error ? "-" : totalBookings.toString(),
      change: error ? "Data unavailable" : `Total bookings`,
      changeType: "neutral",
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/10",
      gradient: "from-primary/5 to-transparent",
      loading,
    },
    {
      title: "Total Commission",
      value: loading
        ? "..."
        : error
        ? "-"
        : `₹${totalCommission.toLocaleString("en-IN")}`,
      change: error ? "Data unavailable" : `Earned so far`,
      changeType: "neutral",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500/5 to-transparent",
      loading,
    },
    {
      title: "Wallet Balance",
      value: loading
        ? "..."
        : error
        ? "-"
        : `₹${walletBalance.toLocaleString("en-IN")}`,
      change: error ? "Data unavailable" : "Available for withdrawal",
      changeType: "neutral",
      icon: Wallet,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      gradient: "from-violet-500/5 to-transparent",
      loading,
    },
    {
      title: "Active Clients",
      value: loading ? "..." : error ? "-" : "0",
      change: error ? "Data unavailable" : "From your bookings",
      changeType: "neutral",
      icon: Users,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      gradient: "from-amber-500/5 to-transparent",
      loading,
    },
    {
      title: "Pending Payouts",
      value: loading
        ? "..."
        : error
        ? "-"
        : `₹${pendingPayouts
            .reduce(
              (sum: number, p: PendingPayout) => sum + (p.commission_amount || 0),
              0
            )
            .toLocaleString("en-IN")}`,
      change: error
        ? "Data unavailable"
        : pendingPayouts.length > 0
        ? `${pendingPayouts.length} bookings pending`
        : "No pending payouts",
      changeType: "neutral",
      icon: DollarSign,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      gradient: "from-rose-500/5 to-transparent",
      loading,
    },
  ];

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4"
    >
      {cards.map((c) => (
        <motion.div
          key={c.title}
          variants={item}
          whileHover={{
            y: -4,
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
        >
          <Card
            className={`relative overflow-hidden py-4 gap-3 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br ${c.gradient}`}
          >
            <div className="absolute inset-0 border rounded-xl border-border/50" />
            <CardContent className="relative flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  {c.title}
                </p>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.3,
                  }}
                >
                  {c.value}
                </motion.p>
                <div className="flex items-center gap-1 text-xs">
                  {c.changeType === "up" && (
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  )}
                  {c.changeType === "down" && (
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                  )}
                  {c.changeType === "neutral" && (
                    <Minus className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span
                    className={
                      c.changeType === "up"
                        ? "text-emerald-500 font-semibold"
                        : c.changeType === "down"
                        ? "text-red-500 font-semibold"
                        : "text-muted-foreground"
                    }
                  >
                    {c.change}
                  </span>
                </div>
              </div>
              <div
                className={`${c.bg} ${c.color} p-1.5 rounded-lg shrink-0 absolute -top-1 -right-1`}
              >
                <c.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}