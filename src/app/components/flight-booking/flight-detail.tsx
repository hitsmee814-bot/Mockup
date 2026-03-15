"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  Plane, Clock, Wifi, Coffee, Tv, Luggage, Star, Shield,
  ArrowLeft, ExternalLink, Check, X, Globe,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Flight } from "./types"

const flights: Record<string, Flight> = {
  "1": { id: 1, airline: "Emirates", logo: "🇦🇪", from: "JFK", to: "DXB", departure: "08:00", arrival: "18:30", duration: "10h 30m", price: 850, stops: 0, stopCities: [], aircraft: "Boeing 777", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.8, baggage: "2 x 23kg", refundable: true },
  "2": { id: 2, airline: "British Airways", logo: "🇬🇧", from: "JFK", to: "DXB", departure: "10:30", arrival: "21:00", duration: "12h 30m", price: 720, stops: 1, stopCities: ["LHR"], aircraft: "Airbus A380", amenities: ["wifi", "meals", "entertainment"], rating: 4.5, baggage: "2 x 23kg", refundable: false },
  "3": { id: 3, airline: "Lufthansa", logo: "🇩🇪", from: "JFK", to: "DXB", departure: "14:00", arrival: "02:30", duration: "14h 30m", price: 680, stops: 1, stopCities: ["FRA"], aircraft: "Airbus A350", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.6, baggage: "1 x 23kg", refundable: false },
  "4": { id: 4, airline: "Qatar Airways", logo: "🇶🇦", from: "JFK", to: "DXB", departure: "16:45", arrival: "04:15", duration: "11h 30m", price: 890, stops: 0, stopCities: [], aircraft: "Boeing 787", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.9, baggage: "2 x 30kg", refundable: true },
  "5": { id: 5, airline: "Turkish Airlines", logo: "🇹🇷", from: "JFK", to: "DXB", departure: "19:00", arrival: "08:30", duration: "13h 30m", price: 650, stops: 1, stopCities: ["IST"], aircraft: "Boeing 777", amenities: ["meals", "entertainment"], rating: 4.4, baggage: "1 x 23kg", refundable: false },
}

const websitePrices = [
  { name: "Skyscanner", icon: "🔍" },
  { name: "Google Flights", icon: "✈️" },
  { name: "Kayak", icon: "🛶" },
  { name: "Expedia", icon: "🌐" },
  { name: "Trip.com", icon: "🧳" },
  { name: "MakeMyTrip", icon: "🎫" },
]

function generatePrices(base: number) {
  return websitePrices.map((site, i) => ({
    ...site,
    price: base + [-30, -10, 20, 45, -15, 60][i],
    extras: {
      freeCancellation: [true, false, false, true, false, false][i],
      freeMeal: [true, true, false, true, true, false][i],
      seatSelection: [true, false, true, true, false, false][i],
      priorityBoarding: [true, false, false, false, false, false][i],
    },
  }))
}

const featureLabels: Record<string, string> = {
  freeCancellation: "Free Cancellation",
  freeMeal: "Free Meal",
  seatSelection: "Seat Selection",
  priorityBoarding: "Priority Boarding",
}

export function FlightDetail({ id }: { id: string }) {
  const router = useRouter()
  const flight = flights[id]
  const [compareIds, setCompareIds] = useState<number[]>([])

  if (!flight) {
    return (
      <div className="force-light">
        <div className="p-8 text-center text-gray-400">Flight not found.</div>
      </div>
    )
  }

  const prices = generatePrices(flight.price)
  const cheapest = Math.min(...prices.map(p => p.price))

  const toggleCompare = (i: number) => {
    setCompareIds(prev => prev.includes(i) ? prev.filter(x => x !== i) : prev.length < 3 ? [...prev, i] : prev)
  }

  const compared = compareIds.map(i => prices[i])

  return (
    <div className="force-light">
      {/* <Header title="Flight" /> */}
      <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 space-y-4 md:space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={() => router.back()}>Results</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Flight Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Flight Summary */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 md:p-6 border border-gray-100 shadow-md bg-white">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{flight.logo}</span>
                <div>
                  <p className="font-bold text-lg">{flight.airline}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" style={{ fill: "#FBAB18", color: "#FBAB18" }} />
                    <span className="text-sm">{flight.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center gap-6 md:gap-10">
                <div className="text-center">
                  <p className="text-2xl font-bold">{flight.departure}</p>
                  <p className="text-sm text-muted-foreground">{flight.from}</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {flight.duration}
                  </span>
                  <div className="w-full relative my-1.5">
                    <div className="h-[2px] bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full" />
                    <Plane className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" style={{ color: "#3FB8FF" }} />
                  </div>
                  {flight.stops === 0 ? (
                    <Badge variant="secondary" className="text-xs" style={{ background: "#3FB8FF15", color: "#3FB8FF", borderColor: "#3FB8FF30" }}>Non-stop</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">{flight.stops} stop · {flight.stopCities.join(", ")}</Badge>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{flight.arrival}</p>
                  <p className="text-sm text-muted-foreground">{flight.to}</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Luggage className="h-3.5 w-3.5" /> {flight.baggage}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{flight.aircraft}</span>
              {flight.amenities.includes("wifi") && <Wifi className="h-3.5 w-3.5" />}
              {flight.amenities.includes("entertainment") && <Tv className="h-3.5 w-3.5" />}
              {flight.amenities.includes("meals") && <Coffee className="h-3.5 w-3.5" />}
              {flight.refundable && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <Badge variant="outline" className="text-xs gap-1" style={{ borderColor: "#3FB8FF40", color: "#3FB8FF" }}>
                    <Shield className="h-3 w-3" /> Refundable
                  </Badge>
                </>
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Globe className="h-5 w-5" style={{ color: "#3FB8FF" }} /> Prices from booking sites
            </h2>
            {compareIds.length > 0 && (
              <Badge variant="secondary" className="text-xs">{compareIds.length}/3 selected</Badge>
            )}
          </div>

          <div className="space-y-2">
            {prices.map((site, i) => (
              <motion.div
                key={site.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Card className={cn(
                  "p-3 md:p-4 border shadow-sm hover:shadow-md transition-all",
                  site.price === cheapest && "border-[#3FB8FF]/40 bg-[#3FB8FF]/5",
                  compareIds.includes(i) && "ring-2 ring-[#3FB8FF]/30"
                )}>
                  <div className="flex items-center gap-3 md:gap-4">
                    <Checkbox
                      checked={compareIds.includes(i)}
                      onCheckedChange={() => toggleCompare(i)}
                      disabled={!compareIds.includes(i) && compareIds.length >= 3}
                      className="shrink-0"
                    />
                    <span className="text-xl shrink-0">{site.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{site.name}</p>
                        {site.price === cheapest && (
                          <Badge className="text-[10px] px-1.5 py-0 text-white" style={{ background: "#3FB8FF" }}>Cheapest</Badge>
                        )}
                      </div>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {site.extras.freeCancellation && <span className="text-[10px]" style={{ color: "#3FB8FF" }}>Free cancellation</span>}
                        {site.extras.freeMeal && <span className="text-[10px] text-gray-400">· Meal included</span>}
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-3">
                      <p className="text-xl font-bold">${site.price}</p>
                      <Button size="sm" className="gap-1 hidden sm:flex text-white" style={{ background: "#3FB8FF" }}>
                        Book <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button size="icon" className="h-8 w-8 sm:hidden">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {compared.length >= 2 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-lg font-bold mb-3">Comparison</h2>
            <Card className="border border-gray-100 shadow-md overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-3 font-semibold text-gray-400">Feature</th>
                    {compared.map(s => (
                      <th key={s.name} className="p-3 text-center font-semibold">{s.icon} {s.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-gray-400">Price</td>
                    {compared.map(s => (
                      <td key={s.name} className={cn("p-3 text-center font-bold", s.price === cheapest && "text-[#3FB8FF]")}>
                        ${s.price}
                      </td>
                    ))}
                  </tr>
                  {Object.entries(featureLabels).map(([key, label]) => (
                    <tr key={key} className="border-b last:border-0">
                      <td className="p-3 text-gray-400">{label}</td>
                      {compared.map(s => (
                        <td key={s.name} className="p-3 text-center">
                          {s.extras[key as keyof typeof s.extras]
                            ? <Check className="h-4 w-4 mx-auto" style={{ color: "#3FB8FF" }} />
                            : <X className="h-4 w-4 text-red-400 mx-auto" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </motion.div>
        )}

        {compareIds.length > 0 && compareIds.length < 2 && (
          <p className="text-sm text-gray-400 text-center">Select at least 2 sites to compare</p>
        )}
      </div>
    </div>
  )
}
