"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { motion, Variants } from "framer-motion"
import { DateRange } from "react-day-picker"
import { Search, MapPin, CalendarIcon, Users, Check, Minus, Plus, TrendingUp, ChevronsUpDown } from "lucide-react"
import { cities, popularDestinations } from "./data"

interface HotelSearchFormProps {
  onSearch: (params: { destination: string; checkIn: string; checkOut: string; rooms: number; adults: number; children: number }) => void
}

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  }),
}

function DestinationCombobox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="hover:text-white">
        <Button variant="outline" role="combobox" className="w-full h-11 justify-between font-normal">
          {value ? (
            <span className="flex items-center gap-2">
                {/* <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "#3FB8FF" }} /> */}
                {value}</span>
          ) : (
            <span>Where are you going?</span>
          )}
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start" style={{ width: "var(--radix-popover-trigger-width)" }}>
        <Command>
          <CommandInput placeholder="Search destination..." />
          <CommandList>
            <CommandEmpty>No destination found.</CommandEmpty>
            <CommandGroup >
              {cities.map((city) => (
                <CommandItem key={city} value={city} onSelect={() => { onChange(city); setOpen(false) }} className="group">
                  {/* <MapPin className="h-3.5 w-3.5 mr-2 text-gray-400 group-hover:text-white transition-colors" /> */}
                  {city}
                  {value === city && <Check className="ml-auto h-3.5 w-3.5" style={{ color: "#3FB8FF" }} />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function GuestSelector({ rooms, adults, children: kids, onRoomsChange, onAdultsChange, onChildrenChange }: {
  rooms: number; adults: number; children: number
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
        <Button variant="outline" className="w-full h-11 justify-start font-normal">
          <Users className="mr-2 h-3.5 w-3.5" style={{ color: "#3FB8FF" }} />
          {rooms} room · {adults + kids} guest{adults + kids > 1 ? "s" : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start">
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-sm font-medium">{r.label}</span>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" disabled={r.value <= r.min} onClick={() => r.onChange(r.value - 1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-semibold w-4 text-center">{r.value}</span>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" disabled={r.value >= r.max} onClick={() => r.onChange(r.value + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function HotelSearchForm({ onSearch }: HotelSearchFormProps) {
  const [destination, setDestination] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [rooms, setRooms] = useState(1)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const handleSubmit = () => {
    onSearch({
      destination,
      checkIn: dateRange?.from?.toISOString().split("T")[0] || "",
      checkOut: dateRange?.to?.toISOString().split("T")[0] || "",
      rooms, adults, children,
    })
  }

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="max-w-7xl mx-auto"
      >
        <Card className="p-5 md:p-8 border border-gray-100 shadow-lg bg-white">
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            {[
              { idx: 0, label: "Destination", flex: "flex-[1.3]", content: <DestinationCombobox value={destination} onChange={setDestination} /> },
              { idx: 1, label: "Check-in / Check-out", flex: "flex-[1.5]", content: (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-11 justify-start font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to
                          ? `${dateRange.from.toLocaleDateString()} – ${dateRange.to.toLocaleDateString()}`
                          : dateRange.from.toLocaleDateString()
                      ) : "Select dates"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} initialFocus disabled={{ before: new Date() }} />
                  </PopoverContent>
                </Popover>
              )},
              { idx: 2, label: "Guests & Rooms", content: (
                <GuestSelector rooms={rooms} adults={adults} children={children} onRoomsChange={setRooms} onAdultsChange={setAdults} onChildrenChange={setChildren} />
              )},
            ].map((field) => (
              <motion.div key={field.idx} custom={field.idx} variants={fieldVariants} initial="hidden" animate="show" className={`${field.flex || "flex-1"} min-w-0`}>
                <Label className="text-sm font-medium mb-2 block">{field.label}</Label>
                {field.content}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Button className="w-full h-12 font-semibold text-base gap-2 shadow-md hover:shadow-lg transition-shadow text-white" style={{ background: "#3FB8FF" }} onClick={handleSubmit}>
              <Search className="h-4 w-4" /> Search Hotels
            </Button>
          </motion.div>
        </Card>
      </motion.div>

      {/* Popular Destinations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4" style={{ color: "#3FB8FF" }} />
          <h3 className="font-bold text-lg text-gray-800">Popular Destinations</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {popularDestinations.map((dest, i) => (
            <motion.div key={dest.city} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.05 }}>
              <Card
                className="p-4 border border-gray-100 hover:border-[#3FB8FF]/30 hover:shadow-md transition-all cursor-pointer bg-white group text-center"
                onClick={() => setDestination(dest.city)}
              >
                <motion.span className="text-3xl block mb-2" whileHover={{ scale: 1.15 }}>{dest.image}</motion.span>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#3FB8FF] transition-colors">{dest.city}</p>
                <p className="text-xs text-gray-400">{dest.country}</p>
                <p className="text-xs font-medium mt-1" style={{ color: "#3FB8FF" }}>from ${dest.startingPrice}/night</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
