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
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState, useEffect } from "react";

const transactions = [
  {
    id: "TXN-001",
    type: "credit",
    amount: 5000,
    description: "Wallet Recharge",
    date: "2025-07-15",
    status: "Completed",
  },
  {
    id: "TXN-002",
    type: "credit",
    amount: 22050,
    description: "Commission Credit - BK-10234",
    date: "2025-07-14",
    status: "Completed",
  },
  {
    id: "TXN-003",
    type: "debit",
    amount: 15000,
    description: "Withdrawal to Bank",
    date: "2025-07-10",
    status: "Completed",
  },
  {
    id: "TXN-004",
    type: "credit",
    amount: 2450,
    description: "Commission Credit - BK-10235",
    date: "2025-07-09",
    status: "Completed",
  },
];

const balance = 12500;

// Safe number formatter that won't cause hydration issues
function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

export default function WalletPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      </motion.div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-4xl font-bold">₹{formatNumber(balance)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Available for withdrawal
              </p>
            </div>
            <div className="p-3 rounded-full bg-primary/20">
              <Wallet className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
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
                      <Badge className="bg-emerald-500">{txn.status}</Badge>
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