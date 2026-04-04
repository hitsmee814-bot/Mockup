"use client"

import { useState, useMemo } from "react"
import { Review } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Search, MessageCircle, X, Filter } from "lucide-react"

interface ReviewsSectionProps {
  reviews: Review[]
  rating: number
  totalReviews: number
}

export function ReviewsSection({ reviews, rating, totalReviews }: ReviewsSectionProps) {
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [activeStar, setActiveStar] = useState<number | null>(null)

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>()
    reviews.forEach(r => r.tags?.forEach(t => set.add(t)))
    return Array.from(set).sort()
  }, [reviews])

  // Star distribution
  const starCounts = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]
    reviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++ })
    return counts
  }, [reviews])

  // Filter reviews
  const filtered = useMemo(() => {
    let result = reviews
    if (activeStar) result = result.filter(r => r.rating === activeStar)
    if (activeTag) result = result.filter(r => r.tags?.includes(activeTag))
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(r =>
        r.comment.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [reviews, activeStar, activeTag, search])

  const hasFilters = !!search || !!activeTag || !!activeStar

  function clearAll() { setSearch(""); setActiveTag(null); setActiveStar(null) }

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <div className="size-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold text-primary leading-none">{rating}</span>
            <div className="flex mt-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className="size-2.5" style={{ fill: s <= Math.round(rating) ? "#FBAB18" : "#e5e7eb", color: s <= Math.round(rating) ? "#FBAB18" : "#e5e7eb" }} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{totalReviews} Reviews</p>
            <p className="text-[11px] text-muted-foreground">{reviews.length} with comments</p>
          </div>
        </div>

        {/* Star distribution */}
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map(s => {
            const count = starCounts[s - 1]
            const pct = reviews.length ? (count / reviews.length) * 100 : 0
            const isActive = activeStar === s
            return (
              <button
                key={s}
                onClick={() => setActiveStar(prev => prev === s ? null : s)}
                className={`flex items-center gap-2 w-full text-left cursor-pointer group ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"} transition-opacity`}
              >
                <span className="text-[10px] font-semibold text-muted-foreground w-3">{s}</span>
                <Star className="size-2.5 fill-secondary text-secondary" />
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-secondary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (5 - s) * 0.08 }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground w-4 text-right">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Search + filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search reviews by keyword, name, or tag..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-muted text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(prev => prev === tag ? null : tag)}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border cursor-pointer transition-all ${
                activeTag === tag
                  ? "bg-primary text-white border-primary"
                  : "bg-muted border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Active filters indicator */}
        {hasFilters && (
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Filter className="size-3" /> Showing {filtered.length} of {reviews.length} reviews
            </p>
            <button onClick={clearAll} className="text-[11px] font-semibold text-primary cursor-pointer hover:underline">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? filtered.map((review, i) => (
            <motion.div
              key={review.name + review.date}
              className="rounded-xl border border-border bg-card p-4 space-y-2.5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              layout
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-full bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{review.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="size-3" style={{ fill: s <= review.rating ? "#FBAB18" : "#e5e7eb", color: s <= review.rating ? "#FBAB18" : "#e5e7eb" }} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{review.comment}</p>
              {review.tags?.length ? (
                <div className="flex flex-wrap gap-1">
                  {review.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(prev => prev === tag ? null : tag)}
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                        activeTag === tag
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : "bg-muted text-muted-foreground border border-transparent hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              ) : null}
            </motion.div>
          )) : (
            <motion.div
              className="text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <MessageCircle className="size-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No reviews match your filters</p>
              <button onClick={clearAll} className="text-xs font-semibold text-primary mt-1 cursor-pointer hover:underline">Clear filters</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
