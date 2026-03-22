"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "./header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  ArrowLeft, Star, Shield, MapPin, Clock, Users, CreditCard, Info,
  Check, Zap, Wifi, UtensilsCrossed, Dumbbell, Waves, Heart,
  Coffee, Car, BedDouble, Maximize, ChevronDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { hotels } from "./data"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, type: "spring" as const, stiffness: 200, damping: 24 },
})

const amenityIcons: Record<string, { icon: React.ElementType; tip: string }> = {
  "Pool": { icon: Waves, tip: "Outdoor/indoor swimming pool" },
  "Spa": { icon: Heart, tip: "Full-service spa & wellness center" },
  "Gym": { icon: Dumbbell, tip: "24/7 fitness center" },
  "Wi-Fi": { icon: Wifi, tip: "Complimentary high-speed Wi-Fi" },
  "Restaurant": { icon: UtensilsCrossed, tip: "On-site dining restaurant" },
  "Bar": { icon: Coffee, tip: "Lounge bar with cocktails" },
  "Room Service": { icon: UtensilsCrossed, tip: "24/7 in-room dining" },
  "Concierge": { icon: Users, tip: "Personal concierge service" },
  "Valet Parking": { icon: Car, tip: "Valet parking available" },
  "Business Center": { icon: Zap, tip: "Business center with meeting rooms" },
  "Parking": { icon: Car, tip: "On-site parking available" },
}

export function HotelDetail({ id }: { id: string }) {
  const router = useRouter()
  const hotel = hotels.find((h) => h.id === id)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null)

  if (!hotel) {
    return (
      <div className="force-light">
        <Header title="Hotel" />
        <div className="p-8 text-center text-gray-400">Hotel not found.</div>
      </div>
    )
  }

  const room = hotel.roomTypes.find((r) => r.id === selectedRoom) || hotel.roomTypes[0]
  const nights = 3
  const subtotal = room.price * nights
  const taxes = Math.round(subtotal * 0.14)
  const serviceFee = 35
  const total = subtotal + taxes + serviceFee

  return (
    <TooltipProvider delayDuration={200}>
      <div className="force-light">
        <Header title="Hotel" />
        <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink className="cursor-pointer" onClick={() => router.push("/hotel")}>Hotels</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink className="cursor-pointer" onClick={() => router.back()}>Results</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{hotel.name}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hotel Header */}
          <motion.div {...fadeUp(0)}>
            <Card className="overflow-hidden border border-gray-100 shadow-md bg-white">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-72 lg:w-80 shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 relative">
                  <motion.span className="text-7xl md:text-8xl" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}>
                    {hotel.image}
                  </motion.span>
                  {hotel.badge && <Badge className="absolute top-4 left-4 text-xs text-white" style={{ background: "#3FB8FF" }}>{hotel.badge}</Badge>}
                </div>
                <div className="p-5 md:p-6 flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold">{hotel.name}</h1>
                        <div className="flex">
                          {Array.from({ length: hotel.stars }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5" style={{ fill: "#FBAB18", color: "#FBAB18" }} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {hotel.location}, {hotel.city}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">{hotel.reviews.toLocaleString()} reviews</p>
                      </div>
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: "#3FB8FF" }}>
                        {hotel.rating}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{hotel.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {hotel.freeCancellation && (
                      <Badge variant="outline" className="text-xs gap-1" style={{ borderColor: "#3FB8FF40", color: "#3FB8FF" }}>
                        <Shield className="h-3 w-3" /> Free Cancellation
                      </Badge>
                    )}
                    {hotel.breakfastIncluded && (
                      <Badge variant="outline" className="text-xs gap-1 border-green-200 text-green-600">
                        <Coffee className="h-3 w-3" /> Breakfast Included
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs gap-1 text-gray-500">
                      <Clock className="h-3 w-3" /> Check-in {hotel.checkIn}
                    </Badge>
                    <Badge variant="outline" className="text-xs gap-1 text-gray-500">
                      <Clock className="h-3 w-3" /> Check-out {hotel.checkOut}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Gallery strip */}
          <motion.div {...fadeUp(0.06)}>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {hotel.gallery.map((item, i) => (
                <motion.div
                  key={item}
                  className="h-20 w-28 md:h-24 md:w-36 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer hover:border-[#3FB8FF]/30 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.04, type: "spring" }}
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="text-xs text-gray-400 capitalize">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Room Selection */}
          <motion.div {...fadeUp(0.1)}>
            <Card className="p-5 md:p-6 border border-gray-100 shadow-md bg-white">
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <BedDouble className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Choose Your Room
              </h3>
              <div className="space-y-3">
                {hotel.roomTypes.map((rt, i) => {
                  const isSelected = (selectedRoom || hotel.roomTypes[0].id) === rt.id
                  const isExpanded = expandedRoom === rt.id
                  const roomDiscount = Math.round((1 - rt.price / rt.originalPrice) * 100)
                  return (
                    <motion.div
                      key={rt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14 + i * 0.06, type: "spring" }}
                    >
                      <div
                        className={cn(
                          "rounded-xl border p-4 cursor-pointer transition-all",
                          isSelected ? "border-[#3FB8FF] bg-[#3FB8FF]/5 shadow-sm" : "border-gray-100 hover:border-gray-200"
                        )}
                        onClick={() => setSelectedRoom(rt.id)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <motion.span className="text-3xl" whileHover={{ scale: 1.1 }}>{rt.image}</motion.span>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm">{rt.name}</p>
                                {isSelected && <Check className="h-3.5 w-3.5" style={{ color: "#3FB8FF" }} />}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                                <span className="flex items-center gap-0.5"><Users className="h-3 w-3" /> {rt.capacity}</span>
                                <span className="flex items-center gap-0.5"><BedDouble className="h-3 w-3" /> {rt.bedType}</span>
                                <span className="flex items-center gap-0.5"><Maximize className="h-3 w-3" /> {rt.size}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="flex items-baseline gap-1.5 justify-end">
                                <span className="text-lg font-extrabold" style={{ color: "#3FB8FF" }}>${rt.price}</span>
                                {roomDiscount > 0 && <span className="text-xs text-gray-400 line-through">${rt.originalPrice}</span>}
                              </div>
                              <p className="text-[10px] text-gray-400">per night</p>
                            </div>
                            <Button
                              variant="ghost" size="sm" className="h-7 w-7 p-0"
                              onClick={(e) => { e.stopPropagation(); setExpandedRoom(isExpanded ? null : rt.id) }}
                            >
                              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronDown className="h-3.5 w-3.5" />
                              </motion.div>
                            </Button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 mt-3 border-t border-gray-100">
                                <p className="text-sm text-gray-500 mb-2">{rt.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {rt.amenities.map((a) => (
                                    <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">{a}</span>
                                  ))}
                                </div>
                                <p className="text-xs text-gray-400 mt-2">{rt.available} room{rt.available > 1 ? "s" : ""} left</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Amenities */}
            <motion.div {...fadeUp(0.16)}>
              <Card className="p-5 md:p-6 border border-gray-100 shadow-md bg-white h-full">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Hotel Amenities
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {hotel.amenities.map((a, i) => {
                    const detail = amenityIcons[a] || { icon: Zap, tip: a }
                    const Icon = detail.icon
                    return (
                      <Tooltip key={a}>
                        <TooltipTrigger asChild>
                          <motion.div
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 cursor-default"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.04, type: "spring", stiffness: 250 }}
                            whileHover={{ scale: 1.03, borderColor: "#3FB8FF40" }}
                          >
                            <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "#3FB8FF15" }}>
                              <Icon className="h-4 w-4" style={{ color: "#3FB8FF" }} />
                            </div>
                            <p className="text-sm font-medium">{a}</p>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>{detail.tip}</TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Policies */}
            <motion.div {...fadeUp(0.2)}>
              <Card className="p-5 md:p-6 border border-gray-100 shadow-md bg-white h-full">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Policies & Info
                </h3>
                <div className="space-y-1">
                  {[
                    { label: "Check-in", value: hotel.checkIn, tip: "Earliest check-in time" },
                    { label: "Check-out", value: hotel.checkOut, tip: "Latest check-out time" },
                    { label: "Cancellation", value: hotel.freeCancellation ? "Free cancellation" : "Non-refundable", tip: hotel.freeCancellation ? "Cancel up to 48h before for full refund" : "No refund on cancellation" },
                    { label: "Breakfast", value: hotel.breakfastIncluded ? "Included" : "Not included", tip: hotel.breakfastIncluded ? "Complimentary breakfast buffet" : "Available at extra cost" },
                    ...hotel.policies.map((p) => ({ label: p.split(" ")[0], value: p, tip: p })),
                  ].map((item, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 cursor-default rounded-lg px-2 hover:bg-gray-50/80 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.24 + i * 0.04, type: "spring", stiffness: 220 }}
                        >
                          <span className="text-sm text-gray-400">{item.label}</span>
                          <span className="text-sm font-medium flex items-center gap-1 text-right max-w-[60%] truncate">
                            {(item.value.includes("Free") || item.value === "Included") && <Check className="h-3.5 w-3.5 shrink-0" style={{ color: "#3FB8FF" }} />}
                            {item.value}
                          </span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>{item.tip}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Fare Breakdown + CTA */}
          <motion.div {...fadeUp(0.24)}>
            <Card className="border border-gray-100 shadow-md bg-white overflow-hidden">
              <div className="p-5 md:p-6">
                <h3 className="font-bold text-base mb-5 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Price Summary
                </h3>
                <div className="space-y-1">
                  {[
                    { label: `${room.name} × ${nights} nights`, value: `$${subtotal}`, icon: BedDouble, tip: `$${room.price}/night × ${nights} nights` },
                    { label: "Taxes & Fees (14%)", value: `$${taxes}`, icon: CreditCard, tip: "Local taxes and resort fees" },
                    { label: "Service Fee", value: `$${serviceFee}`, icon: Info, tip: "Platform booking fee" },
                  ].map((row, i) => (
                    <Tooltip key={row.label}>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="flex justify-between items-center text-sm py-2.5 px-3 rounded-lg cursor-default hover:bg-gray-50/80 transition-colors"
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 200, damping: 22 }}
                        >
                          <span className="text-gray-400 flex items-center gap-1.5">
                            <row.icon className="h-3.5 w-3.5" /> {row.label}
                          </span>
                          <motion.span className="font-semibold" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.42 + i * 0.08, type: "spring", stiffness: 300 }}>
                            {row.value}
                          </motion.span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent side="left">{row.tip}</TooltipContent>
                    </Tooltip>
                  ))}
                  <Separator className="my-2" />
                  <motion.div className="flex justify-between items-center px-3 py-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, type: "spring", stiffness: 200 }}>
                    <span className="font-bold text-lg">Total</span>
                    <motion.span className="text-2xl font-extrabold" style={{ color: "#3FB8FF" }} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 15 }}>
                      ${total}
                    </motion.span>
                  </motion.div>
                </div>
              </div>
              <motion.div className="p-5 md:p-6 border-t border-gray-100 bg-gray-50/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Info className="h-3.5 w-3.5 shrink-0" />
                    <span>Price for {nights} nights. Taxes included. No hidden charges.</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-10 gap-2 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                      style={{ background: "#3FB8FF" }}
                      onClick={() => router.push(`/hotel/${hotel.id}/billing?room=${room.id}&nights=${nights}`)}
                    >
                      <CreditCard className="h-4 w-4" /> Reserve Now
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  )
}
