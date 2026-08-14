"use client";

import { motion } from "framer-motion";
import {
  AgentCustomerStats,
  AgentCustomerTable,
  AgentAddCustomer,
} from "@/app/components/Agent/AgentCustomers";

export default function AgentCustomersPage() {
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
            Customers
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage all your customers and their details
          </p>
        </div>
        <AgentAddCustomer />
      </motion.div>

      <AgentCustomerStats />
      <AgentCustomerTable />
    </div>
  );
}