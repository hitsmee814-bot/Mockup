"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { commissionData } from "./data"
import { Coins } from "lucide-react"

const colors = [
  "from-primary/80 to-primary/40",
  "from-emerald-500/80 to-emerald-500/40",
  "from-violet-500/80 to-violet-500/40",
  "from-amber-500/80 to-amber-500/40",
  "from-pink-500/80 to-pink-500/40",
  "from-blue-500/80 to-blue-500/40",
]

export function CommissionBreakdown() {
  const totalCommission = commissionData.reduce((s, c) => s + c.commission, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <Card>
        <CardHeader className="flex-row items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-secondary/10">
              <Coins className="h-4 w-4 text-secondary" />
            </div>
            <CardTitle className="text-base sm:text-lg">Commission Breakdown</CardTitle>
          </div>
          <span className="text-sm font-bold text-emerald-500">Total: ₹{totalCommission.toLocaleString("en-IN")}</span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {commissionData.map((c, i) => {
              const pct = (c.commission / totalCommission) * 100
              return (
                <motion.div
                  key={c.category}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.06 }}
                  whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                  className="rounded-xl border p-4 hover:shadow-md transition-shadow space-y-3 cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{c.category}</p>
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{c.rate}</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold">₹{c.commission.toLocaleString("en-IN")}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{c.bookings} bookings · ₹{(c.revenue / 100000).toFixed(1)}L revenue</p>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${colors[i % colors.length]}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
