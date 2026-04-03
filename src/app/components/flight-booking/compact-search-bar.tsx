"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AirportCombobox } from "./airport-combobox"
import { ClassCombobox } from "./class-combobox"
import { PassengerSelector } from "./passenger-selector"
import { DatePicker } from "./date-picker"
import { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronDown, Plane } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { airports } from "./constants"

const tripOptions = [
  { value: "roundtrip", label: "Round Trip" },
  { value: "oneway", label: "One Way" },
  { value: "multicity", label: "Multi City" },
]

interface CompactSearchBarProps {
  onSearch: (params: { from: string; to: string; tripType: string; departDate?: string; returnDate?: string; adults: number; children: number; infants: number; class: string }) => void
}

export function CompactSearchBar({ onSearch }: CompactSearchBarProps) {
  const [date, setDate] = useState<DateRange | undefined>()
  const [singleDate, setSingleDate] = useState<Date>()
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [passengersOpen, setPassengersOpen] = useState(false)
  const [classOpen, setClassOpen] = useState(false)
  const [flightClass, setFlightClass] = useState("economy")
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [tripType, setTripType] = useState("roundtrip")
  const [isSticky, setIsSticky] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = () => {
    setMobileExpanded(false)
    onSearch({
      from, to, tripType,
      departDate: tripType === "roundtrip" ? date?.from?.toISOString().split('T')[0] : singleDate?.toISOString().split('T')[0],
      returnDate: tripType === "roundtrip" ? date?.to?.toISOString().split('T')[0] : undefined,
      adults, children, infants, class: flightClass
    })
  }

  const fromLabel = airports.find(a => a.value === from)?.label
  const toLabel = airports.find(a => a.value === to)?.label
  const total = adults + children + infants

  return (
    <>
    <div ref={sentinelRef} className="h-0 w-full" />
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={cn(
        "transition-shadow duration-300",
        isSticky && "sticky top-0 z-40 py-2 md:py-3 bg-white/80 backdrop-blur-lg shadow-lg"
      )}
    >
      {/* Mobile: collapsed summary pill */}
      <Card className="md:hidden p-0 border border-gray-100 shadow-md bg-white overflow-hidden">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full p-3 flex items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Plane className="h-4 w-4 text-primary shrink-0" />
            <span className="text-sm font-medium truncate">
              {fromLabel && toLabel ? `${fromLabel} → ${toLabel}` : "Search flights"}
            </span>
            {total > 0 && (
              <span className="text-xs text-muted-foreground shrink-0">· {total} pax</span>
            )}
          </div>
          <motion.div animate={{ rotate: mobileExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          </motion.div>
        </button>

        <AnimatePresence>
          {mobileExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-3 space-y-2 border-t pt-3">
                <Select value={tripType} onValueChange={setTripType}>
                  <SelectTrigger className="w-full h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {tripOptions.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-2">
                  <AirportCombobox value={from} onChange={setFrom} open={fromOpen} onOpenChange={setFromOpen} placeholder="From" className="h-9 text-xs" />
                  <AirportCombobox value={to} onChange={setTo} open={toOpen} onOpenChange={setToOpen} placeholder="To" className="h-9 text-xs" />
                </div>
                <DatePicker
                  mode={tripType === "roundtrip" ? "range" : "single"}
                  date={singleDate} dateRange={date}
                  onDateChange={setSingleDate} onDateRangeChange={setDate}
                  className="w-full h-9 justify-start text-left font-normal text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <PassengerSelector
                    adults={adults} children={children} infants={infants}
                    onAdultsChange={setAdults} onChildrenChange={setChildren} onInfantsChange={setInfants}
                    open={passengersOpen} onOpenChange={setPassengersOpen}
                    className="w-full h-9 justify-start text-left font-normal text-xs"
                  />
                  <ClassCombobox value={flightClass} onChange={setFlightClass} open={classOpen} onOpenChange={setClassOpen} className="h-9 text-xs" />
                </div>
                <Button className="w-full h-9 text-sm gap-2 text-white" style={{ background: "#3FB8FF" }} onClick={handleSubmit}>
                  <Search className="h-3.5 w-3.5" /> Search
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Desktop: full inline bar */}
      <Card className="hidden md:block p-4 border border-gray-100 shadow-md bg-white">
        <div className="flex gap-3 items-end">
          <div className="flex-[0.7]">
            <Select value={tripType} onValueChange={setTripType}>
              <SelectTrigger className="w-full h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {tripOptions.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <AirportCombobox value={from} onChange={setFrom} open={fromOpen} onOpenChange={setFromOpen} placeholder="From" className="h-10 text-sm" />
          </div>
          <div className="flex-1">
            <AirportCombobox value={to} onChange={setTo} open={toOpen} onOpenChange={setToOpen} placeholder="To" className="h-10 text-sm" />
          </div>
          <div className="flex-[1.5]">
            <DatePicker
              mode={tripType === "roundtrip" ? "range" : "single"}
              date={singleDate} dateRange={date}
              onDateChange={setSingleDate} onDateRangeChange={setDate}
              className="w-full h-10 justify-start text-left font-normal text-sm"
            />
          </div>
          <div className="flex-1">
            <PassengerSelector
              adults={adults} children={children} infants={infants}
              onAdultsChange={setAdults} onChildrenChange={setChildren} onInfantsChange={setInfants}
              open={passengersOpen} onOpenChange={setPassengersOpen}
              className="w-full h-10 justify-start text-left font-normal text-sm"
            />
          </div>
          <div className="flex-1">
            <ClassCombobox value={flightClass} onChange={setFlightClass} open={classOpen} onOpenChange={setClassOpen} className="h-10 text-sm" />
          </div>
          <Button className="h-10 px-6 gap-2 shadow-sm text-white" style={{ background: "#3FB8FF" }} onClick={handleSubmit}>
            <Search className="h-3.5 w-3.5" /> Search
          </Button>
        </div>
      </Card>
    </motion.div>
    </>
  )
}
