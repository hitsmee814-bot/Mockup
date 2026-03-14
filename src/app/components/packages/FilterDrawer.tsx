"use client"

import { useState, useEffect } from "react"
import { X, Users, MapPin, Calendar, DollarSign, Star, Tag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"

interface FilterDrawerProps {
  open: boolean
  onClose: () => void
}

const DESTINATIONS = ["Bali", "Switzerland", "Dubai", "Thailand", "Paris", "India", "UAE", "France"]
const CATEGORIES = ["International", "Domestic", "Honeymoon", "Adventure", "Luxury", "Budget", "Family", "Solo", "Bachelors", "Womens Only", "Weekend", "Pilgrimage"]
const DURATIONS = ["1-3 Days", "4-5 Days", "6-7 Days", "8+ Days"]
const RATINGS = [4, 4.5, 4.8]

const pill = (active: boolean) =>
  active
    ? { background: "#3FB8FF", color: "#fff", borderColor: "#3FB8FF" }
    : { background: "#f9fafb", color: "#6b7280", borderColor: "#e5e7eb" }

export function FilterDrawer({ open, onClose }: FilterDrawerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [people, setPeople] = useState(2)
  const [budget, setBudget] = useState(250000)
  const [selectedDest, setSelectedDest] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)

  useEffect(() => {
    if (!open) return
    setPeople(Number(searchParams.get("people") ?? 2))
    setBudget(Number(searchParams.get("budget") ?? 250000))
    setSelectedDest(searchParams.get("dest"))
    setSelectedDuration(searchParams.get("duration"))
    setSelectedCategories(searchParams.get("categories")?.split(",").filter(Boolean) ?? [])
    setMinRating(searchParams.get("rating") ? Number(searchParams.get("rating")) : null)
  }, [open])

  function toggleCategory(cat: string) {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  function reset() {
    setPeople(2); setBudget(250000); setSelectedDest(null)
    setSelectedDuration(null); setSelectedCategories([]); setMinRating(null)
  }

  function apply() {
    const params = new URLSearchParams(searchParams.toString())
    if (people !== 2) params.set("people", String(people)); else params.delete("people")
    if (budget !== 250000) params.set("budget", String(budget)); else params.delete("budget")
    if (selectedDest) params.set("dest", selectedDest); else params.delete("dest")
    if (selectedDuration) params.set("duration", selectedDuration); else params.delete("duration")
    if (selectedCategories.length) params.set("categories", selectedCategories.join(",")); else params.delete("categories")
    if (minRating) params.set("rating", String(minRating)); else params.delete("rating")
    router.push(`/itinerary/packages?${params.toString()}`)
    onClose()
  }

  function resetAndApply() {
    reset()
    const params = new URLSearchParams(searchParams.toString())
    ;["people", "budget", "dest", "duration", "categories", "rating"].forEach(k => params.delete(k))
    router.push(`/itinerary/packages?${params.toString()}`)
    onClose()
  }

  const labelClass = "flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3"
  const pillClass = "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer"

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white border-l border-gray-100 z-50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <h2 className="font-extrabold text-base text-gray-800">Advanced Filters</h2>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-500">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-7">

              <div>
                <label className={labelClass}><Users className="size-3.5" style={{ color: "#3FB8FF" }} /> Number of People</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setPeople(p => Math.max(1, p - 1))}
                    className="size-8 rounded-full border border-gray-200 flex items-center justify-center text-lg font-bold hover:bg-gray-50 cursor-pointer transition-colors text-gray-600">−</button>
                  <span className="text-2xl font-extrabold w-8 text-center text-gray-800">{people}</span>
                  <button onClick={() => setPeople(p => Math.min(20, p + 1))}
                    className="size-8 rounded-full border border-gray-200 flex items-center justify-center text-lg font-bold hover:bg-gray-50 cursor-pointer transition-colors text-gray-600">+</button>
                  <span className="text-xs text-gray-400 ml-1">person{people > 1 ? "s" : ""}</span>
                </div>
              </div>

              <div>
                <label className={labelClass}><DollarSign className="size-3.5" style={{ color: "#3FB8FF" }} /> Max Budget</label>
                <input type="range" min={5000} max={250000} step={5000} value={budget}
                  onChange={e => setBudget(Number(e.target.value))} className="w-full" style={{ accentColor: "#3FB8FF" }} />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹5,000</span>
                  <span className="font-bold" style={{ color: "#3FB8FF" }}>₹{budget.toLocaleString()}</span>
                  <span>₹2,50,000</span>
                </div>
              </div>

              <div>
                <label className={labelClass}><MapPin className="size-3.5" style={{ color: "#3FB8FF" }} /> Destination</label>
                <div className="flex flex-wrap gap-2">
                  {DESTINATIONS.map(d => (
                    <button key={d} onClick={() => setSelectedDest(prev => prev === d ? null : d)}
                      className={pillClass} style={pill(selectedDest === d)}>{d}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}><Calendar className="size-3.5" style={{ color: "#3FB8FF" }} /> Duration</label>
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map(d => (
                    <button key={d} onClick={() => setSelectedDuration(prev => prev === d ? null : d)}
                      className={pillClass} style={pill(selectedDuration === d)}>{d}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}><Tag className="size-3.5" style={{ color: "#3FB8FF" }} /> Trip Type</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => toggleCategory(cat)}
                      className={pillClass} style={pill(selectedCategories.includes(cat))}>{cat}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}><Star className="size-3.5" style={{ color: "#3FB8FF" }} /> Minimum Rating</label>
                <div className="flex gap-2">
                  {RATINGS.map(r => (
                    <button key={r} onClick={() => setMinRating(prev => prev === r ? null : r)}
                      className={`flex items-center gap-1 ${pillClass}`} style={pill(minRating === r)}>
                      <Star className="size-3" style={{ fill: minRating === r ? "#fff" : "#FBAB18", color: minRating === r ? "#fff" : "#FBAB18" }} /> {r}+
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 flex gap-3 shrink-0">
              <button onClick={resetAndApply}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                Reset All
              </button>
              <button onClick={apply}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
                style={{ background: "#3FB8FF" }}>
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
