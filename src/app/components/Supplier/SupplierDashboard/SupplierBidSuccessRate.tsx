"use client"

import { useEffect, useState } from "react"
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
  Line,Legend,
} from "recharts"
import { Target } from "lucide-react"


import { SupplierBidSuccessRateMonthly } from "@/services/SupplierPortalServices/SupplierBidSuccessRateMonthly"

type ChartData = {
  label: string
  value: number
}

export function SupplierBidSuccessRate() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
 
  useEffect(() => {
    const fetchBidSuccessRateMonthly = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem("access_token") || ""

        if (!token) {
            return
          }

        const res =
          await SupplierBidSuccessRateMonthly.getBidSuccessRateMonthly(token)

       if (!res?.data || !Array.isArray(res.data)) {
        setError("Unable to load bid success rate. Please try again later.")
        return
      }

      const hasInvalidRow = res.data.some(
      (item: any) =>
        typeof item?.label !== "string" ||
        !item.label ||
        typeof item?.value !== "number" ||
        !Number.isFinite(item.value) ||
        item.value < 0 ||
        item.value > 100
    )

      if (hasInvalidRow) {
        setError("Unable to load bid success rate. Please try again later.")
        return
      }
      const formattedData: ChartData[] = res.data.map((item: any) => ({
        label: item.label,
        value: Number(item.value ?? 0),
      }))

      setData(formattedData)
          } catch (err: unknown) {
  console.error("Bid success monthly API error:", err)

  const message = err instanceof Error ? err.message : ""

  if (
    message === "Session expired. Please login again." ||
    message === "Your session has expired. Please login again."
  ) {
    window.dispatchEvent(new Event("session-expired"))
    return
  }

  setError("Unable to load bid success rate. Please try again later.")
}
         finally {
        setLoading(false)
      }
    }

    fetchBidSuccessRateMonthly()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <Card className="h-full overflow-hidden">
        <CardHeader className="flex items-center gap-3 px-6 pt-3 pb-4 border-b -mt-3">
        <Target className="h-5 w-5 text-primary" />
        <CardTitle className="text-2xl font-bold">
          Bid Success Rate
        </CardTitle>
      </CardHeader>
        <CardContent className="pt-2">
          {loading && (
            <p className="text-sm text-muted-foreground">
              Loading bid success rate...
            </p>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && data.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No bid success rate data available.
            </p>
          )}

          {!loading && !error && data.length > 0 && (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />

                <XAxis
                  dataKey="label"
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
                   label={{
                value: "Success Rate",
                angle: -90,
                position: "insideLeft",
                style: {
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                },
              }}
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
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Success Rate"
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
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}