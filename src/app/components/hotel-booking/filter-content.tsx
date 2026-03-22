"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ChevronDown, Star } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { HotelFilterState, defaultHotelFilters } from "./types"

const filterSectionVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      type: "spring" as const,
      stiffness: 200,
      damping: 24,
    },
  }),
}

function FilterSection({ title, index, children }: { title: string; index: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <motion.div custom={index} variants={filterSectionVariants} initial="hidden" animate="show">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full group">
        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="overflow-hidden">
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function HotelFilterContent({ filters, setFilters }: { filters: HotelFilterState; setFilters: React.Dispatch<React.SetStateAction<HotelFilterState>> }) {
  const toggleFilter = (key: keyof HotelFilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] as string[]
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] }
    })
  }

  const activeCount = Object.entries(filters).reduce((count, [key, val]) => {
    if (key === "priceRange") return count + (val[0] !== 0 || val[1] !== 1000 ? 1 : 0)
    if (key === "freeCancellation" || key === "breakfastIncluded") return count + (val ? 1 : 0)
    if (key === "sortBy") return count
    return count + (Array.isArray(val) ? val.length : 0)
  }, 0)

  const clearAll = () => setFilters({ ...defaultHotelFilters })

  let idx = 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg text-gray-800">Filters</h3>
          <AnimatePresence>
            {activeCount > 0 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Badge className="text-[10px] px-1.5 py-0">{activeCount}</Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {activeCount > 0 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive" onClick={clearAll}>Clear All</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Separator />

      {/* Quick Toggles */}
      <FilterSection title="Quick Filters" index={idx++}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm cursor-pointer">Free Cancellation</Label>
            <Switch checked={filters.freeCancellation} onCheckedChange={(v) => setFilters((p) => ({ ...p, freeCancellation: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm cursor-pointer">Breakfast Included</Label>
            <Switch checked={filters.breakfastIncluded} onCheckedChange={(v) => setFilters((p) => ({ ...p, breakfastIncluded: v }))} />
          </div>
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Price per Night" index={idx++}>
        <Slider value={filters.priceRange} onValueChange={(v) => setFilters((p) => ({ ...p, priceRange: v }))} max={1000} step={25} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${filters.priceRange[0]}</span><span>${filters.priceRange[1]}+</span>
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Star Rating" index={idx++}>
        <div className="flex flex-wrap gap-2">
          {["5", "4", "3", "2"].map((s) => {
            const active = filters.starRating.includes(s)
            return (
              <Button key={s} variant={active ? "default" : "outline"} size="sm" className="text-xs h-8 gap-1 transition-all" onClick={() => toggleFilter("starRating", s)}>
                {s} <Star className="h-3 w-3" style={active ? { fill: "white", color: "white" } : { fill: "#FBAB18", color: "#FBAB18" }} />
              </Button>
            )
          })}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Guest Rating" index={idx++}>
        <div className="space-y-2.5">
          {[
            { label: "Exceptional", value: "9+", range: "9.0+" },
            { label: "Excellent", value: "8+", range: "8.0+" },
            { label: "Very Good", value: "7+", range: "7.0+" },
            { label: "Good", value: "6+", range: "6.0+" },
          ].map((r) => (
            <div key={r.value} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`gr-${r.value}`} checked={filters.guestRating.includes(r.value)} onCheckedChange={() => toggleFilter("guestRating", r.value)} />
                <Label htmlFor={`gr-${r.value}`} className="text-sm cursor-pointer">{r.label}</Label>
              </div>
              <span className="text-xs text-muted-foreground">{r.range}</span>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Property Type" index={idx++}>
        <div className="space-y-2.5">
          {["Hotel", "Resort", "Boutique", "Apartment", "Villa", "Hostel"].map((t) => (
            <div key={t} className="flex items-center space-x-2">
              <Checkbox id={`pt-${t}`} checked={filters.propertyType.includes(t)} onCheckedChange={() => toggleFilter("propertyType", t)} />
              <Label htmlFor={`pt-${t}`} className="text-sm cursor-pointer">{t}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Amenities" index={idx++}>
        <div className="space-y-2.5">
          {["Pool", "Spa", "Gym", "Wi-Fi", "Restaurant", "Bar", "Room Service", "Parking", "Pet Friendly", "Beach Access", "Business Center", "Laundry"].map((a) => (
            <div key={a} className="flex items-center space-x-2">
              <Checkbox id={`am-${a}`} checked={filters.amenities.includes(a)} onCheckedChange={() => toggleFilter("amenities", a)} />
              <Label htmlFor={`am-${a}`} className="text-sm cursor-pointer">{a}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Neighborhood" index={idx++}>
        <div className="space-y-2.5">
          {["Downtown", "Midtown", "Waterfront", "SoHo", "Upper West Side", "Chelsea", "East Village", "DUMBO"].map((n) => (
            <div key={n} className="flex items-center space-x-2">
              <Checkbox id={`nb-${n}`} checked={filters.neighborhoods.includes(n)} onCheckedChange={() => toggleFilter("neighborhoods", n)} />
              <Label htmlFor={`nb-${n}`} className="text-sm cursor-pointer">{n}</Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <AnimatePresence>
        {activeCount > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            <Separator className="mb-4" />
            <Button variant="destructive" size="sm" className="w-full" onClick={clearAll}>Clear All Filters ({activeCount})</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
