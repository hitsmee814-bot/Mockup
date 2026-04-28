"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recentActivity } from "./data";
import {
  Activity,
  CalendarCheck,
  CreditCard,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const typeIcon = {
  booking: CalendarCheck,
  payment: CreditCard,
  enquiry: MessageSquare,
  commission: TrendingUp,
};

const typeColor = {
  booking: "text-emerald-500 bg-emerald-500/10",
  payment: "text-blue-500 bg-blue-500/10",
  enquiry: "text-violet-500 bg-violet-500/10",
  commission: "text-amber-500 bg-amber-500/10",
};

export function AgentRecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.1 }}
    >
      <Card className="h-full">
        <CardHeader className="flex-row items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base sm:text-lg">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentActivity.map((a, i) => {
            const Icon = typeIcon[a.type];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: i * 0.06,
                }}
                whileHover={{
                  x: 4,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/60 transition-colors cursor-default"
              >
                <div className={`p-2 rounded-lg shrink-0 ${typeColor[a.type]}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.customer}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 pt-0.5">
                  {a.time}
                </span>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}