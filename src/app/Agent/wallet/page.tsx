// Mockup/src/app/Agent/wallet/page.tsx

"use client";

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
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { walletService } from "@/services/agent/walletService";
import { payoutService, PendingPayout } from "@/services/agent/payoutService";

function formatNumber(num: number): string {
  return num.toLocaleString("en-IN");
}

export default function WalletPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [pendingPayouts, setPendingPayouts] = useState<PendingPayout[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    setLoading(true);
    try {
      const [balanceData, pendingData] = await Promise.all([
        walletService.getWalletBalance(),
        payoutService.getPendingPayouts().catch(() => []),
      ]);

      setBalance(balanceData.wallet_balance || 0);
      setPendingPayouts(pendingData || []);
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const transactions = pendingPayouts.map((p) => ({
    id: `COM-${p.booking_id}`,
    type: "credit" as const,
    amount: p.commission_amount,
    description: `Commission - ${p.booking_no}`,
    date: new Date(p.created_at).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    status: "Pending" as const,
  }));

  const summaryStats = [
    {
      title: "Current Balance",
      value: loading ? "..." : `₹${formatNumber(balance)}`,
      change: "Available for withdrawal",
      icon: Wallet,
      color: "text-primary",
      bg: "bg-primary/10",
      gradient: "from-primary/5 to-transparent",
    },
    {
      title: "Pending Credits",
      value: loading
        ? "..."
        : `₹${formatNumber(
            transactions.reduce((sum, t) => sum + t.amount, 0)
          )}`,
      change: `${transactions.length} pending transactions`,
      icon: TrendingUp,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      gradient: "from-amber-500/5 to-transparent",
    },
    {
      title: "Total Transactions",
      value: loading ? "..." : transactions.length.toString(),
      change: "All time",
      icon: ArrowUpRight,
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
            Wallet
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your wallet balance and transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpRight className="h-4 w-4 mr-1" /> Withdraw
          </Button>
          <Button size="sm" className="gap-1.5">
            <TrendingUp className="h-4 w-4" /> Recharge
          </Button>
        </div>
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
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-mono text-xs text-primary">
                        {txn.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {txn.type === "credit" ? (
                            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 text-red-500" />
                          )}
                          <span
                            className={
                              txn.type === "credit"
                                ? "text-emerald-600"
                                : "text-red-600"
                            }
                          >
                            {txn.type === "credit" ? "Credit" : "Debit"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{txn.description}</TableCell>
                      <TableCell
                        className={
                          txn.type === "credit"
                            ? "text-emerald-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {txn.type === "credit" ? "+" : "-"}₹
                        {formatNumber(txn.amount)}
                      </TableCell>
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500">{txn.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground py-4"
                    >
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}