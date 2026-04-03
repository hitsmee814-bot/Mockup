/* eslint-disable react/no-children-prop */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { DateRange } from "react-day-picker"
import { Search } from "lucide-react"
import { AirportCombobox } from "./airport-combobox"
import { ClassCombobox } from "./class-combobox"
import { PassengerSelector } from "./passenger-selector"
import { DatePicker } from "./date-picker"
import { MultiCityFlights } from "./multi-city-flights"

interface SearchFormProps {
  onSearch: (params: { from: string; to: string; tripType: string; departDate?: string; returnDate?: string; adults: number; children: number; infants: number; class: string }) => void
}

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, type: "spring", stiffness: 200, damping: 20 } }),
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
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="max-w-7xl mx-auto"
    >
      <Card className="p-5 md:p-8 border border-gray-100 shadow-lg bg-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <RadioGroup value={tripType} onValueChange={setTripType} className="flex flex-wrap gap-4 md:gap-6 mb-6">
            {[
              { value: "roundtrip", label: "Round Trip" },
              { value: "oneway", label: "One Way" },
              { value: "multicity", label: "Multi City" },
            ].map((t) => (
              <motion.div key={t.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center space-x-2">
                <RadioGroupItem value={t.value} id={t.value} />
                <Label htmlFor={t.value} className="cursor-pointer">{t.label}</Label>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>

        {tripType === "multicity" ? (
          <MultiCityFlights />
        ) : (
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            {[
              { idx: 0, label: "From", content: <AirportCombobox value={from} onChange={setFrom} open={fromOpen} onOpenChange={setFromOpen} className="h-11" /> },
              { idx: 1, label: "To", content: <AirportCombobox value={to} onChange={setTo} open={toOpen} onOpenChange={setToOpen} className="h-11" /> },
              { idx: 2, label: tripType === "roundtrip" ? "Dates" : "Date", flex: "flex-[1.5]", content: (
                <DatePicker
                  mode={tripType === "roundtrip" ? "range" : "single"}
                  date={singleDate}
                  dateRange={date}
                  onDateChange={setSingleDate}
                  onDateRangeChange={setDate}
                  className="w-full h-11 justify-start text-left font-normal"
                />
              )},
              { idx: 3, label: "Passengers", content: (
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
              )},
              { idx: 4, label: "Class", content: <ClassCombobox value={flightClass} onChange={setFlightClass} open={classOpen} onOpenChange={setClassOpen} className="h-11" /> },
            ].map((field) => (
              <motion.div
                key={field.idx}
                custom={field.idx}
                variants={fieldVariants}
                initial="hidden"
                animate="show"
                className={`${field.flex || "flex-1"} min-w-0`}
              >
                <Label className="text-sm font-medium mb-2 block">{field.label}</Label>
                {field.content}
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Button
            className="w-full h-12 font-semibold text-base gap-2 shadow-md hover:shadow-lg transition-shadow text-white"
            style={{ background: "#3FB8FF" }}
            onClick={handleSubmit}
          >
            <Search className="h-4 w-4" />
            Search Flights
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  )
}
