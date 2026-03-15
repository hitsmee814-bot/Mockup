"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AirportCombobox } from "./airport-combobox"
import { ClassCombobox } from "./class-combobox"
import { PassengerSelector } from "./passenger-selector"
import { DatePicker } from "./date-picker"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"

interface CompactSearchBarProps {
  onSearch: (params: {
    from: string
    to: string
    tripType: string
    departDate?: string
    returnDate?: string
    adults: number
    children: number
    infants: number
    class: string
  }) => void
}

export function CompactSearchBar({ onSearch }: CompactSearchBarProps) {
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

  const [tripType] = useState("roundtrip")
  const [isSticky, setIsSticky] = useState(false)

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = () => {
    onSearch({
      from,
      to,
      tripType,
      departDate:
        tripType === "roundtrip"
          ? date?.from?.toISOString().split("T")[0]
          : singleDate?.toISOString().split("T")[0],
      returnDate:
        tripType === "roundtrip"
          ? date?.to?.toISOString().split("T")[0]
          : undefined,
      adults,
      children,
      infants,
      class: flightClass,
    })
  }

  return (
    <>
      <div ref={sentinelRef} />

      <div
        className={cn(
          "transition-all duration-200",
          isSticky && "sticky top-0 z-40 py-4 bg-white border-b"
        )}
      >
        <Card className="p-3 md:p-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end">
            <div className="flex-1">
              <AirportCombobox
                value={from}
                onChange={setFrom}
                open={fromOpen}
                onOpenChange={setFromOpen}
                placeholder="From"
                className="h-10 text-sm"
              />
            </div>

            <div className="flex-1">
              <AirportCombobox
                value={to}
                onChange={setTo}
                open={toOpen}
                onOpenChange={setToOpen}
                placeholder="To"
                className="h-10 text-sm"
              />
            </div>

            <div className="flex-[1.5]">
              <DatePicker
                mode={tripType === "roundtrip" ? "range" : "single"}
                date={singleDate}
                dateRange={date}
                onDateChange={setSingleDate}
                onDateRangeChange={setDate}
                className="w-full h-10 justify-start text-left font-normal text-sm"
              />
            </div>

            <div className="flex-1">
              <PassengerSelector
                adults={adults}
                children={children}
                infants={infants}
                onAdultsChange={setAdults}
                onChildrenChange={setChildren}
                onInfantsChange={setInfants}
                open={passengersOpen}
                onOpenChange={setPassengersOpen}
                className="w-full h-10 justify-start text-left font-normal text-sm"
              />
            </div>

            <div className="flex-1">
              <ClassCombobox
                value={flightClass}
                onChange={setFlightClass}
                open={classOpen}
                onOpenChange={setClassOpen}
                className="h-10 text-sm"
              />
            </div>

            <Button className="h-10 px-6 w-full md:w-auto" onClick={handleSubmit}>
              Search
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}