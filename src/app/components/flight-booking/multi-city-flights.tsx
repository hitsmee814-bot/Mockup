"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { CalendarIcon, X, ChevronsUpDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { airports } from "./constants"

type Flight = { from: string; to: string; date?: Date }

export function MultiCityFlights() {
  const [flights, setFlights] = useState<Flight[]>([{ from: "", to: "", date: undefined }])

  const addFlight = () => setFlights([...flights, { from: "", to: "", date: undefined }])
  const removeFlight = (index: number) => setFlights(flights.filter((_, i) => i !== index))

  return (
    <div className="space-y-4 mb-6">
      <AnimatePresence>
        {flights.map((flight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col md:flex-row gap-3 items-stretch md:items-end"
          >
            <div className="flex-1">
              <Label className="text-sm font-medium mb-2 block">From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-11 justify-between text-left font-normal">
                    <span>Select airport</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search airport..." />
                    <CommandList>
                      <CommandEmpty>No airport found.</CommandEmpty>
                      <CommandGroup>
                        {airports.map((a) => (
                          <CommandItem key={a.value} value={a.value}>
                            {a.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <Label className="text-sm font-medium mb-2 block">To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-11 justify-between text-left font-normal">
                    <span>Select airport</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search airport..." />
                    <CommandList>
                      <CommandEmpty>No airport found.</CommandEmpty>
                      <CommandGroup>
                        {airports.map((a) => (
                          <CommandItem key={a.value} value={a.value}>
                            {a.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <Label className="text-sm font-medium mb-2 block">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-11 justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {flight.date ? flight.date.toLocaleDateString() : "Select"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={flight.date} onSelect={(d) => {
                    const newFlights = [...flights]
                    newFlights[index].date = d
                    setFlights(newFlights)
                  }} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            {flights.length > 1 && (
              <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => removeFlight(index)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={addFlight} className="w-full">+ Add Flight</Button>
    </div>
  )
}
