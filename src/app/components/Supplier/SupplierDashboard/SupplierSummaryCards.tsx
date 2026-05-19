"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
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
   const router = useRouter()
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
          setError("Unable to load dashboard data. Login token was not found.")
           toast.error("Session expired. Please login again.",{
        position: "top-right",
         duration: 3000,})
       localStorage.removeItem("access_token");
       localStorage.removeItem("refresh_token");

      router.push("/login");

  return;
        }

        const response: any = await kpiService.getKpis(token)

      console.log("KPI API response:", response)

      const data = response?.data ?? response

      setKpiData({
        total_bids: Number(data?.total_bids ?? 0),
        active_requests: Number(data?.active_requests ?? 0),
        won_bids: Number(data?.won_bids ?? 0),
        revenue: Number(data?.revenue ?? 0),
        bid_success_rate: Number(data?.bid_success_rate ?? 0),
      })

        // const data = await kpiService.getKpis(token)
        
        // setKpiData(data)
      } catch (err: any) {
         
        console.error("KPI API error:", err)
        setError(err?.message || "Unable to load dashboard data. Please try again later.")
      } finally {
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
        : `₹${kpiData?.revenue ?? 0}`,
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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4"
      >
        {cards.map((c) => (
          <motion.div
            key={c.title}
            variants={item}
            whileHover={{
              y: -4,
              transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
          >
            <Card
              className={`relative overflow-hidden py-4 gap-3 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br ${c.gradient}`}
            >
              <div className="absolute inset-0 border rounded-xl border-border/50" />

              <CardContent className="relative flex items-start justify-between">
                <div className="space-y-1.5">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                    {c.title}
                  </p>

                  <motion.p
                    className="text-2xl sm:text-3xl font-bold tracking-tight"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.3,
                    }}
                  >
                    {c.value}
                  </motion.p>

                  <div className="flex items-center gap-1 text-xs">
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
                      className={
                        c.changeType === "up"
                          ? "text-emerald-500 font-semibold"
                          : c.changeType === "down"
                          ? "text-red-500 font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {c.change}
                    </span>
                  </div>
                </div>

                <motion.div
                  className={`${c.bg} ${c.color} p-2.5 sm:p-3 rounded-xl`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <c.icon className="h-5 w-5" />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}