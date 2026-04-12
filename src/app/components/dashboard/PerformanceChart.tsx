"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Bar } from "recharts"
import { performanceData } from "./data"
import { BarChart3 } from "lucide-react"

export function PerformanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <Card className="h-full">
        <CardHeader className="flex-row items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base sm:text-lg">Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} width={45} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} width={30} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                formatter={(value: number, name: string) => [name === "revenue" ? `₹${(value / 1000).toFixed(0)}k` : value, name === "revenue" ? "Revenue" : "Bookings"]}
              />
              <Bar yAxisId="left" dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} opacity={0.8} />
              <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="var(--secondary)" strokeWidth={2} dot={{ fill: "var(--secondary)", r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
