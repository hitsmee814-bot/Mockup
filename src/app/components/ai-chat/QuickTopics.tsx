"use client"

import { motion } from "framer-motion"
import { Cloud, Calendar, Wallet, MapPin, Plane, Heart, Mountain, Utensils } from "lucide-react"

const topics = [
  { label: "Weather", value: "What's the best weather for travel?", icon: Cloud, color: "#3FB8FF" },
  { label: "Best Time", value: "When is the best time to travel?", icon: Calendar, color: "#8b5cf6" },
  { label: "Budget", value: "set budget", icon: Wallet, color: "#FBAB18" },
  { label: "Locations", value: "suggest destination", icon: MapPin, color: "#22c55e" },
  { label: "Flights", value: "international trip", icon: Plane, color: "#ef4444" },
  { label: "Honeymoon", value: "honeymoon", icon: Heart, color: "#ec4899" },
  { label: "Adventure", value: "mountain trip", icon: Mountain, color: "#f97316" },
  { label: "Food & Stay", value: "What about food and hotels?", icon: Utensils, color: "#14b8a6" },
]

interface QuickTopicsProps {
  onSelect: (value: string) => void
}

export function QuickTopics({ onSelect }: QuickTopicsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((t, i) => {
        const Icon = t.icon
        return (
          <motion.button
            key={t.label}
            onClick={() => onSelect(t.value)}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-2 rounded-xl border cursor-pointer transition-all hover:shadow-sm"
            style={{ background: t.color + "0A", color: t.color, borderColor: t.color + "25" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.05, background: t.color + "15" }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="size-3.5" />
            {t.label}
          </motion.button>
        )
      })}
    </div>
  )
}
