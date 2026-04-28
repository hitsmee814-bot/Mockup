"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Users,
} from "lucide-react";

type ChangeType = "up" | "down" | "neutral";

type CardItem = {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: any;
  color: string;
  bg: string;
  gradient: string;
};

const cards: CardItem[] = [
  {
    title: "Total Bookings",
    value: "156",
    change: "+12 this month",
    changeType: "up",
    icon: Calendar,
    color: "text-primary",
    bg: "bg-primary/10",
    gradient: "from-primary/5 to-transparent",
  },
  {
    title: "Total Commission",
    value: "₹4.56L",
    change: "+18.2%",
    changeType: "up",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    gradient: "from-emerald-500/5 to-transparent",
  },
  {
    title: "Wallet Balance",
    value: "₹1.25L",
    change: "Available for withdrawal",
    changeType: "neutral",
    icon: Wallet,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    gradient: "from-violet-500/5 to-transparent",
  },
  {
    title: "Active Clients",
    value: "89",
    change: "+8 this month",
    changeType: "up",
    icon: Users,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    gradient: "from-amber-500/5 to-transparent",
  },
  {
    title: "Pending Payouts",
    value: "₹89K",
    change: "Due this week",
    changeType: "neutral",
    icon: DollarSign,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    gradient: "from-rose-500/5 to-transparent",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

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
};

export function AgentSummaryCards() {
  return (
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
  );
}