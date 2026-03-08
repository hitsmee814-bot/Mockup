/* eslint-disable react/no-children-prop */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { motion,  } from "framer-motion"
import { DateRange } from "react-day-picker"
import { AirportCombobox } from "./airport-combobox"
import { ClassCombobox } from "./class-combobox"
import { PassengerSelector } from "./passenger-selector"
import { DatePicker } from "./date-picker"
import { MultiCityFlights } from "./multi-city-flights"

interface SearchFormProps {
  onSearch: (params: { from: string; to: string; tripType: string; departDate?: string; returnDate?: string; adults: number; children: number; infants: number; class: string }) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [tripType, setTripType] = useState("roundtrip")
  const [date, setDate] = useState<DateRange | undefined>()
  const [singleDate, setSingleDate] = useState<Date>()
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [passengersOpen, setPassengersOpen] = useState(false)
  const [classOpen, setClassOpen] = useState(false)
  const [flightClass, setFlightClass] = useState("economy")
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const handleSubmit = () => {
    onSearch({
      from,
      to,
      tripType,
      departDate: tripType === "roundtrip" ? date?.from?.toISOString().split('T')[0] : singleDate?.toISOString().split('T')[0],
      returnDate: tripType === "roundtrip" ? date?.to?.toISOString().split('T')[0] : undefined,
      adults,
      children,
      infants,
      class: flightClass
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <Card className="p-4 md:p-8">
        <RadioGroup value={tripType} onValueChange={setTripType} className="flex flex-wrap gap-4 md:gap-6 mb-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="roundtrip" id="roundtrip" />
            <Label htmlFor="roundtrip" className="cursor-pointer">Round Trip</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oneway" id="oneway" />
            <Label htmlFor="oneway" className="cursor-pointer">One Way</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multicity" id="multicity" />
            <Label htmlFor="multicity" className="cursor-pointer">Multi City</Label>
          </div>
        </RadioGroup>

        {tripType === "multicity" ? (
          <MultiCityFlights />
        ) : (
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
              <Label className="text-sm font-medium mb-2 block">From</Label>
              <AirportCombobox value={from} onChange={setFrom} open={fromOpen} onOpenChange={setFromOpen} className="h-11" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
              <Label className="text-sm font-medium mb-2 block">To</Label>
              <AirportCombobox value={to} onChange={setTo} open={toOpen} onOpenChange={setToOpen} className="h-11" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 md:flex-[1.5] min-w-0">
              <Label className="text-sm font-medium mb-2 block">
                {tripType === "roundtrip" ? "Dates" : "Date"}
              </Label>
              <DatePicker
                mode={tripType === "roundtrip" ? "range" : "single"}
                date={singleDate}
                dateRange={date}
                onDateChange={setSingleDate}
                onDateRangeChange={setDate}
                className="w-full h-11 justify-start text-left font-normal"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
              <Label className="text-sm font-medium mb-2 block">Passengers</Label>
              <PassengerSelector
                adults={adults}
                children={children}
                infants={infants}
                onAdultsChange={setAdults}
                onChildrenChange={setChildren}
                onInfantsChange={setInfants}
                open={passengersOpen}
                onOpenChange={setPassengersOpen}
                className="w-full h-11 justify-start text-left font-normal"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
              <Label className="text-sm font-medium mb-2 block">Class</Label>
              <ClassCombobox value={flightClass} onChange={setFlightClass} open={classOpen} onOpenChange={setClassOpen} className="h-11" />
            </motion.div>
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Button className="w-full h-11 font-semibold" onClick={handleSubmit}>Search Flights</Button>
        </motion.div>
      </Card>
    </motion.div>
  )
}
