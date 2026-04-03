"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, Wifi, Coffee, Tv, Luggage, Star, ChevronDown, Shield } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useRouter } from "next/navigation"
import { Flight } from "./types"

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },

  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.07,
      type: "spring" as const, // ✅ FIX
      stiffness: 180,
      damping: 22,
    },
  }),
}

export function FlightCard({ flight, index, expandedFlight, setExpandedFlight }: {
  flight: Flight
  index: number
  expandedFlight: number | null
  setExpandedFlight: (id: number | null) => void
}) {
  const router = useRouter()

  return (
    <motion.div
      key={flight.id}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white">
        <div className="p-3 md:p-5">
          {/* Mobile layout */}
          <div className="md:hidden space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{flight.logo}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{flight.airline}</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} />
                    <span className="text-xs text-gray-500">{flight.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-extrabold" style={{ color: "#3FB8FF" }}>${flight.price}</div>
                <div className="text-[10px] text-gray-400">per person</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{flight.departure}</div>
                <div className="text-xs text-gray-400">{flight.from}</div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="text-[10px] text-gray-400 flex items-center gap-0.5">
                  <Clock className="h-2.5 w-2.5" /> {flight.duration}
                </div>
                <div className="w-full relative my-1">
                  <div className="h-[2px] rounded-full" style={{ background: "linear-gradient(to right, #3FB8FF30, #3FB8FF, #3FB8FF30)" }} />
                  <Plane className="h-3 w-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" style={{ color: "#3FB8FF" }} />
                </div>
                {flight.stops === 0 ? (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0" style={{ background: "#3FB8FF15", color: "#3FB8FF", borderColor: "#3FB8FF30" }}>Non-stop</Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-gray-100 text-gray-500">{flight.stops} stop</Badge>
                )}
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{flight.arrival}</div>
                <div className="text-xs text-gray-400">{flight.to}</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {flight.amenities.includes("wifi") && <Wifi className="h-3 w-3 text-gray-400" />}
                {flight.amenities.includes("meals") && <Coffee className="h-3 w-3 text-gray-400" />}
                {flight.amenities.includes("entertainment") && <Tv className="h-3 w-3 text-gray-400" />}
                {flight.refundable && (
                  <Badge variant="outline" className="text-[10px] gap-0.5 px-1.5 py-0" style={{ borderColor: "#3FB8FF40", color: "#3FB8FF" }}>
                    <Shield className="h-2.5 w-2.5" /> Refundable
                  </Badge>
                )}
              </div>
              <Button size="sm" className="h-8 text-xs shadow-sm" onClick={() => router.push(`/flight/${flight.id}`)}>Select</Button>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="text-center">
                  <div className="text-4xl mb-1">{flight.logo}</div>
                  <div className="text-xs font-semibold text-gray-800">{flight.airline}</div>
                  <div className="flex items-center gap-1 mt-1 justify-center">
                    <Star className="h-3 w-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} />
                    <span className="text-xs font-medium text-gray-500">{flight.rating}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{flight.departure}</div>
                      <div className="text-sm text-gray-400 font-medium">{flight.from}</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-1.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {flight.duration}
                      </div>
                      <div className="w-full relative">
                        <div className="h-[2px] rounded-full" style={{ background: "linear-gradient(to right, #3FB8FF30, #3FB8FF, #3FB8FF30)" }} />
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          animate={{ x: [-2, 2, -2] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Plane className="h-4 w-4 bg-white rounded-full p-0.5" style={{ color: "#3FB8FF" }} />
                        </motion.div>
                      </div>
                      <div className="mt-1.5">
                        {flight.stops === 0 ? (
                          <Badge variant="secondary" className="text-xs" style={{ background: "#3FB8FF15", color: "#3FB8FF", borderColor: "#3FB8FF30" }}>Non-stop</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-500">{flight.stops} stop{flight.stops > 1 ? 's' : ''}</Badge>
                        )}
                      </div>
                      {flight.stopCities.length > 0 && (
                        <div className="text-xs text-gray-400 mt-0.5">{flight.stopCities.join(', ')}</div>
                      )}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{flight.arrival}</div>
                      <div className="text-sm text-gray-400 font-medium">{flight.to}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Luggage className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">{flight.baggage}</span>
                    </div>
                    <Separator orientation="vertical" className="h-3.5" />
                    <span className="text-xs text-gray-400">{flight.aircraft}</span>
                    {flight.amenities.includes("wifi") && <Wifi className="h-3.5 w-3.5 text-gray-400" />}
                    {flight.amenities.includes("entertainment") && <Tv className="h-3.5 w-3.5 text-gray-400" />}
                    {flight.amenities.includes("meals") && <Coffee className="h-3.5 w-3.5 text-gray-400" />}
                    {flight.refundable && (
                      <>
                        <Separator orientation="vertical" className="h-3.5" />
                        <Badge variant="outline" className="text-xs gap-1" style={{ borderColor: "#3FB8FF40", color: "#3FB8FF" }}>
                          <Shield className="h-3 w-3" /> Refundable
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-gray-400 mb-0.5">from</div>
                <div className="text-3xl font-extrabold" style={{ color: "#3FB8FF" }}>${flight.price}</div>
                <div className="text-xs text-gray-400 mb-3">per person</div>
                <Button className="w-full mb-2 shadow-sm text-white" style={{ background: "#3FB8FF" }} size="lg" onClick={() => router.push(`/itinerary/flights/${flight.id}`)}>Select Flight</Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => setExpandedFlight(expandedFlight === flight.id ? null : flight.id)}
                >
                  Flight Details
                  <motion.span
                    animate={{ rotate: expandedFlight === flight.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-1"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {expandedFlight === flight.id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-100 bg-gray-50 p-3 md:p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm">
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                    <h5 className="font-semibold mb-1 md:mb-2 text-gray-800">Departure</h5>
                    <p className="text-gray-400 text-xs md:text-sm">Terminal 4, Gate B22</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <h5 className="font-semibold mb-1 md:mb-2 text-gray-800">Arrival</h5>
                    <p className="text-gray-400 text-xs md:text-sm">Terminal 3, Gate A15</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <h5 className="font-semibold mb-1 md:mb-2 text-gray-800">Baggage</h5>
                    <p className="text-gray-400 text-xs md:text-sm">Checked: {flight.baggage}</p>
                    <p className="text-gray-400 text-xs md:text-sm">Cabin: 1 x 7kg</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export function FlightCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-md bg-card/90 backdrop-blur-sm">
      <div className="p-3 md:p-5">
        {/* Mobile skeleton */}
        <div className="md:hidden space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
            <div className="text-right space-y-1.5">
              <Skeleton className="h-5 w-16 ml-auto" />
              <Skeleton className="h-2.5 w-12 ml-auto" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-12" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-2.5 w-16 mx-auto" />
              <Skeleton className="h-[2px] w-full" />
              <Skeleton className="h-4 w-14 mx-auto rounded-full" />
            </div>
            <Skeleton className="h-10 w-12" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-3 rounded-full" />
            </div>
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
        {/* Desktop skeleton */}
        <div className="hidden md:flex items-start justify-between gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-center space-y-1.5">
              <Skeleton className="h-10 w-10 rounded-full mx-auto" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-10 mx-auto" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-8">
                <div className="space-y-1.5">
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-20 mx-auto" />
                  <Skeleton className="h-[2px] w-full" />
                  <Skeleton className="h-5 w-16 mx-auto rounded-full" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3.5 w-px" />
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
              </div>
            </div>
          </div>
          <div className="text-right shrink-0 space-y-2">
            <Skeleton className="h-3 w-10 ml-auto" />
            <Skeleton className="h-8 w-20 ml-auto" />
            <Skeleton className="h-3 w-14 ml-auto" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-7 w-full rounded-md" />
          </div>
        </div>
      </div>
    </Card>
  )
}
