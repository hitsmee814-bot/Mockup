"use client"

import { useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

import { toast } from "sonner"
import {
  MessageSquarePlus,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Minus,
} from "lucide-react"

import {
  SupplierEnquiryCount,
  type SupplierEnquiryCountItem,
} from "@/services/SupplierPortalServices/SupplierEnquiryCount"

type ChangeType = "up" | "neutral"

type EnquirySummary = {
  total: number
  newOpen: number
  converted: number
  closedLost: number
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

export function EnquiryStats() {
   const router = useRouter()
    const [summary, setSummary] = useState<EnquirySummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEnquiryCounts = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem("access_token") || ""

        if (!token) {
          setError("Unable to load enquiry statistics. Login token was not found.")
         
        toast.error("Session expired. Please login again.",{
        position: "top-right",
         duration: 3000,})
       localStorage.removeItem("access_token");
       localStorage.removeItem("refresh_token");

      router.push("/login");

  return;
        }

        const response: any = await SupplierEnquiryCount.getEnquiryCount(token)

        console.log("Enquiry Count API response:", response)

         
        const data: SupplierEnquiryCountItem[] = Array.isArray(response)
          ? response
          : response?.data ?? []

        const getCount = (status: string) => {
          return Number(data.find((item) => item.status === status)?.cnt ?? 0)
        }

        const total = data.reduce(
          (sum, item) => sum + Number(item.cnt ?? 0),
          0
        )

        setSummary({
          total,
          newOpen: getCount("NEW") + getCount("IN_PROGRESS")+
           getCount("FOLLOWUP") +
            getCount("QUOTED"),
          converted: getCount("CONVERTED"),
          closedLost: getCount("CLOSED"),
        })
      } catch (err: any) {
        console.error("Enquiry count API error:", err)
        setError(
          err?.message ||
            "Unable to load enquiry statistics. Please try again later."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiryCounts()
  }, [])

  const getValue = (value: number | undefined) => {
    if (loading) return "..."
    if (error) return "-"
    return String(value ?? 0)
  }

  const stats = [
    {
      label: "Total Enquiries",
      value: getValue(summary?.total),
      change: error ? "Data unavailable" : "Total received",
      changeType: "neutral" as ChangeType,
      icon: MessageSquarePlus,
      color: "text-primary",
      bg: "bg-primary/10",
      gradient: "from-primary/5 to-transparent",
    },
    {
      label: "New / Open",
      value: getValue(summary?.newOpen),
      change: error ? "Data unavailable" : "NEW + IN_PROGRESS+ FOLLOWUP + QUOTED",
      changeType: "neutral" as ChangeType,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      gradient: "from-amber-500/5 to-transparent",
    },
    {
      label: "Converted",
      value: getValue(summary?.converted),
      change: error ? "Data unavailable" : "Converted enquiries",
      changeType: error ? "neutral" as ChangeType : "up" as ChangeType,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500/5 to-transparent",
    },
    {
      label: "Closed",
      value: getValue(summary?.closedLost),
      change: error ? "Data unavailable" : "Closed enquiries",
      changeType: "neutral" as ChangeType,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      gradient: "from-red-500/5 to-transparent",
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
        className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={item}
            whileHover={{
              y: -4,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
              },
            }}
          >
            <Card
              className={`relative overflow-hidden py-4 gap-3 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br ${s.gradient}`}
            >
              <div className="absolute inset-0 border rounded-xl border-border/50" />

              <CardContent className="relative flex items-start justify-between">
                <div className="space-y-1.5">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                    {s.label}
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
                    {s.value}
                  </motion.p>

                  <div className="flex items-center gap-1 text-xs">
                    {s.changeType === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Minus className="h-3 w-3 text-muted-foreground" />
                    )}

                    <span
                      className={
                        s.changeType === "up"
                          ? "text-emerald-500 font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {s.change}
                    </span>
                  </div>
                </div>

                <motion.div
                  className={`${s.bg} ${s.color} p-2.5 sm:p-3 rounded-xl`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <s.icon className="h-5 w-5" />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}