"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Plane, ChevronDown, SlidersHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { defaultFilters, FilterState } from "./types"
import { dummyFlights } from "./flight-data"
import { filterFlights } from "./filter-utils"
import { FilterContent } from "./filter-content"
import { FlightCard, FlightCardSkeleton } from "./flight-card"
import { DateCarousel } from "./date-carousel"

export function FlightResults() {
  const [loading, setLoading] = useState(true)
  const [dateOffset, setDateOffset] = useState(0)
  const [filters, setFilters] = useState<FilterState>({ ...defaultFilters })
  const [expandedFlight, setExpandedFlight] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState(0)
  const [direction, setDirection] = useState(1)

  const filteredFlights = filterFlights(dummyFlights, filters)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-3 md:space-y-4">
      <DateCarousel
        dateOffset={dateOffset}
        setDateOffset={setDateOffset}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        direction={direction}
        setDirection={setDirection}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{filteredFlights.length} flights found</p>
        <div className="flex items-center gap-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 md:hidden">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filter Flights</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-6 overflow-y-auto max-h-[60vh]">
                <FilterContent filters={filters} setFilters={setFilters} />
              </div>
            </DrawerContent>
          </Drawer>
          <Button variant="outline" size="sm" className="gap-1">Sort by: Best <ChevronDown className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="hidden md:block"
        >
          <Card className="w-72 p-5 max-h-[calc(100vh-8rem)] overflow-y-auto border border-gray-100 shadow-md bg-white sticky top-4">
            <FilterContent filters={filters} setFilters={setFilters} />
          </Card>
        </motion.div>

        <div className="flex-1 space-y-3 md:space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <FlightCardSkeleton />
              </motion.div>
            ))
          ) : filteredFlights.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-gray-400">
              <Plane className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No flights match your filters</p>
              <p className="text-sm mt-1">Try adjusting your filters to see more results</p>
            </motion.div>
          ) : filteredFlights.map((flight, i) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              index={i}
              expandedFlight={expandedFlight}
              setExpandedFlight={setExpandedFlight}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
