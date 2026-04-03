"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { FilterState, defaultFilters } from "./types"


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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FilterContent({ filters, setFilters }: { filters: FilterState; setFilters: React.Dispatch<React.SetStateAction<FilterState>> }) {
  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] as string[]
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] }
    })
  }

  const activeCount = Object.entries(filters).reduce((count, [key, val]) => {
    if (key === "priceRange") return count + (val[0] !== 0 || val[1] !== 2000 ? 1 : 0)
    if (key === "durationRange") return count + (val[0] !== 0 || val[1] !== 24 ? 1 : 0)
    if (key === "layoverDuration") return count + (val[0] !== 0 || val[1] !== 12 ? 1 : 0)
    return count + (Array.isArray(val) ? val.length : 0)
  }, 0)

  const clearAll = () => setFilters({ ...defaultFilters })

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

      <FilterSection title="Price Range" index={idx++}>
        <Slider value={filters.priceRange} onValueChange={(v) => setFilters((p) => ({ ...p, priceRange: v }))} max={2000} step={50} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${filters.priceRange[0]}</span><span>${filters.priceRange[1]}</span>
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Trip Duration" index={idx++}>
        <Slider value={filters.durationRange} onValueChange={(v) => setFilters((p) => ({ ...p, durationRange: v }))} max={24} step={1} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{filters.durationRange[0]}h</span><span>{filters.durationRange[1]}h</span>
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Stops" index={idx++}>
        <div className="space-y-2.5">
          {["Non-stop", "1 Stop", "2+ Stops"].map((stop) => (
            <div key={stop} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`${stop}-f`} checked={filters.stops.includes(stop)} onCheckedChange={() => toggleFilter("stops", stop)} />
                <Label htmlFor={`${stop}-f`} className="text-sm cursor-pointer font-medium">{stop}</Label>
              </div>
              <span className="text-xs text-muted-foreground">from $650</span>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Departure Time" index={idx++}>
        <div className="grid grid-cols-2 gap-2">
          {["Morning|6AM-12PM", "Afternoon|12PM-6PM", "Evening|6PM-12AM", "Night|12AM-6AM"].map((t) => {
            const [label, range] = t.split("|")
            const active = filters.departureTimes.includes(label)
            return (
              <Button key={t} variant={active ? "default" : "outline"} size="sm"
                className={cn("h-auto py-2 text-xs transition-all", !active && "hover:bg-primary/5 hover:border-primary/30")}
              >
                <span className="flex flex-col"><span>{label}</span><span className="text-[10px] opacity-70">{range}</span></span>
              </Button>
            )
          })}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Arrival Time" index={idx++}>
        <div className="grid grid-cols-2 gap-2">
          {["Morning|6AM-12PM", "Afternoon|12PM-6PM", "Evening|6PM-12AM", "Night|12AM-6AM"].map((t) => {
            const [label, range] = t.split("|")
            const active = filters.arrivalTimes.includes(label)
            return (
              <Button key={t} variant={active ? "default" : "outline"} size="sm"
                className={cn("h-auto py-2 text-xs transition-all", !active && "hover:bg-primary/5 hover:border-primary/30")}
                onClick={() => toggleFilter("arrivalTimes", label)}
              >
                <span className="flex flex-col"><span>{label}</span><span className="text-[10px] opacity-70">{range}</span></span>
              </Button>
            )
          })}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Airlines" index={idx++}>
        <div className="space-y-2.5">
          {["Emirates", "British Airways", "Lufthansa", "Qatar Airways", "Turkish Airlines", "Singapore Airlines", "Etihad Airways", "Air France", "KLM", "Delta Air Lines"].map((airline) => (
            <div key={airline} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={`${airline}-f`} checked={filters.airlines.includes(airline)} onCheckedChange={() => toggleFilter("airlines", airline)} />
                <Label htmlFor={`${airline}-f`} className="text-sm cursor-pointer">{airline}</Label>
              </div>
              <span className="text-xs text-muted-foreground">$650</span>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Alliances" index={idx++}>
        <div className="space-y-2.5">
          {["Star Alliance", "Oneworld", "SkyTeam"].map((a) => (
            <div key={a} className="flex items-center space-x-2">
              <Checkbox id={`${a}-f`} checked={filters.alliances.includes(a)} onCheckedChange={() => toggleFilter("alliances", a)} />
              <Label htmlFor={`${a}-f`} className="text-sm cursor-pointer">{a}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Cabin Class" index={idx++}>
        <div className="grid grid-cols-2 gap-2">
          {["Economy", "Premium Economy", "Business", "First Class"].map((c) => {
            const active = filters.cabinClass.includes(c)
            return (
              <Button key={c} variant={active ? "default" : "outline"} size="sm" className="text-xs h-9 transition-all" onClick={() => toggleFilter("cabinClass", c)}>{c}</Button>
            )
          })}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Amenities" index={idx++}>
        <div className="space-y-2.5">
          {["Wi-Fi", "In-flight Entertainment", "Power Outlets", "Meals Included", "Lie-flat Seats", "USB Charging", "Extra Legroom", "Lounge Access"].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox id={`${amenity}-f`} checked={filters.amenities.includes(amenity)} onCheckedChange={() => toggleFilter("amenities", amenity)} />
              <Label htmlFor={`${amenity}-f`} className="text-sm cursor-pointer">{amenity}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Aircraft Type" index={idx++}>
        <div className="space-y-2.5">
          {["Boeing 777", "Boeing 787 Dreamliner", "Airbus A380", "Airbus A350", "Boeing 737 MAX", "Airbus A321neo"].map((a) => (
            <div key={a} className="flex items-center space-x-2">
              <Checkbox id={`${a}-f`} checked={filters.aircraft.includes(a)} onCheckedChange={() => toggleFilter("aircraft", a)} />
              <Label htmlFor={`${a}-f`} className="text-sm cursor-pointer">{a}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Baggage Allowance" index={idx++}>
        <div className="space-y-2.5">
          {["Carry-on only", "1 checked bag", "2 checked bags", "Extra baggage"].map((b) => (
            <div key={b} className="flex items-center space-x-2">
              <Checkbox id={`${b}-f`} checked={filters.baggage.includes(b)} onCheckedChange={() => toggleFilter("baggage", b)} />
              <Label htmlFor={`${b}-f`} className="text-sm cursor-pointer">{b}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Layover Duration" index={idx++}>
        <Slider value={filters.layoverDuration} onValueChange={(v) => setFilters((p) => ({ ...p, layoverDuration: v }))} max={12} step={0.5} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{filters.layoverDuration[0]}h</span><span>{filters.layoverDuration[1]}h</span>
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Connecting Airports" index={idx++}>
        <div className="space-y-2.5">
          {["LHR - London Heathrow", "FRA - Frankfurt", "IST - Istanbul", "CDG - Paris Charles de Gaulle", "AMS - Amsterdam Schiphol", "DOH - Doha Hamad"].map((a) => (
            <div key={a} className="flex items-center space-x-2">
              <Checkbox id={`${a}-f`} checked={filters.airports.includes(a)} onCheckedChange={() => toggleFilter("airports", a)} />
              <Label htmlFor={`${a}-f`} className="text-sm cursor-pointer text-xs">{a}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Fare Type" index={idx++}>
        <div className="space-y-2.5">
          {["Basic", "Standard", "Flexible", "Premium Flex"].map((f) => (
            <div key={f} className="flex items-center space-x-2">
              <Checkbox id={`${f}-f`} checked={filters.fareType.includes(f)} onCheckedChange={() => toggleFilter("fareType", f)} />
              <Label htmlFor={`${f}-f`} className="text-sm cursor-pointer">{f}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="Booking Options" index={idx++}>
        <div className="space-y-2.5">
          {["Refundable", "Changeable", "Instant Confirmation", "Free Cancellation", "No Change Fee"].map((b) => (
            <div key={b} className="flex items-center space-x-2">
              <Checkbox id={`${b}-f`} checked={filters.booking.includes(b)} onCheckedChange={() => toggleFilter("booking", b)} />
              <Label htmlFor={`${b}-f`} className="text-sm cursor-pointer">{b}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
      <Separator />

      <FilterSection title="CO₂ Emissions" index={idx++}>
        <div className="space-y-2.5">
          {["Low emissions", "Average emissions", "Any emissions"].map((e) => (
            <div key={e} className="flex items-center space-x-2">
              <Checkbox id={`${e}-f`} checked={filters.emissions.includes(e)} onCheckedChange={() => toggleFilter("emissions", e)} />
              <Label htmlFor={`${e}-f`} className="text-sm cursor-pointer">{e}</Label>
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
