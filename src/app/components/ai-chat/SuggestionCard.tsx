"use client"

import { Suggestion } from "./types"
import { motion } from "framer-motion"
import { MapPin, Calendar, Wallet, Package, Star } from "lucide-react"

const typeConfig = {
  package: { icon: Package, accent: "#3FB8FF", label: "Package" },
  location: { icon: MapPin, accent: "#22c55e", label: "Destination" },
  date: { icon: Calendar, accent: "#8b5cf6", label: "Date" },
  budget: { icon: Wallet, accent: "#FBAB18", label: "Budget" },
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
      className="group text-left w-full rounded-2xl border border-border overflow-hidden bg-card cursor-pointer transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      {suggestion.image ? (
        <div className="relative h-36 overflow-hidden">
          <img
            src={suggestion.image}
            alt={suggestion.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span
            className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full text-white backdrop-blur-sm border border-white/10"
            style={{ background: config.accent + "CC" }}
          >
            {config.label}
          </span>
          {suggestion.meta?.discount && (
            <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/90 text-white backdrop-blur-sm">
              {suggestion.meta.discount}
            </span>
          )}
          {suggestion.meta?.rating && (
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 text-[10px] font-bold text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Star className="size-2.5 fill-secondary text-secondary" />
              {suggestion.meta.rating}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 pt-4">
          <span
            className="size-8 rounded-xl flex items-center justify-center"
            style={{ background: config.accent + "18" }}
          >
            <Icon className="size-4" style={{ color: config.accent }} />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: config.accent }}>
            {config.label}
          </span>
        </div>
      )}

      <div className="p-3.5 space-y-1.5">
        <p className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
          {suggestion.title}
        </p>
        {suggestion.subtitle && (
          <p className="text-[11px] text-muted-foreground">{suggestion.subtitle}</p>
        )}
        {suggestion.meta && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1.5">
            {Object.entries(suggestion.meta)
              .filter(([key]) => key !== "rating" && key !== "discount")
              .map(([key, val]) => (
                <span key={key} className="text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground">{val}</span>
                </span>
              ))}
          </div>
        )}
      </div>
    </motion.button>
  )
}
