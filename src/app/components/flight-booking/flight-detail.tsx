"use client"

import { useRouter } from "next/navigation"
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
  Plane, Clock, Wifi, Luggage, Star, Shield,
  ArrowLeft, Check, MapPin, Zap, Monitor, UtensilsCrossed,
  BatteryCharging, CreditCard, Users, Info,
} from "lucide-react"
import { motion } from "framer-motion"
import { Flight } from "./types"

const flights: Record<string, Flight> = {
  "1": { id: 1, airline: "Emirates", logo: "🇦🇪", from: "JFK", to: "DXB", departure: "08:00", arrival: "18:30", duration: "10h 30m", price: 850, stops: 0, stopCities: [], aircraft: "Boeing 777", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.8, baggage: "2 x 23kg", refundable: true },
  "2": { id: 2, airline: "British Airways", logo: "🇬🇧", from: "JFK", to: "DXB", departure: "10:30", arrival: "21:00", duration: "12h 30m", price: 720, stops: 1, stopCities: ["LHR"], aircraft: "Airbus A380", amenities: ["wifi", "meals", "entertainment"], rating: 4.5, baggage: "2 x 23kg", refundable: false },
  "3": { id: 3, airline: "Lufthansa", logo: "🇩🇪", from: "JFK", to: "DXB", departure: "14:00", arrival: "02:30", duration: "14h 30m", price: 680, stops: 1, stopCities: ["FRA"], aircraft: "Airbus A350", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.6, baggage: "1 x 23kg", refundable: false },
  "4": { id: 4, airline: "Qatar Airways", logo: "🇶🇦", from: "JFK", to: "DXB", departure: "16:45", arrival: "04:15", duration: "11h 30m", price: 890, stops: 0, stopCities: [], aircraft: "Boeing 787", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.9, baggage: "2 x 30kg", refundable: true },
  "5": { id: 5, airline: "Turkish Airlines", logo: "🇹🇷", from: "JFK", to: "DXB", departure: "19:00", arrival: "08:30", duration: "13h 30m", price: 650, stops: 1, stopCities: ["IST"], aircraft: "Boeing 777", amenities: ["meals", "entertainment"], rating: 4.4, baggage: "1 x 23kg", refundable: false },
}

const amenityDetails: Record<string, { icon: React.ElementType; label: string; desc: string; tip: string }> = {
  wifi: { icon: Wifi, label: "Wi-Fi", desc: "High-speed internet", tip: "Stream, browse & work at 30,000 ft" },
  meals: { icon: UtensilsCrossed, label: "Meals", desc: "Complimentary dining", tip: "Multi-course meals with beverages" },
  entertainment: { icon: Monitor, label: "Entertainment", desc: "Seatback screens", tip: "1000+ movies, shows & games" },
  power: { icon: BatteryCharging, label: "Power", desc: "USB & AC outlets", tip: "Keep all your devices charged" },
}

const cityNames: Record<string, string> = {
  JFK: "New York (JFK)", DXB: "Dubai (DXB)", LHR: "London (LHR)",
  FRA: "Frankfurt (FRA)", IST: "Istanbul (IST)",
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, type: "spring" as const, stiffness: 200, damping: 24 },
})

const staggerRow = (delay: number) => ({
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0 },
  transition: { delay, type: "spring" as const, stiffness: 220, damping: 22 },
})

export function FlightDetail({ id }: { id: string }) {
  const router = useRouter()
  const flight = flights[id]

  if (!flight) {
    return (
      <div className="force-light">
        <div className="p-8 text-center text-gray-400">Flight not found.</div>
      </div>
    )
  }

  const taxes = Math.round(flight.price * 0.18)
  const serviceFee = 24
  const total = flight.price + taxes + serviceFee

  const fareRows = [
    { label: "Base Fare (1 Adult)", value: `$${flight.price}`, icon: Users, tip: "Fare before taxes for 1 adult passenger" },
    { label: "Taxes & Fees", value: `$${taxes}`, icon: CreditCard, tip: "Government taxes and airport fees" },
    { label: "Service Fee", value: `$${serviceFee}`, icon: Info, tip: "Platform booking & support fee" },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <div className="force-light">
        <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3">
            {/* <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button> */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink className="cursor-pointer" onClick={() => router.back()}>Results</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Flight Details</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Airline Header */}
          <motion.div {...fadeUp(0)}>
            <Card className="p-5 md:p-6 border border-gray-100 shadow-md bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <motion.span className="text-5xl" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}>{flight.logo}</motion.span>
                  <div>
                    <p className="font-bold text-xl">{flight.airline}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 cursor-default">
                            <Star className="h-3.5 w-3.5" style={{ fill: "#FBAB18", color: "#FBAB18" }} />
                            <span className="text-sm font-medium">{flight.rating}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Passenger rating based on recent reviews</TooltipContent>
                      </Tooltip>
                      <span className="text-xs text-gray-400">•</span>
                      <Tooltip>
                        <TooltipTrigger asChild><span className="text-sm text-gray-400 cursor-default">{flight.aircraft}</span></TooltipTrigger>
                        <TooltipContent>Aircraft type for this route</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <motion.div className="flex items-center gap-3 flex-wrap" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  {flight.refundable && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="gap-1 text-xs cursor-default" style={{ borderColor: "#3FB8FF40", color: "#3FB8FF" }}>
                          <Shield className="h-3 w-3" /> Refundable
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>Full refund if cancelled 24h before departure</TooltipContent>
                    </Tooltip>
                  )}
                  {flight.stops === 0 && <Badge className="text-xs text-white" style={{ background: "#3FB8FF" }}>Non-stop</Badge>}
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Itinerary Timeline */}
          <motion.div {...fadeUp(0.08)}>
            <Card className="p-5 md:p-6 border border-gray-100 shadow-md bg-white">
              <h3 className="font-bold text-base mb-5 flex items-center gap-2">
                <Plane className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Flight Itinerary
              </h3>
              <div className="relative">
                {/* Departure */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div className="h-4 w-4 rounded-full border-2" style={{ borderColor: "#3FB8FF", background: "#3FB8FF" }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 400 }} />
                    <div className="w-0.5 flex-1 bg-gradient-to-b" style={{ backgroundImage: "linear-gradient(to bottom, #3FB8FF, #3FB8FF60)" }} />
                  </div>
                  <motion.div className="pb-8 flex-1" {...staggerRow(0.18)}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div>
                        <p className="text-2xl font-bold">{flight.departure}</p>
                        <p className="text-sm text-gray-400 flex items-center gap-1"><MapPin className="h-3 w-3" /> {cityNames[flight.from] || flight.from}</p>
                      </div>
                      <div className="text-sm text-gray-400">Terminal 4 · Gate B22</div>
                    </div>
                  </motion.div>
                </div>
                {/* Duration */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div className={`h-3 w-3 rounded-full ${flight.stops > 0 ? "border-2 border-gray-300 bg-white" : "bg-gray-200"}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25, type: "spring", stiffness: 400 }} />
                    <div className="w-0.5 flex-1 bg-gradient-to-b" style={{ backgroundImage: "linear-gradient(to bottom, #3FB8FF60, #3FB8FF)" }} />
                  </div>
                  <motion.div className="pb-8 flex-1" {...staggerRow(0.28)}>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-3.5 w-3.5" /> {flight.duration}
                      {flight.stops > 0 && <span>· {flight.stops} stop ({flight.stopCities.join(", ")})</span>}
                    </div>
                  </motion.div>
                </div>
                {/* Arrival */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div className="h-4 w-4 rounded-full border-2" style={{ borderColor: "#3FB8FF", background: "#3FB8FF" }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.35, type: "spring", stiffness: 400 }} />
                  </div>
                  <motion.div className="flex-1" {...staggerRow(0.38)}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div>
                        <p className="text-2xl font-bold">{flight.arrival}</p>
                        <p className="text-sm text-gray-400 flex items-center gap-1"><MapPin className="h-3 w-3" /> {cityNames[flight.to] || flight.to}</p>
                      </div>
                      <div className="text-sm text-gray-400">Terminal 3 · Gate A15</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Amenities */}
            <motion.div {...fadeUp(0.14)}>
              <Card className="p-5 md:p-6 border border-gray-100 shadow-md bg-white h-full">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Onboard Amenities
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {flight.amenities.map((key, i) => {
                    const a = amenityDetails[key]
                    if (!a) return null
                    return (
                      <Tooltip key={key}>
                        <TooltipTrigger asChild>
                          <motion.div
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 cursor-default"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 250 }}
                            whileHover={{ scale: 1.03, borderColor: "#3FB8FF40" }}
                          >
                            <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "#3FB8FF15" }}>
                              <a.icon className="h-4 w-4" style={{ color: "#3FB8FF" }} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{a.label}</p>
                              <p className="text-xs text-gray-400">{a.desc}</p>
                            </div>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>{a.tip}</TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Baggage & Policies */}
            <motion.div {...fadeUp(0.18)}>
              <Card className="p-5 md:p-6 border border-gray-100 shadow-md bg-white h-full">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <Luggage className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Baggage & Policies
                </h3>
                <div className="space-y-1">
                  {[
                    { label: "Checked Baggage", value: flight.baggage, tip: "Included in your ticket" },
                    { label: "Cabin Baggage", value: "1 × 7kg", tip: "One carry-on bag allowed" },
                    { label: "Seat Selection", value: "Available", tip: "Choose your preferred seat at check-in" },
                    { label: "Cancellation", value: flight.refundable ? "Free cancellation" : "Non-refundable", tip: flight.refundable ? "Cancel up to 24h before for full refund" : "No refund on cancellation" },
                    { label: "Changes", value: flight.refundable ? "Free changes" : "Fee applies", tip: flight.refundable ? "Change dates/times at no cost" : "Change fee varies by fare class" },
                  ].map((item, i) => (
                    <Tooltip key={item.label}>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 cursor-default rounded-lg px-2 hover:bg-gray-50/80 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.22 + i * 0.05, type: "spring", stiffness: 220 }}
                        >
                          <span className="text-sm text-gray-400">{item.label}</span>
                          <span className="text-sm font-medium flex items-center gap-1">
                            {item.value.includes("Free") || item.value === "Available" ? <Check className="h-3.5 w-3.5" style={{ color: "#3FB8FF" }} /> : null}
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
          <motion.div {...fadeUp(0.22)}>
            <Card className="border border-gray-100 shadow-md bg-white overflow-hidden">
              <div className="p-5 md:p-6">
                <h3 className="font-bold text-base mb-5 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Fare Summary
                </h3>
                <div className="space-y-1">
                  {fareRows.map((row, i) => (
                    <Tooltip key={row.label}>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="flex justify-between items-center text-sm py-2.5 px-3 rounded-lg cursor-default hover:bg-gray-50/80 transition-colors"
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.28 + i * 0.08, type: "spring", stiffness: 200, damping: 22 }}
                        >
                          <span className="text-gray-400 flex items-center gap-1.5">
                            <row.icon className="h-3.5 w-3.5" /> {row.label}
                          </span>
                          <motion.span
                            className="font-semibold"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 300 }}
                          >
                            {row.value}
                          </motion.span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent side="left">{row.tip}</TooltipContent>
                    </Tooltip>
                  ))}

                  <Separator className="my-2" />

                  <motion.div
                    className="flex justify-between items-center px-3 py-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  >
                    <span className="font-bold text-lg">Total</span>
                    <motion.span
                      className="text-2xl font-extrabold"
                      style={{ color: "#3FB8FF" }}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 15 }}
                    >
                      ${total}
                    </motion.span>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="p-5 md:p-6 border-t border-gray-100 bg-gray-50/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Info className="h-3.5 w-3.5 shrink-0" />
                    <span>Prices are per person. Taxes included. No hidden charges.</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-10 gap-2 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                      style={{ background: "#3FB8FF" }}
                      onClick={() => router.push(`/itinerary/flights/${flight.id}/billing`)}
                    >
                      <CreditCard className="h-4 w-4" /> Proceed to Payment
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
