"use client"

import Image from "next/image"
import logoPrimary from "../../assets/images/final logo Bonhomiee.png"

import { useState } from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarIcon, Plus, X } from "lucide-react"
import { PremiumButton } from "@/app/utils/PremiumButton"

export default function Flights() {

    const [tripType, setTripType] = useState("round")

    const [date, setDate] = useState<Date>()
    const [range, setRange] = useState<any>()

    const [multiCities, setMultiCities] = useState([
        { from: "", to: "", date: undefined as Date | undefined }
    ])

    const addCity = () => {
        setMultiCities([
            ...multiCities,
            { from: "", to: "", date: undefined }
        ])
    }

    const removeCity = (index: number) => {
        const updated = [...multiCities]
        updated.splice(index, 1)
        setMultiCities(updated)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <header className="px-6 py-4 flex items-center">
                <Image
                    src={logoPrimary}
                    alt="Bonhomiee"
                    width={140}
                    height={40}
                />
            </header>

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <Card className="max-w-7xl mx-auto">
                    <CardContent className="p-4 sm:p-6 space-y-6">

                        <Tabs
                            defaultValue="round"
                            onValueChange={(v) => setTripType(v)}
                        >
                            <TabsList className="w-fit gap-1 bg-gray-100 p-1 rounded-lg">

                                <TabsTrigger
                                    value="oneway"
                                    className="data-[state=active]:bg-[#3FB8FF] data-[state=active]:text-white rounded-md px-4"
                                >
                                    One Way
                                </TabsTrigger>

                                <TabsTrigger
                                    value="round"
                                    className="data-[state=active]:bg-[#3FB8FF] data-[state=active]:text-white rounded-md px-4"
                                >
                                    Round Trip
                                </TabsTrigger>

                                <TabsTrigger
                                    value="multi"
                                    className="data-[state=active]:bg-[#3FB8FF] data-[state=active]:text-white rounded-md px-4"
                                >
                                    Multi City
                                </TabsTrigger>

                            </TabsList>
                        </Tabs>
                        {tripType !== "multi" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3 items-center">
                                <Input
                                    placeholder="From"
                                    className="h-10"
                                />
                                <Input
                                    placeholder="To"
                                    className="h-10"
                                />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="justify-start text-left font-normal h-10 hover:bg-white hover:text-black"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {tripType === "oneway" && date
                                                ? format(date, "PPP")
                                                : tripType === "round" && range?.from
                                                    ? `${format(range.from, "d MMM")} - ${range.to ? format(range.to, "d MMM") : ""}`
                                                    : "Select date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        {tripType === "oneway" ? (

                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                                classNames={{
                                                    today: "bg-transparent text-inherit"
                                                }}
                                            />

                                        ) : (

                                            <Calendar
                                                mode="range"
                                                selected={range}
                                                onSelect={setRange}
                                                numberOfMonths={2}
                                                classNames={{
                                                    today: "bg-transparent text-inherit"
                                                }}
                                            />

                                        )}
                                    </PopoverContent>
                                </Popover>
                                <Input
                                    placeholder="Travellers"
                                    className="h-10"
                                />
                                <PremiumButton
                                >
                                    Search
                                </PremiumButton>
                            </div>
                        )}
                        {tripType === "multi" && (
                            <div className="space-y-4">
                                {multiCities.map((flight, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center"
                                    >
                                        <Input
                                            placeholder="From"
                                            className="h-10"
                                        />
                                        <Input
                                            placeholder="To"
                                            className="h-10"
                                        />
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="justify-start h-10 hover:bg-white hover:text-black"
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />

                                                    {flight.date
                                                        ? format(flight.date, "PPP")
                                                        : "Select date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 w-auto">
                                                <Calendar
                                                    mode="single"
                                                    selected={flight.date}
                                                    onSelect={(d) => {
                                                        const updated = [...multiCities]
                                                        updated[index].date = d
                                                        setMultiCities(updated)

                                                    }}
                                                    classNames={{
                                                        today: "bg-transparent text-inherit"
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <div className="flex gap-2">
                                            {multiCities.length > 1 && (

                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeCity(index)}
                                                >
                                                    <X size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                                    <PremiumButton variant="secondary" onClick={addCity}
                                    >
                                        <Plus className="mr-0 h-4 w-4" />
                                        Add Flight
                                    </PremiumButton>

                                    <PremiumButton variant="primary"
                                    >
                                        Search
                                    </PremiumButton>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}