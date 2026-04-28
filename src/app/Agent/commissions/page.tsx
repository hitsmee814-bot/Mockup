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
import { TrendingUp, Target, Award, Download } from "lucide-react";
import { useState, useEffect } from "react";

const commissionEarnings = [
  {
    id: "COM-001",
    bookingId: "BK-10234",
    customer: "Rahul Sharma",
    amount: 245000,
    rate: "9%",
    commission: 22050,
    status: "Credited",
    date: "2025-07-15",
  },
  {
    id: "COM-002",
    bookingId: "BK-10235",
    customer: "Priya Mehta",
    amount: 35000,
    rate: "7%",
    commission: 2450,
    status: "Credited",
    date: "2025-07-10",
  },
  {
    id: "COM-003",
    bookingId: "BK-10236",
    customer: "Amit Patel",
    amount: 480000,
    rate: "9%",
    commission: 43200,
    status: "Pending",
    date: "2025-07-08",
  },
];

const commissionPlans = [
  { tier: "Bronze", min: 0, max: 100000, rate: 5 },
  { tier: "Silver", min: 100001, max: 250000, rate: 7 },
  { tier: "Gold", min: 250001, max: 500000, rate: 9 },
  { tier: "Platinum", min: 500001, max: 1000000, rate: 12 },
];

// Safe number formatter that won't cause hydration issues
function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

export default function CommissionsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalEarned = commissionEarnings
    .filter((c) => c.status === "Credited")
    .reduce((sum, c) => sum + c.commission, 0);

  const totalBookingsAmount = commissionEarnings.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  
  const currentTier = commissionPlans.find(
    (plan) =>
      totalBookingsAmount >= plan.min && totalBookingsAmount <= plan.max
  ) || commissionPlans[0];

  // Prevent hydration mismatch by not rendering numbers until mounted
  if (!mounted) {
    return (
      <div className="space-y-5 sm:space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6" suppressHydrationWarning>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex items-center justify-between flex-wrap gap-3"
      >
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
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Commission Earned
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  ₹{formatNumber(totalEarned)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Booking Value
                </p>
                <p className="text-2xl font-bold">
                  ₹{formatNumber(totalBookingsAmount)}
                </p>
              </div>
              <Target className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Tier</p>
                <p className="text-2xl font-bold text-primary">
                  {currentTier.tier}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentTier.rate}% Commission Rate
                </p>
              </div>
              <Award className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commissionPlans.map((plan) => (
              <div
                key={plan.tier}
                className={`p-4 rounded-xl border-2 transition ${
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

      {/* Earnings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Earnings History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Booking Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionEarnings.map((earning) => (
                  <TableRow key={earning.id}>
                    <TableCell className="font-mono text-xs font-semibold text-primary">
                      {earning.id}
                    </TableCell>
                    <TableCell>{earning.bookingId}</TableCell>
                    <TableCell className="font-medium">
                      {earning.customer}
                    </TableCell>
                    <TableCell>₹{formatNumber(earning.amount)}</TableCell>
                    <TableCell>{earning.rate}</TableCell>
                    <TableCell className="font-semibold text-emerald-600">
                      ₹{formatNumber(earning.commission)}
                    </TableCell>
                    <TableCell>{earning.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          earning.status === "Credited" ? "default" : "secondary"
                        }
                        className={
                          earning.status === "Credited"
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }
                      >
                        {earning.status}
                      </Badge>
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