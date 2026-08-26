"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Bar,Legend,
} from "recharts"
import { BarChart3 } from "lucide-react"

import {
  monthlyPerformanceService,
  type MonthlyPerformanceItem,
} from "@/services/SupplierPortalServices/SupplierMonthlyPerformance"

type ChartData = MonthlyPerformanceItem & {
  bookings: number
}

const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function SupplierPerformanceChart() {
  
  const [performanceData, setPerformanceData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMonthlyPerformance = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem("access_token") || ""

        if (!token) {
            return
          }

        const currentYear = new Date().getFullYear()

        const response = await monthlyPerformanceService.getMonthlyPerformance(
          currentYear,
          token
        )

        if (!response?.data || !Array.isArray(response.data)) {
         setError("Unable to load monthly performance. Please try again later.")
          return
        }

        const hasInvalidRow = response.data.some(
  (item: any) =>
    typeof item?.month !== "string" ||
    !monthOrder.includes(item.month) ||
    typeof item?.revenue !== "number" ||
    !Number.isFinite(item.revenue) ||
    item.revenue < 0 ||
    typeof item?.orders !== "number" ||
    !Number.isFinite(item.orders) ||
    item.orders < 0 ||
    !Number.isInteger(item.orders)
)

      if (hasInvalidRow) {
        setError("Unable to load monthly performance. Please try again later.")
        return
      }
        const sortedData: ChartData[] = [...response.data]
          .sort(
            (a, b) =>
              monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
          )
          .map((item) => ({
            ...item,
            bookings: item.orders,
          }))

        setPerformanceData(sortedData)
      } catch (err: unknown) {
  console.error("Monthly performance API error:", err)

  const message = err instanceof Error ? err.message : ""

  if (
    message === "Session expired. Please login again." ||
    message === "Your session has expired. Please login again."
  ) {
    window.dispatchEvent(new Event("session-expired"))
    return
  }

  setError("Unable to load monthly performance. Please try again later.")
}finally {
        setLoading(false)
      }
    }

    fetchMonthlyPerformance()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <Card className="overflow-hidden">

    <CardHeader className="flex items-center gap-3 px-6 pt-3 pb-4 border-b -mt-3">
      <BarChart3 className="h-5 w-5 text-primary" />
      <CardTitle className="text-2xl font-bold">
        Monthly Performance
      </CardTitle>
    </CardHeader>


        <CardContent className="pt-2">
           
          {loading && (
            <p className="text-sm text-muted-foreground">
              Loading monthly performance...
            </p>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && performanceData.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No monthly performance data available for the current year.
            </p>
          )}

          {!loading && !error && performanceData.length > 0 && (
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />

                <YAxis
                  yAxisId="left"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  tickFormatter={(v) => `${v / 1000}k`}
                   width={45}
                     // axis label
                  label={{
                    value: "Revenue",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 11, fill: "var(--muted-foreground)" },
                  }}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  width={30}
                    // axis label
                  label={{
                  value: "Orders",
                  angle: 90,
                  position: "insideRight",
                  style: { fontSize: 11, fill: "var(--muted-foreground)" },
                }}
                />

                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                 formatter={(value, name, item) => {
                  if (item.dataKey === "revenue") {
                    return [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"];
                  }

                  return [value, "Orders"];
                }}
                />
                <Legend />

                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  name="Revenue"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="var(--secondary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--secondary)", r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}