"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Search, ChevronDown, Hotel, MapPin, CalendarIcon, Users, Check, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { DateRange } from "react-day-picker"
import { cities } from "./data"

interface HotelCompactSearchBarProps {
  onSearch: (params: { destination: string; checkIn: string; checkOut: string; rooms: number; adults: number; children: number }) => void
}

function CompactDestinationCombobox({ value, onChange, className }: { value: string; onChange: (v: string) => void; className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className={cn("w-full justify-between font-normal", className)}>
          {value ? (
            <span className="flex items-center gap-1.5 truncate"><MapPin className="h-3 w-3 shrink-0" style={{ color: "#3FB8FF" }} />{value}</span>
          ) : (
            <span className="text-muted-foreground">Destination</span>
          )}
          <ChevronDown className="h-3 w-3 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start" style={{ width: "var(--radix-popover-trigger-width)" }}>
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem key={city} value={city} onSelect={() => { onChange(city); setOpen(false) }}>
                  <MapPin className="h-3 w-3 mr-2 text-gray-400" />
                  {city}
                  {value === city && <Check className="ml-auto h-3 w-3" style={{ color: "#3FB8FF" }} />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function CompactGuestSelector({ rooms, adults, children: kids, onRoomsChange, onAdultsChange, onChildrenChange, className }: {
  rooms: number; adults: number; children: number; className?: string
  onRoomsChange: (v: number) => void; onAdultsChange: (v: number) => void; onChildrenChange: (v: number) => void
}) {
  const [open, setOpen] = useState(false)
  const rows = [
    { label: "Rooms", value: rooms, onChange: onRoomsChange, min: 1, max: 8 },
    { label: "Adults", value: adults, onChange: onAdultsChange, min: 1, max: 16 },
    { label: "Children", value: kids, onChange: onChildrenChange, min: 0, max: 8 },
  ]
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-start font-normal", className)}>
          <Users className="mr-1.5 h-3 w-3" style={{ color: "#3FB8FF" }} />
          {rooms}rm · {adults + kids}g
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-xs font-medium">{r.label}</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" disabled={r.value <= r.min} onClick={() => r.onChange(r.value - 1)}><Minus className="h-2.5 w-2.5" /></Button>
                <span className="text-xs font-semibold w-3 text-center">{r.value}</span>
                <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" disabled={r.value >= r.max} onClick={() => r.onChange(r.value + 1)}><Plus className="h-2.5 w-2.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function HotelCompactSearchBar({ onSearch }: HotelCompactSearchBarProps) {
  const [destination, setDestination] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [rooms, setRooms] = useState(1)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [isSticky, setIsSticky] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting), { threshold: 0 })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = () => {
    setMobileExpanded(false)
    onSearch({
      destination,
      checkIn: dateRange?.from?.toISOString().split("T")[0] || "",
      checkOut: dateRange?.to?.toISOString().split("T")[0] || "",
      rooms, adults, children,
    })
  }

  return (
    <>
      <div ref={sentinelRef} className="h-0 w-full" />
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={cn("transition-shadow duration-300", isSticky && "sticky top-0 z-40 py-2 md:py-3 bg-white/80 backdrop-blur-lg shadow-lg")}
      >
        {/* Mobile */}
        <Card className="md:hidden p-0 border border-gray-100 shadow-md bg-white overflow-hidden">
          <button onClick={() => setMobileExpanded(!mobileExpanded)} className="w-full p-3 flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Hotel className="h-4 w-4 shrink-0" style={{ color: "#3FB8FF" }} />
              <span className="text-sm font-medium truncate">{destination || "Search hotels"}</span>
              {(adults + children) > 0 && <span className="text-xs text-muted-foreground shrink-0">· {adults + children} guests</span>}
            </div>
            <motion.div animate={{ rotate: mobileExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            </motion.div>
          </button>
          <AnimatePresence>
            {mobileExpanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="overflow-hidden">
                <div className="px-3 pb-3 space-y-2 border-t pt-3">
                  <CompactDestinationCombobox value={destination} onChange={setDestination} className="h-9 text-xs" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full h-9 justify-start font-normal text-xs">
                        <CalendarIcon className="mr-1.5 h-3 w-3" />
                        {dateRange?.from && dateRange?.to ? `${dateRange.from.toLocaleDateString()} – ${dateRange.to.toLocaleDateString()}` : "Select dates"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={1} initialFocus disabled={{ before: new Date() }} />
                    </PopoverContent>
                  </Popover>
                  <CompactGuestSelector rooms={rooms} adults={adults} children={children} onRoomsChange={setRooms} onAdultsChange={setAdults} onChildrenChange={setChildren} className="h-9 text-xs" />
                  <Button className="w-full h-9 text-sm gap-2 text-white" style={{ background: "#3FB8FF" }} onClick={handleSubmit}>
                    <Search className="h-3.5 w-3.5" /> Search
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Desktop */}
        <Card className="hidden md:block p-4 border border-gray-100 shadow-md bg-white">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <CompactDestinationCombobox value={destination} onChange={setDestination} className="h-10 text-sm" />
            </div>
            <div className="flex-[1.5]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-10 justify-start font-normal text-sm">
                    <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                    {dateRange?.from && dateRange?.to ? `${dateRange.from.toLocaleDateString()} – ${dateRange.to.toLocaleDateString()}` : "Select dates"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} initialFocus disabled={{ before: new Date() }} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <CompactGuestSelector rooms={rooms} adults={adults} children={children} onRoomsChange={setRooms} onAdultsChange={setAdults} onChildrenChange={setChildren} className="h-10 text-sm" />
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
