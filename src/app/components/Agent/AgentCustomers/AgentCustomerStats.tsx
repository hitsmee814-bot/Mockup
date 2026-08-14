"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserPlus, Calendar } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

const statsData: StatCardProps[] = [
  {
    title: "Total Customers",
    value: 128,
    icon: <Users className="h-5 w-5 text-primary" />,
    change: "+12 this month",
  },
  {
    title: "Active Customers",
    value: 95,
    icon: <UserCheck className="h-5 w-5 text-emerald-500" />,
    change: "74% of total",
  },
  {
    title: "New Customers",
    value: 18,
    icon: <UserPlus className="h-5 w-5 text-violet-500" />,
    change: "This month",
  },
  {
    title: "Total Bookings",
    value: 245,
    icon: <Calendar className="h-5 w-5 text-amber-500" />,
    change: "From all customers",
  },
];

function StatCard({ title, value, icon, change }: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
    >
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6 relative">
          <div className="absolute -top-1 -right-1">
            <div className="p-1.5 rounded-lg bg-muted/30">{icon}</div>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {change && (
              <p className="text-xs text-muted-foreground">{change}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function AgentCustomerStats() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
    >
      {statsData.map((stat, index) => (
        <motion.div key={index} variants={item}>
          <StatCard {...stat} />
        </motion.div>
      ))}
    </motion.div>
  );
}