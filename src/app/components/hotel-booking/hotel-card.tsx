"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Wifi, UtensilsCrossed, Dumbbell, Waves, Heart, Shield, Coffee } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useRouter } from "next/navigation"
import { Hotel } from "./types"

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.07,
      type: "spring" as const,
      stiffness: 180,
      damping: 22,
    },
  }),
}

const amenityIcons: Record<string, React.ElementType> = {
  "Pool": Waves, "Spa": Heart, "Gym": Dumbbell, "Wi-Fi": Wifi,
  "Restaurant": UtensilsCrossed, "Bar": Coffee, "Room Service": UtensilsCrossed,
}

export function HotelCard({ hotel, index }: { hotel: Hotel; index: number }) {
  const router = useRouter()
  const discount = Math.round((1 - hotel.pricePerNight / hotel.originalPrice) * 100)

  return (
    <motion.div custom={index} variants={cardVariants} initial="hidden" animate="show" whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Image area */}
          <div className="relative md:w-64 lg:w-72 shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6 md:p-8">
            <motion.span className="text-6xl md:text-7xl" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: index * 0.07 + 0.1, type: "spring" }}>
              {hotel.image}
            </motion.span>
            {hotel.badge && (
              <Badge className="absolute top-3 left-3 text-[10px] text-white shadow-sm" style={{ background: "#3FB8FF" }}>{hotel.badge}</Badge>
            )}
            {discount > 0 && (
              <Badge className="absolute top-3 right-3 text-[10px] bg-red-500 text-white shadow-sm">-{discount}%</Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 md:p-5 flex flex-col">
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-gray-800 truncate">{hotel.name}</h3>
                    <div className="flex shrink-0">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star key={i} className="h-3 w-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0" /> {hotel.location}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: hotel.rating >= 4.5 ? "#3FB8FF" : hotel.rating >= 4 ? "#22c55e" : "#FBAB18" }}>
                      {hotel.rating}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{hotel.reviews.toLocaleString()} reviews</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {hotel.highlights.slice(0, 3).map((h) => (
                  <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">{h}</span>
                ))}
              </div>

              {/* Amenities */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {hotel.amenities.slice(0, 5).map((a) => {
                  const Icon = amenityIcons[a] || Wifi
                  return (
                    <span key={a} className="flex items-center gap-1 text-xs text-gray-400">
                      <Icon className="h-3 w-3" /> {a}
                    </span>
                  )
                })}
                {hotel.amenities.length > 5 && (
                  <span className="text-xs text-gray-400">+{hotel.amenities.length - 5} more</span>
                )}
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {hotel.freeCancellation && (
                  <Badge variant="outline" className="text-[10px] gap-0.5 px-1.5 py-0" style={{ borderColor: "#3FB8FF40", color: "#3FB8FF" }}>
                    <Shield className="h-2.5 w-2.5" /> Free Cancellation
                  </Badge>
                )}
                {hotel.breakfastIncluded && (
                  <Badge variant="outline" className="text-[10px] gap-0.5 px-1.5 py-0 border-green-200 text-green-600">
                    <Coffee className="h-2.5 w-2.5" /> Breakfast Included
                  </Badge>
                )}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-50">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold" style={{ color: "#3FB8FF" }}>${hotel.pricePerNight}</span>
                  {hotel.originalPrice > hotel.pricePerNight && (
                    <span className="text-sm text-gray-400 line-through">${hotel.originalPrice}</span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400">per night · taxes included</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hidden sm:flex text-xs" onClick={() => router.push(`/hotel/${hotel.id}`)}>View Details</Button>
                <Button size="sm" className="text-xs text-white shadow-sm" style={{ background: "#3FB8FF" }} onClick={() => router.push(`/hotel/${hotel.id}`)}>Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export function HotelCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 lg:w-72 shrink-0 bg-gray-50 p-8 flex items-center justify-center">
          <Skeleton className="h-16 w-16 rounded-xl" />
        </div>
        <div className="flex-1 p-5 space-y-3">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-3.5 w-32" />
            </div>
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-3.5 w-14" />
            <Skeleton className="h-3.5 w-10" />
          </div>
          <div className="flex justify-between items-end pt-3">
            <div className="space-y-1">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </div>
    </Card>
  )
}
