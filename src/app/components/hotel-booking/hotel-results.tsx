"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hotel as HotelIcon, SlidersHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { defaultHotelFilters, HotelFilterState } from "./types"
import { hotels } from "./data"
import { HotelFilterContent } from "./filter-content"
import { HotelCard, HotelCardSkeleton } from "./hotel-card"

function filterHotels(hotelList: typeof hotels, filters: HotelFilterState) {
  return hotelList.filter((h) => {
    if (h.pricePerNight < filters.priceRange[0] || h.pricePerNight > filters.priceRange[1]) return false
    if (filters.starRating.length > 0 && !filters.starRating.includes(h.stars.toString())) return false
    if (filters.freeCancellation && !h.freeCancellation) return false
    if (filters.breakfastIncluded && !h.breakfastIncluded) return false
    if (filters.amenities.length > 0 && !filters.amenities.every((a) => h.amenities.includes(a))) return false
    return true
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low": return a.pricePerNight - b.pricePerNight
      case "price-high": return b.pricePerNight - a.pricePerNight
      case "rating": return b.rating - a.rating
      case "reviews": return b.reviews - a.reviews
      default: return b.rating * b.reviews - a.rating * a.reviews
    }
  })
}

export function HotelResults() {
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<HotelFilterState>({ ...defaultHotelFilters })

  const filteredHotels = filterHotels(hotels, filters)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{filteredHotels.length} hotels found</p>
        <div className="flex items-center gap-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 md:hidden">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader><DrawerTitle>Filter Hotels</DrawerTitle></DrawerHeader>
              <div className="px-4 pb-6 overflow-y-auto max-h-[60vh]">
                <HotelFilterContent filters={filters} setFilters={setFilters} />
              </div>
            </DrawerContent>
          </Drawer>
          <Select value={filters.sortBy} onValueChange={(v) => setFilters((p) => ({ ...p, sortBy: v }))}>
            <SelectTrigger className="w-[160px] h-9 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="hidden md:block"
        >
          <Card className="w-72 p-5 max-h-[calc(100vh-8rem)] overflow-y-auto border border-gray-100 shadow-md bg-white sticky top-4">
            <HotelFilterContent filters={filters} setFilters={setFilters} />
          </Card>
        </motion.div>

        <div className="flex-1 space-y-3 md:space-y-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <HotelCardSkeleton />
              </motion.div>
            ))
          ) : filteredHotels.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-gray-400">
              <HotelIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No hotels match your filters</p>
              <p className="text-sm mt-1">Try adjusting your filters to see more results</p>
            </motion.div>
          ) : filteredHotels.map((hotel, i) => (
            <HotelCard key={hotel.id} hotel={hotel} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
