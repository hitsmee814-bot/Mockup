"use client"

import { Suggestion, QuickReply } from "./types"
import { SuggestionCard } from "./SuggestionCard"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Compass, Lightbulb, ArrowRight } from "lucide-react"
import type { SuggestionGroup } from "./ChatWindow"

const travelTips = [
  { title: "Book 6-8 weeks early", desc: "Flights are cheapest when booked well in advance. Set price alerts for the best deals.", image: "https://picsum.photos/seed/tip1/600/300" },
  { title: "Travel on Tuesdays", desc: "Mid-week flights and hotels are significantly cheaper than weekend bookings.", image: "https://picsum.photos/seed/tip2/600/300" },
  { title: "Pack a power bank", desc: "Stay connected on long travel days. A 20,000mAh bank covers most devices twice.", image: "https://picsum.photos/seed/tip3/600/300" },
]

const trendingDestinations = [
  { name: "Bali, Indonesia", tag: "Beaches & Temples", image: "https://picsum.photos/seed/bali-hero/600/400", stat: "4.8★ · 12K+ trips" },
  { name: "Swiss Alps", tag: "Adventure & Snow", image: "https://picsum.photos/seed/swiss-hero/600/400", stat: "4.9★ · 8K+ trips" },
  { name: "Dubai, UAE", tag: "Luxury & Shopping", image: "https://picsum.photos/seed/dubai-hero/600/400", stat: "4.7★ · 15K+ trips" },
  { name: "Kyoto, Japan", tag: "Culture & History", image: "https://picsum.photos/seed/kyoto-hero/600/400", stat: "4.9★ · 6K+ trips" },
]

interface ContextPanelProps {
  groups: SuggestionGroup[]
  activeReplies: QuickReply[]
  onTopicSelect: (value: string) => void
  onQuickReply: (value: string) => void
  onSuggestionSelect: (suggestion: Suggestion) => void
}

export function ContextPanel({
  groups,
  activeReplies,
  onTopicSelect,
  onQuickReply,
  onSuggestionSelect,
}: ContextPanelProps) {
  const hasGroups = groups.length > 0

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="shrink-0 px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Compass className="size-5 text-primary" />
            Explore & Discover
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">AI-curated suggestions that evolve with your conversation</p>
        </div>
        {hasGroups && (
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {groups.length} {groups.length === 1 ? "result" : "results"}
          </span>
        )}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-6 py-5 space-y-8">

          {/* Active quick replies */}
          {activeReplies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ArrowRight className="size-3 text-secondary" /> Suggested Next
              </p>
              <div className="flex flex-wrap gap-2">
                {activeReplies.map((r, i) => (
                  <motion.button
                    key={r.value}
                    onClick={() => onQuickReply(r.value)}
                    className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-primary/20 bg-primary/5 text-primary cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {r.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Dynamic suggestion groups from chat */}
          <AnimatePresence mode="popLayout">
            {[...groups].reverse().map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold text-foreground">{group.label}</p>
                    <p className="text-[11px] text-muted-foreground">Based on: &ldquo;{group.query}&rdquo;</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {group.suggestions.length} found
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {group.suggestions.map((s, i) => (
                    <SuggestionCard
                      key={`${group.id}-${s.id}`}
                      suggestion={s}
                      onSelect={onSuggestionSelect}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Trending Destinations — shown when no groups yet */}
          {!hasGroups && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <TrendingUp className="size-3 text-chart-4" /> Trending Now
              </p>
              <div className="grid grid-cols-1 gap-3">
                {trendingDestinations.map((dest, i) => (
                  <motion.button
                    key={dest.name}
                    onClick={() => onTopicSelect(dest.name.split(",")[0].toLowerCase())}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer text-left"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative h-40">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold text-white/90 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                          {dest.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-bold text-base">{dest.name}</p>
                        <p className="text-white/60 text-[11px] mt-0.5">{dest.stat}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Travel Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Lightbulb className="size-3 text-secondary" /> Travel Tips
            </p>
            <div className="grid grid-cols-1 gap-3">
              {travelTips.map((tip, i) => (
                <motion.div
                  key={tip.title}
                  className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                >
                  <div className="h-28 overflow-hidden">
                    <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3.5">
                    <p className="text-sm font-bold text-foreground">{tip.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{tip.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
