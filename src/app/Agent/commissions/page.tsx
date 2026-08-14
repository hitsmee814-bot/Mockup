// Mockup/src/app/Agent/commissions/page.tsx

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
import { TrendingUp, Target, Award, Download, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import {
  commissionService,
  CommissionBreakdown,
  CommissionSummary,
  MonthlyCommission,
} from "@/services/agent/commissionService";
import { payoutService, PendingPayout } from "@/services/agent/payoutService";

const commissionPlans = [
  { tier: "Bronze", min: 0, max: 100000, rate: 5 },
  { tier: "Silver", min: 100001, max: 250000, rate: 7 },
  { tier: "Gold", min: 250001, max: 500000, rate: 9 },
  { tier: "Platinum", min: 500001, max: 1000000, rate: 12 },
];

function formatNumber(num: number): string {
  return num.toLocaleString("en-IN");
}

export default function CommissionsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<CommissionSummary | null>(null);
  const [breakdown, setBreakdown] = useState<CommissionBreakdown[]>([]);
  const [pendingPayouts, setPendingPayouts] = useState<PendingPayout[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyCommission[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchCommissionData();
  }, []);

  const fetchCommissionData = async () => {
    setLoading(true);
    try {
      const [summaryData, breakdownData, pendingData, monthlyData] =
        await Promise.all([
          commissionService.getCommissionSummary(),
          commissionService.getCommissionBreakdown(),
          payoutService.getPendingPayouts().catch(() => []),
          commissionService.getMonthlyCommission().catch(() => []),
        ]);

      setSummary(summaryData);
      setBreakdown(breakdownData || []);
      setPendingPayouts(pendingData || []);
      setMonthlyData(monthlyData || []);
    } catch (error) {
      console.error("Failed to fetch commission data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalEarned = summary?.total_commission || 0;
  const totalBookingsAmount = breakdown.reduce(
    (sum, c) => sum + c.total_amount,
    0
  );
  const totalCommission = breakdown.reduce(
    (sum, c) => sum + c.total_commission,
    0
  );

  const currentTier =
    commissionPlans.find(
      (plan) => totalBookingsAmount >= plan.min && totalBookingsAmount <= plan.max
    ) || commissionPlans[0];

  const summaryStats = [
    {
      title: "Total Commission Earned",
      value: loading ? "..." : `₹${formatNumber(totalEarned)}`,
      change: "From all bookings",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500/5 to-transparent",
    },
    {
      title: "Total Booking Value",
      value: loading ? "..." : `₹${formatNumber(totalBookingsAmount)}`,
      change: "Across all categories",
      icon: Target,
      color: "text-primary",
      bg: "bg-primary/10",
      gradient: "from-primary/5 to-transparent",
    },
    {
      title: "Current Tier",
      value: loading ? "..." : currentTier.tier,
      change: loading ? "..." : `${currentTier.rate}% Commission Rate`,
      icon: Award,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      gradient: "from-violet-500/5 to-transparent",
    },
  ];

  if (!mounted || loading) {
    return (
      <div className="space-y-5 sm:space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6" suppressHydrationWarning>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Commissions
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track your earnings and commission structure
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {summaryStats.map((stat, index) => (
          <div
            key={stat.title}
            className="group hover:-translate-y-1 transition-transform duration-200"
          >
            <Card
              className={`relative overflow-hidden py-4 gap-3 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br ${stat.gradient}`}
            >
              <div className="absolute inset-0 border rounded-xl border-border/50" />
              <CardContent className="relative flex items-start justify-between">
                <div className="space-y-1.5">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <Minus className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{stat.change}</span>
                  </div>
                </div>
                <div
                  className={`${stat.bg} ${stat.color} p-1.5 rounded-lg shrink-0 absolute -top-1 -right-1`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Commission Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commissionPlans.map((plan) => (
              <div
                key={plan.tier}
                className={`p-4 rounded-xl border-2 transition hover:shadow-md group hover:-translate-y-1 ${
                  plan.tier === currentTier.tier
                    ? "border-primary bg-primary/5"
                    : "border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Award
                    className={`h-5 w-5 ${
                      plan.tier === currentTier.tier
                        ? "text-primary"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="text-2xl font-bold text-primary">
                    {plan.rate}%
                  </span>
                </div>
                <h4 className="font-semibold">{plan.tier}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  ₹{formatNumber(plan.min)} - ₹{formatNumber(plan.max)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Commission Earnings History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Category</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breakdown.map((item) => (
                  <TableRow key={item.category_code}>
                    <TableCell className="font-medium">
                      {item.category_name || item.category_code}
                    </TableCell>
                    <TableCell>{item.booking_count}</TableCell>
                    <TableCell>₹{formatNumber(item.total_amount)}</TableCell>
                    <TableCell>{item.commission_percent}%</TableCell>
                    <TableCell className="font-semibold text-emerald-600">
                      ₹{formatNumber(item.total_commission)}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-500">Credited</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {breakdown.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No commission data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}