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
import { Input } from "@/components/ui/input";
import { Search, Plus, UserPlus, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const subAgents = [
  {
    id: "SA-001",
    name: "Ramesh Travels",
    email: "ramesh@travels.com",
    phone: "+91 98765 11111",
    bookings: 45,
    commission: 125000,
    status: "Active",
    joined: "2025-01-15",
  },
  {
    id: "SA-002",
    name: "Suresh Holidays",
    email: "suresh@holidays.com",
    phone: "+91 87654 22222",
    bookings: 32,
    commission: 89000,
    status: "Active",
    joined: "2025-02-20",
  },
  {
    id: "SA-003",
    name: "Mahesh Tours",
    email: "mahesh@tours.com",
    phone: "+91 76543 33333",
    bookings: 18,
    commission: 45000,
    status: "Inactive",
    joined: "2025-03-10",
  },
];

export default function SubAgentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgents = subAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Sub-Agents
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your sub-agents and their performance
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <UserPlus className="h-4 w-4" /> Add Sub-Agent
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Sub-Agents</p>
            <p className="text-2xl font-bold">{subAgents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Sub-Agents</p>
            <p className="text-2xl font-bold text-emerald-600">
              {subAgents.filter((a) => a.status === "Active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Total Commission Paid
            </p>
            <p className="text-2xl font-bold text-primary">
              ₹
              {subAgents
                .reduce((sum, a) => sum + a.commission, 0)
                .toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Sub-Agents</CardTitle>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
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
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-mono text-xs text-primary">
                      {agent.id}
                    </TableCell>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>{agent.bookings}</TableCell>
                    <TableCell className="text-emerald-600">
                      ₹{agent.commission.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          agent.status === "Active" ? "default" : "secondary"
                        }
                        className={
                          agent.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-gray-500"
                        }
                      >
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{agent.joined}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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