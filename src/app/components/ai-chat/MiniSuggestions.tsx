"use client"

import { Suggestion } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { Star, X, ChevronUp } from "lucide-react"
import type { SuggestionGroup } from "./ChatWindow"

interface MiniSuggestionsProps {
  group: SuggestionGroup | null
  onSelect: (s: Suggestion) => void
  onExpand: () => void
  onDismiss: () => void
}

export function MiniSuggestions({ group, onSelect, onExpand, onDismiss }: MiniSuggestionsProps) {
  if (!group) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="shrink-0 border-t border-border bg-muted/50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 pt-2 pb-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider truncate">
            {group.label}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onExpand}
              className="text-[10px] font-semibold text-primary flex items-center gap-0.5 cursor-pointer hover:underline"
            >
              View all <ChevronUp className="size-2.5" />
            </button>
            <button
              onClick={onDismiss}
              className="p-0.5 rounded text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll cards */}
        <div className="flex gap-2 px-3 pb-2 overflow-x-auto no-scrollbar">
          {group.suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className="shrink-0 w-36 sm:w-44 rounded-xl border border-border bg-card overflow-hidden cursor-pointer text-left hover:border-primary/30 transition-colors"
            >
              {s.image && (
                <div className="relative h-20 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {s.meta?.rating && (
                    <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 text-[9px] font-bold text-white bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                      <Star className="size-2 fill-secondary text-secondary" />
                      {s.meta.rating}
                    </div>
                  )}
                </div>
              )}
              <div className="p-2">
                <p className="text-[11px] font-bold text-foreground leading-tight line-clamp-1">{s.title}</p>
                {s.subtitle && (
                  <p className="text-[9px] text-muted-foreground mt-0.5 line-clamp-1">{s.subtitle}</p>
                )}
                {s.meta?.price && (
                  <p className="text-[10px] font-bold text-primary mt-1">{s.meta.price}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
