"use client"

import { Suggestion } from "./types"
import { motion } from "framer-motion"
import { MapPin, Calendar, Wallet, Package } from "lucide-react"

const typeConfig = {
  package: { icon: Package, accent: "#3FB8FF" },
  location: { icon: MapPin, accent: "#22c55e" },
  date: { icon: Calendar, accent: "#8b5cf6" },
  budget: { icon: Wallet, accent: "#FBAB18" },
}

interface SuggestionCardProps {
  suggestion: Suggestion
  onSelect: (suggestion: Suggestion) => void
  index: number
}

export function SuggestionCard({ suggestion, onSelect, index }: SuggestionCardProps) {
  const config = typeConfig[suggestion.type]
  const Icon = config.icon

  return (
    <motion.button
      onClick={() => onSelect(suggestion)}
      className="text-left w-full rounded-2xl border border-gray-100 overflow-hidden bg-white cursor-pointer transition-shadow hover:shadow-md"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {suggestion.image && (
        <div className="relative h-28 bg-gray-100 overflow-hidden">
          <img
            src={suggestion.image}
            alt={suggestion.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span
            className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white capitalize"
            style={{ background: config.accent }}
          >
            {suggestion.type}
          </span>
        </div>
      )}
      <div className="p-3 space-y-1.5">
        {!suggestion.image && (
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="size-6 rounded-full flex items-center justify-center"
              style={{ background: config.accent + "18" }}
            >
              <Icon className="size-3" style={{ color: config.accent }} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: config.accent }}>
              {suggestion.type}
            </span>
          </div>
        )}
        <p className="text-sm font-bold text-gray-800 leading-tight">{suggestion.title}</p>
        {suggestion.subtitle && (
          <p className="text-[11px] text-gray-400">{suggestion.subtitle}</p>
        )}
        {suggestion.meta && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
            {Object.entries(suggestion.meta).map(([key, val]) => (
              <span key={key} className="text-[10px] text-gray-500">
                <span className="font-semibold text-gray-700">{val}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  )
}
