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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Eye, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

const payments = [
  {
    id: "PAY-001",
    bookingId: "BK-10234",
    customer: "Rahul Sharma",
    amount: 245000,
    date: "2025-07-10",
    method: "Card",
    status: "Completed",
  },
  {
    id: "PAY-002",
    bookingId: "BK-10235",
    customer: "Priya Mehta",
    amount: 21000,
    date: "2025-07-09",
    method: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "PAY-003",
    bookingId: "BK-10236",
    customer: "Amit Patel",
    amount: 144000,
    date: "2025-07-08",
    method: "Wallet",
    status: "Pending",
  },
  {
    id: "PAY-004",
    bookingId: "BK-10237",
    customer: "Sneha Reddy",
    amount: 28000,
    date: "2025-07-07",
    method: "Card",
    status: "Completed",
  },
  {
    id: "PAY-005",
    bookingId: "BK-10238",
    customer: "Vikram Singh",
    amount: 50000,
    date: "2025-07-05",
    method: "Bank Transfer",
    status: "Failed",
  },
];

const statusColor: Record<string, string> = {
  Completed: "bg-emerald-500/15 text-emerald-600",
  Pending: "bg-amber-500/15 text-amber-600",
  Failed: "bg-red-500/15 text-red-600",
};

// Safe number formatter that won't cause hydration issues
function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPayments = payments.filter(
    (p) =>
      p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCollected = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const successRate = payments.length > 0
    ? ((payments.filter((p) => p.status === "Completed").length / payments.length) * 100).toFixed(0)
    : "0";

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
            Payments
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track and manage all payment transactions
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" /> Export Report
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ₹{formatNumber(totalCollected)}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-emerald-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold text-amber-600">
                  ₹{formatNumber(totalPending)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {successRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer, payment ID, or booking ID..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-xs font-semibold text-primary">
                      {payment.id}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {payment.bookingId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {payment.customer}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{formatNumber(payment.amount)}
                    </TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs rounded-full ${statusColor[payment.status]}`}
                      >
                        {payment.status}
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

          {/* Empty State */}
          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payments found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}