"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Dummy data for customers
const dummyCustomers = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    company: "Sharma Travels",
    createdAt: "2025-06-15",
    status: "Active",
    bookings: 12,
  },
  {
    id: 2,
    name: "Priya Mehta",
    phone: "+91 87654 32109",
    email: "priya.mehta@example.com",
    company: "Mehta Enterprises",
    createdAt: "2025-06-18",
    status: "Active",
    bookings: 8,
  },
  {
    id: 3,
    name: "Amit Patel",
    phone: "+91 76543 21098",
    email: "amit.patel@example.com",
    company: "Patel Corp",
    createdAt: "2025-06-20",
    status: "Inactive",
    bookings: 3,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    phone: "+91 65432 10987",
    email: "sneha.reddy@example.com",
    company: "Reddy Group",
    createdAt: "2025-06-22",
    status: "Active",
    bookings: 15,
  },
  {
    id: 5,
    name: "Vikram Singh",
    phone: "+91 54321 09876",
    email: "vikram.singh@example.com",
    company: "Singh Solutions",
    createdAt: "2025-06-25",
    status: "Active",
    bookings: 6,
  },
  {
    id: 6,
    name: "Ananya Desai",
    phone: "+91 43210 98765",
    email: "ananya.desai@example.com",
    company: "Desai & Co",
    createdAt: "2025-06-28",
    status: "Active",
    bookings: 9,
  },
  {
    id: 7,
    name: "Ravi Kumar",
    phone: "+91 32109 87654",
    email: "ravi.kumar@example.com",
    company: "Kumar Agencies",
    createdAt: "2025-07-01",
    status: "Inactive",
    bookings: 2,
  },
  {
    id: 8,
    name: "Neha Gupta",
    phone: "+91 21098 76543",
    email: "neha.gupta@example.com",
    company: "Gupta Travels",
    createdAt: "2025-07-03",
    status: "Active",
    bookings: 11,
  },
];

const statusColor: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-600",
  Inactive: "bg-gray-500/15 text-gray-600",
};

export function AgentCustomerTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState(dummyCustomers);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const handleDelete = () => {
    if (deleteId !== null) {
      setCustomers(customers.filter((c) => c.id !== deleteId));
      toast.success("Customer deleted successfully!");
      setDeleteId(null);
    }
  };

  const handleView = (id: number) => {
    toast.info(`Viewing customer #${id} details...`);
  };

  const handleEdit = (id: number) => {
    toast.info(`Editing customer #${id}...`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>All Customers</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
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
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Company</TableHead>
                  <TableHead className="hidden lg:table-cell">Created At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No customers found. Add your first customer!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <motion.tr
                      key={customer.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.04,
                      }}
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-mono text-xs font-semibold text-primary">
                        #{customer.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {customer.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {customer.phone}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {customer.email}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {customer.company}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {new Date(customer.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-0.5 text-xs rounded-full ${statusColor[customer.status]}`}
                        >
                          {customer.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(customer.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(customer.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4 text-amber-500" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setDeleteId(customer.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Customer?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {customer.name}
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  onClick={() => setDeleteId(null)}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDelete}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}