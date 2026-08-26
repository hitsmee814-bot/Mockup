"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

import {
  DollarSign,
  TrendingUp,
  Target,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react"

import { kpiService } from "@/services/SupplierPortalServices/SupplierDashboardKPI"
type ChangeType = "up" | "down" | "neutral"

type KPIResponse = {
  total_bids: number
  active_requests: number
  won_bids: number
  revenue: number
  bid_success_rate: number
}

type CardItem = {
  title: string
  value: string
  change: string
  changeType: ChangeType
  icon: any
  color: string
  bg: string
  gradient: string
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
} as const

export function SupplierSummaryCards() {
  
  const [kpiData, setKpiData] = useState<KPIResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem("access_token") || ""

       if (!token) {
          return
        }

        const response: any = await kpiService.getKpis(token)

      

      const data = response?.data ?? response
      if (
        !data ||
        typeof data !== "object" ||
        !("total_bids" in data) ||
        !("active_requests" in data) ||
        !("won_bids" in data) ||
        !("revenue" in data) ||
        !("bid_success_rate" in data)
      ) {
        setError("Unable to load dashboard data. Please try again later.")
        return
      }

      const numericFields = [
      data.total_bids,
      data.active_requests,
      data.won_bids,
      data.revenue,
      data.bid_success_rate,
    ]

    const hasInvalidNumber = numericFields.some(
      (value) => typeof value !== "number" || !Number.isFinite(value)
    )

    if (hasInvalidNumber) {
      setError("Unable to load dashboard data. Please try again later.")
      return
    }
const hasInvalidKpiValue =
  data.total_bids < 0 ||
  data.active_requests < 0 ||
  data.won_bids < 0 ||
  data.revenue < 0

if (hasInvalidKpiValue) {
  setError("Unable to load dashboard data. Please try again later.")
  return
}

    const bidSuccessRate = Number(data.bid_success_rate)

if (bidSuccessRate < 0 || bidSuccessRate > 100) {
  setError("Unable to load dashboard data. Please try again later.")
  return
}
      setKpiData({
        total_bids: Number(data?.total_bids ?? 0),
        active_requests: Number(data?.active_requests ?? 0),
        won_bids: Number(data?.won_bids ?? 0),
        revenue: Number(data?.revenue ?? 0),
        bid_success_rate: Number(data?.bid_success_rate ?? 0),
      })

        // const data = await kpiService.getKpis(token)
        
        // setKpiData(data)
      } catch (err: unknown) {
  console.error("KPI API error:", err)

  const message = err instanceof Error ? err.message : ""

  if (
    message === "Session expired. Please login again." ||
    message === "Your session has expired. Please login again."
  ) {
    window.dispatchEvent(new Event("session-expired"))
    return
  }

  setError("Unable to load dashboard data. Please try again later.")
}finally {
              setLoading(false)
            }
          }

          fetchKpis()
        
        }, [])

  const getValue = (value: number | undefined) => {
    if (loading) return "..."
    if (error) return "-"
    return String(value ?? 0)
  }

  const cards: CardItem[] = [
    {
      title: "Total Bids Placed",
      value: getValue(kpiData?.total_bids),
      change: error ? "Data unavailable" : "Total bids",
      changeType: "neutral",
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
      gradient: "from-primary/5 to-transparent",
    },
    {
      title: "Active Requests",
      value: getValue(kpiData?.active_requests),
      change: error ? "Data unavailable" : "Currently active",
      changeType: "neutral",
      icon: Target,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500/5 to-transparent",
    },
    {
      title: "Won Bids",
      value: getValue(kpiData?.won_bids),
      change: error ? "Data unavailable" : "Successful bids",
      changeType: error ? "neutral" : "up",
      icon: Trophy,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      gradient: "from-violet-500/5 to-transparent",
    },
    {
      title: "Revenue Earned",
      value: loading
        ? "..."
        : error
        ? "-"
      : `₹${Number(kpiData?.revenue ?? 0).toLocaleString("en-IN")}`,
      change: error ? "Data unavailable" : "Total revenue",
      changeType: error ? "neutral" : "up",
      icon: DollarSign,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      gradient: "from-amber-500/5 to-transparent",
    },
    {
      title: "Bid Success Rate",
      value: loading
        ? "..."
        : error
        ? "-"
        : `${kpiData?.bid_success_rate ?? 0}%`,
      change: error ? "Data unavailable" : "Win percentage",
      changeType: "neutral",
      icon: TrendingUp,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      gradient: "from-blue-500/5 to-transparent",
    },
  ]

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 items-stretch">
        {cards.map((c) => (
        <div key={c.title} className="h-full">
           <Card
            className={`relative h-full overflow-hidden py-4 gap-3 border-0 shadow-sm bg-gradient-to-br ${c.gradient}`}
          >
              <div className="absolute inset-0 border rounded-xl border-border/50" />
               <div
                   className={`absolute top-4 right-4 ${c.bg} ${c.color} p-1.5 rounded-xl`}
                >
                <c.icon className="h-4 w-4" />
              </div>
             <CardContent className="relative">
                <div className="flex flex-col h-full pr-12">
  {/* Title */}
  <div className="min-h-[40px]">
    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium leading-6">
      {c.title}
    </p>
  </div>

  {/* Value */}
  <div className="min-h-[48px] flex items-center">
    <p className="text-2xl sm:text-3xl font-bold tracking-tight">
      {c.value}
    </p>
  </div>

  {/* Footer */}
  <div className="mt-auto flex items-center gap-1 text-xs">
    {c.changeType === "up" && (
      <ArrowUpRight className="h-3 w-3 text-emerald-500" />
    )}

    {c.changeType === "down" && (
      <ArrowDownRight className="h-3 w-3 text-red-500" />
    )}

    {c.changeType === "neutral" && (
      <Minus className="h-3 w-3 text-muted-foreground" />
    )}

    <span
      className={`${
        c.changeType === "up"
          ? "text-emerald-500 font-semibold"
          : c.changeType === "down"
          ? "text-red-500 font-semibold"
          : "text-muted-foreground"
      } whitespace-nowrap`}
    >
      {c.change}
    </span>
  </div>
</div>

               
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}