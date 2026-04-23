"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Star, Users } from "lucide-react"

const alerts = [
  { label: "3 bookings need follow-up", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "2 visa applications expiring", icon: Clock, color: "text-red-500", bg: "bg-red-500/10" },
  { label: "5 new leads assigned", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Agent rating: 4.8/5", icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
]

const topDestinations = [
  { name: "Bali", bookings: 8 },
  { name: "Dubai", bookings: 6 },
  { name: "Goa", bookings: 12 },
  { name: "Maldives", bookings: 5 },
  { name: "Kerala", bookings: 9 },
]

const maxBookings = Math.max(...topDestinations.map(d => d.bookings))

export function SupplierQuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Action Items & Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.06 }}
                whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                className="flex items-center gap-3 p-2.5 rounded-xl border hover:shadow-sm transition-shadow cursor-default"
              >
                <div className={`p-1.5 rounded-lg ${a.bg}`}>
                  <a.icon className={`h-4 w-4 ${a.color}`} />
                </div>
                <span className="text-sm">{a.label}</span>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.08 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Top Destinations This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topDestinations.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.06 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{d.name}</span>
                  <Badge variant="outline" className="text-[10px]">{d.bookings} bookings</Badge>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/50"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(d.bookings / maxBookings) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
