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
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { SupplierBidSuccessRateMonthly } from "@/services/SupplierPortalServices/SupplierBidSuccessRateMonthly"

type ChartData = {
  label: string
  value: number
}

export function SupplierBidSuccessRate() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
 const router = useRouter()
  useEffect(() => {
    const fetchBidSuccessRateMonthly = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem("access_token") || ""

        if (!token) {
          const msg = "Unable to load bid success rate. Token not found."
          setError(msg)
           toast.error("Session expired. Please login again.",{
        position: "top-right",
         duration: 3000,})
       localStorage.removeItem("access_token");
       localStorage.removeItem("refresh_token");

      router.push("/login");

  return;
        }

        const res =
          await SupplierBidSuccessRateMonthly.getBidSuccessRateMonthly(token)

         if (!res?.data || !Array.isArray(res.data)) {
          const msg = "Invalid response from server."
          setError(msg)
          return
        }

        const formattedData: ChartData[] = res.data.map((item: any) => ({
        label: item.label,
        value: Number(item.round ?? 0),
      }))

      setData(formattedData)
      } catch (err: any) {
        console.error("Bid success monthly API error:", err)

        const msg =
          err?.message ||
          "Unable to load bid success rate. Please try again later."

        setError(msg)
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