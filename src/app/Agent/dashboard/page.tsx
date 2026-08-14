"use client";

import { motion } from "framer-motion";
import {
  AgentSummaryCards,
  AgentUpcomingTravel,
  AgentCommissionBreakdown,
  AgentRecentActivity,
  AgentWalletBalance,
  AgentNewBooking,
} from "@/app/components/Agent/AgentDashboard";

export default function AgentDashboardPage() {
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
            Agent Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back — here&apos;s your business overview for today.
          </p>
        </div>
        <AgentNewBooking />
      </motion.div>

      <AgentSummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <AgentUpcomingTravel />
        </div>
        <div className="xl:row-span-2">
          <AgentWalletBalance />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-3">
          <AgentRecentActivity />
        </div>
      </div>

      <AgentCommissionBreakdown />
    </div>
  );
}