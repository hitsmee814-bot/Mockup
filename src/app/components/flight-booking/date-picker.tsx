import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

interface DatePickerProps {
  mode: "single" | "range"
  date?: Date
  dateRange?: DateRange
  onDateChange?: (date: Date | undefined) => void
  onDateRangeChange?: (range: DateRange | undefined) => void
  className?: string
}

export function DatePicker({ mode, date, dateRange, onDateChange, onDateRangeChange, className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {mode === "range" ? (
            dateRange?.from ? (
              dateRange.to ? (
                <>{dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}</>
              ) : dateRange.from.toLocaleDateString()
            ) : "Select dates"
          ) : (
            date ? date.toLocaleDateString() : "Select date"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {mode === "range" ? (
          <Calendar mode="range" selected={dateRange} onSelect={onDateRangeChange} numberOfMonths={2} initialFocus />
        ) : (
          <Calendar mode="single" selected={date} onSelect={onDateChange} initialFocus />
        )}
      </PopoverContent>
    </Popover>
  )
}
