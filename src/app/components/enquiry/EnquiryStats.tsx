"use client"

import { motion, Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquarePlus, Clock, CheckCircle2, XCircle, ArrowUpRight, Minus } from "lucide-react"
import { enquiries } from "./data"

const stats = [
  { label: "Total Enquiries", value: enquiries.length, change: "+4 this week", changeType: "up" as const, icon: MessageSquarePlus, color: "text-primary", bg: "bg-primary/10", gradient: "from-primary/5 to-transparent" },
  { label: "New / Open", value: enquiries.filter(e => e.status === "New" || e.status === "In Progress").length, change: "2 high priority", changeType: "neutral" as const, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", gradient: "from-amber-500/5 to-transparent" },
  { label: "Converted", value: enquiries.filter(e => e.status === "Converted").length, change: "12.5% rate", changeType: "up" as const, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", gradient: "from-emerald-500/5 to-transparent" },
  { label: "Closed / Lost", value: enquiries.filter(e => e.status === "Closed").length, change: "1 this month", changeType: "neutral" as const, icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", gradient: "from-red-500/5 to-transparent" },
]

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
  return (
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
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 15 } }}
        >
          <Card className={`relative overflow-hidden py-4 gap-3 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br ${s.gradient}`}>
            <div className="absolute inset-0 border rounded-xl border-border/50" />
            <CardContent className="relative flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{s.label}</p>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                >
                  {s.value}
                </motion.p>
                <div className="flex items-center gap-1 text-xs">
                  {s.changeType === "up" ? <ArrowUpRight className="h-3 w-3 text-emerald-500" /> : <Minus className="h-3 w-3 text-muted-foreground" />}
                  <span className={s.changeType === "up" ? "text-emerald-500 font-semibold" : "text-muted-foreground"}>
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
  )
}
