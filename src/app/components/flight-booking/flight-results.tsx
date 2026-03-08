"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, Wifi, Coffee, Tv, Luggage, Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const dummyFlights = [
  { id: 1, airline: "Emirates", logo: "🇦🇪", from: "JFK", to: "DXB", departure: "08:00", arrival: "18:30", duration: "10h 30m", price: 850, stops: 0, stopCities: [], aircraft: "Boeing 777", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.8, baggage: "2 x 23kg", refundable: true },
  { id: 2, airline: "British Airways", logo: "🇬🇧", from: "JFK", to: "DXB", departure: "10:30", arrival: "21:00", duration: "12h 30m", price: 720, stops: 1, stopCities: ["LHR"], aircraft: "Airbus A380", amenities: ["wifi", "meals", "entertainment"], rating: 4.5, baggage: "2 x 23kg", refundable: false },
  { id: 3, airline: "Lufthansa", logo: "🇩🇪", from: "JFK", to: "DXB", departure: "14:00", arrival: "02:30", duration: "14h 30m", price: 680, stops: 1, stopCities: ["FRA"], aircraft: "Airbus A350", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.6, baggage: "1 x 23kg", refundable: false },
  { id: 4, airline: "Qatar Airways", logo: "🇶🇦", from: "JFK", to: "DXB", departure: "16:45", arrival: "04:15", duration: "11h 30m", price: 890, stops: 0, stopCities: [], aircraft: "Boeing 787", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.9, baggage: "2 x 30kg", refundable: true },
  { id: 5, airline: "Turkish Airlines", logo: "🇹🇷", from: "JFK", to: "DXB", departure: "19:00", arrival: "08:30", duration: "13h 30m", price: 650, stops: 1, stopCities: ["IST"], aircraft: "Boeing 777", amenities: ["meals", "entertainment"], rating: 4.4, baggage: "1 x 23kg", refundable: false },
]

const generateDates = (startOffset: number) => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + startOffset + i)
    return { 
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }), 
      price: 650 + Math.floor(Math.random() * 300),
      fullDate: date
    }
  })
}

export function FlightResults() {
  const [dateOffset, setDateOffset] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedStops, setSelectedStops] = useState<string[]>([])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [departureTime, setDepartureTime] = useState<string[]>([])
  const [expandedFlight, setExpandedFlight] = useState<number | null>(null)
  
  const dates = generateDates(dateOffset)
  const maxOffset = 90 // 3 months

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setDateOffset(Math.max(0, dateOffset - 7))}
            disabled={dateOffset === 0}
            className="shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 grid grid-cols-7 gap-2">
            <AnimatePresence mode="wait">
              {dates.map((d, i) => (
                <motion.div
                  key={`${dateOffset}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                >
                  <Button 
                    variant={i === 0 && dateOffset === 0 ? "default" : "outline"} 
                    className="w-full flex flex-col h-20 hover:scale-105 transition-transform"
                  >
                    <span className="text-xs font-medium">{d.date.split(',')[0]}</span>
                    <span className="text-xs text-muted-foreground">{d.date.split(',')[1]}</span>
                    <span className="text-sm font-bold mt-1">${d.price}</span>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setDateOffset(Math.min(maxOffset - 7, dateOffset + 7))}
            disabled={dateOffset >= maxOffset - 7}
            className="shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-72 p-5 h-fit space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Filters</h3>
            <Button variant="ghost" size="sm" className="text-xs">Reset</Button>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Price Range</h4>
            <Slider 
              value={priceRange} 
              onValueChange={setPriceRange} 
              max={2000} 
              step={50} 
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Stops</h4>
            <div className="space-y-2.5">
              {["Non-stop", "1 Stop", "2+ Stops"].map((stop) => (
                <div key={stop} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={stop} />
                    <Label htmlFor={stop} className="text-sm cursor-pointer font-medium">{stop}</Label>
                  </div>
                  <span className="text-xs text-muted-foreground">from $650</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Departure Time</h4>
            <div className="grid grid-cols-2 gap-2">
              {["Morning\n6AM-12PM", "Afternoon\n12PM-6PM", "Evening\n6PM-12AM", "Night\n12AM-6AM"].map((time) => (
                <Button key={time} variant="outline" size="sm" className="h-auto py-2 text-xs whitespace-pre-line">
                  {time}
                </Button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Airlines</h4>
            <div className="space-y-2.5">
              {["Emirates", "British Airways", "Lufthansa", "Qatar Airways", "Turkish Airlines"].map((airline) => (
                <div key={airline} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={airline} />
                    <Label htmlFor={airline} className="text-sm cursor-pointer">{airline}</Label>
                  </div>
                  <span className="text-xs text-muted-foreground">$650</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Amenities</h4>
            <div className="space-y-2.5">
              {["Wi-Fi", "In-flight Entertainment", "Power Outlets", "Meals Included"].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox id={amenity} />
                  <Label htmlFor={amenity} className="text-sm cursor-pointer">{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Booking Options</h4>
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2">
                <Checkbox id="refundable" />
                <Label htmlFor="refundable" className="text-sm cursor-pointer">Refundable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="changeable" />
                <Label htmlFor="changeable" className="text-sm cursor-pointer">Changeable</Label>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{dummyFlights.length} flights found</p>
            <Button variant="outline" size="sm">Sort by: Best <ChevronDown className="ml-1 h-4 w-4" /></Button>
          </div>
          
          {dummyFlights.map((flight, i) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-center">
                        <div className="text-4xl mb-1">{flight.logo}</div>
                        <div className="text-xs font-semibold">{flight.airline}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{flight.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-8">
                          <div>
                            <div className="text-2xl font-bold">{flight.departure}</div>
                            <div className="text-sm text-muted-foreground font-medium">{flight.from}</div>
                          </div>
                          
                          <div className="flex-1 flex flex-col items-center">
                            <div className="text-xs text-muted-foreground mb-1">{flight.duration}</div>
                            <div className="w-full relative">
                              <div className="h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
                              <Plane className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-primary" />
                            </div>
                            <div className="text-xs font-medium mt-1">
                              {flight.stops === 0 ? (
                                <Badge variant="secondary" className="bg-green-100 text-green-700">Non-stop</Badge>
                              ) : (
                                <Badge variant="secondary">{flight.stops} stop{flight.stops > 1 ? 's' : ''}</Badge>
                              )}
                            </div>
                            {flight.stopCities.length > 0 && (
                              <div className="text-xs text-muted-foreground mt-1">{flight.stopCities.join(', ')}</div>
                            )}
                          </div>
                          
                          <div>
                            <div className="text-2xl font-bold">{flight.arrival}</div>
                            <div className="text-sm text-muted-foreground font-medium">{flight.to}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4">
                          <div className="flex items-center gap-1.5">
                            <Luggage className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{flight.baggage}</span>
                          </div>
                          <Separator orientation="vertical" className="h-4" />
                          <span className="text-xs text-muted-foreground">{flight.aircraft}</span>
                          {flight.amenities.includes("wifi") && (
                            <>
                              <Separator orientation="vertical" className="h-4" />
                              <Wifi className="h-4 w-4 text-muted-foreground" />
                            </>
                          )}
                          {flight.amenities.includes("entertainment") && <Tv className="h-4 w-4 text-muted-foreground" />}
                          {flight.amenities.includes("meals") && <Coffee className="h-4 w-4 text-muted-foreground" />}
                          {flight.refundable && (
                            <>
                              <Separator orientation="vertical" className="h-4" />
                              <Badge variant="outline" className="text-xs">Refundable</Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-1">from</div>
                      <div className="text-3xl font-bold text-primary">${flight.price}</div>
                      <div className="text-xs text-muted-foreground mb-3">per person</div>
                      <Button className="w-full mb-2" size="lg">Select Flight</Button>
                      <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setExpandedFlight(expandedFlight === flight.id ? null : flight.id)}>
                        Flight Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                {expandedFlight === flight.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="border-t bg-muted/30 p-5"
                  >
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-semibold mb-2">Departure</h5>
                        <p className="text-muted-foreground">Terminal 4, Gate B22</p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Arrival</h5>
                        <p className="text-muted-foreground">Terminal 3, Gate A15</p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Baggage</h5>
                        <p className="text-muted-foreground">Checked: {flight.baggage}</p>
                        <p className="text-muted-foreground">Cabin: 1 x 7kg</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}