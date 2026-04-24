"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Target } from "lucide-react"

const bidSuccessData = [
  { month: "Jan", rate: 45 },
  { month: "Feb", rate: 52 },
  { month: "Mar", rate: 48 },
  { month: "Apr", rate: 61 },
  { month: "May", rate: 58 },
  { month: "Jun", rate: 67 },
]

export function SupplierBidSuccessRate() {
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
            <Target className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base sm:text-lg">
            Bid Success Rate
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={bidSuccessData}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 12,
                }}
              />

              <YAxis
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                }}
                tickFormatter={(value) => `${value}%`}
                width={40}
              />

              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(value) => [`${value}%`, "Success Rate"]}
              />

              <Line
                type="monotone"
                dataKey="rate"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{
                  fill: "var(--primary)",
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}