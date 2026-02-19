"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
export function DatePickerSingle({
    date,
    onChange,
}: {
    date?: Date
    onChange: (d?: Date) => void
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd MMM yyyy") : "Pick a date"}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onChange}
                    numberOfMonths={2}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export function DatePickerRange({
    value,
    onChange,
}: {
    value?: DateRange
    onChange: (v?: DateRange) => void
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value?.from ? (
                        value.to ? (
                            <>
                                {format(value.from, "dd MMM")} – {format(value.to, "dd MMM")}
                            </>
                        ) : (
                            format(value.from, "dd MMM")
                        )
                    ) : (
                        "Pick dates"
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    selected={value}
                    onSelect={onChange}
                    numberOfMonths={2}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
