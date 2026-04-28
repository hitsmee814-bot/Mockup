"use client";

import { motion } from "framer-motion";
import {
  AgentEnquiryStats,
  AgentEnquiryTable,
  AgentRaiseEnquiry,
} from "@/app/components/Agent/AgentEnquiry";

export default function AgentEnquiriesPage() {
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
            Enquiries
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track and manage all customer enquiries
          </p>
        </div>
        <AgentRaiseEnquiry />
      </motion.div>

      <AgentEnquiryStats />
      <AgentEnquiryTable />
    </div>
  );
}