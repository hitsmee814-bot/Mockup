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
import { Search, Download, Eye, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const invoices = [
  {
    id: "INV-001",
    bookingId: "BK-10234",
    customer: "Rahul Sharma",
    amount: 245000,
    paid: 245000,
    balance: 0,
    issueDate: "2025-07-01",
    dueDate: "2025-07-15",
    status: "Paid",
  },
  {
    id: "INV-002",
    bookingId: "BK-10235",
    customer: "Priya Mehta",
    amount: 35000,
    paid: 21000,
    balance: 14000,
    issueDate: "2025-07-05",
    dueDate: "2025-07-20",
    status: "Partial",
  },
  {
    id: "INV-003",
    bookingId: "BK-10236",
    customer: "Amit Patel",
    amount: 480000,
    paid: 144000,
    balance: 336000,
    issueDate: "2025-07-08",
    dueDate: "2025-07-25",
    status: "Unpaid",
  },
];

const statusColor: Record<string, string> = {
  Paid: "bg-emerald-500/15 text-emerald-600",
  Partial: "bg-amber-500/15 text-amber-600",
  Unpaid: "bg-red-500/15 text-red-600",
};

// Safe number formatter that won't cause hydration issues
function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const totalBalance = invoices.reduce((sum, inv) => sum + inv.balance, 0);

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
            Invoices
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and track all invoices
          </p>
        </div>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-1" /> Create Invoice
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Invoiced</p>
            <p className="text-2xl font-bold">
              ₹{formatNumber(totalAmount)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Received</p>
            <p className="text-2xl font-bold text-emerald-600">
              ₹{formatNumber(totalPaid)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Outstanding</p>
            <p className="text-2xl font-bold text-amber-600">
              ₹{formatNumber(totalBalance)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Invoices</CardTitle>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer or invoice ID..."
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
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-xs font-semibold text-primary">
                      {invoice.id}
                    </TableCell>
                    <TableCell>{invoice.bookingId}</TableCell>
                    <TableCell className="font-medium">
                      {invoice.customer}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{formatNumber(invoice.amount)}
                    </TableCell>
                    <TableCell className="text-emerald-600">
                      ₹{formatNumber(invoice.paid)}
                    </TableCell>
                    <TableCell className="text-amber-600">
                      ₹{formatNumber(invoice.balance)}
                    </TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs rounded-full ${statusColor[invoice.status]}`}
                      >
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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