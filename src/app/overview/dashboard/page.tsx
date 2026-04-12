"use client"

import { motion } from "framer-motion"
import { SummaryCards, UpcomingTrips, CommissionBreakdown, RecentActivity, PerformanceChart, QuickStats } from "@/app/components/dashboard"

export default function DashboardPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Welcome back — here&apos;s your overview for today.</p>
      </motion.div>

      <SummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <PerformanceChart />
        </div>
        <RecentActivity />
      </div>

      <UpcomingTrips />
      <CommissionBreakdown />
      <QuickStats />
    </div>
  )
}
