"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { generateDates } from "./flight-data"

export function DateCarousel({ dateOffset, setDateOffset, selectedDate, setSelectedDate, direction, setDirection }: {
  dateOffset: number
  setDateOffset: (fn: (prev: number) => number) => void
  selectedDate: number
  setSelectedDate: (i: number) => void
  direction: number
  setDirection: (d: number) => void
}) {
  const dates = generateDates(dateOffset)
  const maxOffset = 90

  const navigateDates = (dir: number) => {
    setDirection(dir)
    setDateOffset((prev) => dir > 0 ? Math.min(maxOffset - 7, prev + 7) : Math.max(0, prev - 7))
  }

  return (
    <Card className="p-2 sm:p-3 md:p-4 border border-gray-100 shadow-md bg-white overflow-hidden">
      <div className="flex items-center gap-1 md:gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateDates(-1)}
          disabled={dateOffset === 0}
          className="shrink-0 rounded-full h-8 w-8 md:h-10 md:w-10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-1 sm:gap-1.5 md:gap-2">
          <AnimatePresence mode="popLayout" custom={direction}>
            {dates.map((d, i) => (
              <motion.div
                key={`${dateOffset}-${i}`}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: i * 0.02 }}
                className={cn(
                  i >= 3 && "hidden sm:block",
                  i >= 5 && "sm:hidden md:block"
                )}
              >
                <Button
                  variant={selectedDate === i && dateOffset === 0 ? "default" : "outline"}
                  onClick={() => setSelectedDate(i)}
                  className={cn(
                    "w-full flex flex-col h-14 sm:h-16 md:h-20 px-1 sm:px-2 transition-all duration-200",
                    selectedDate === i && dateOffset === 0
                      ? "shadow-md scale-[1.02]"
                      : "hover:scale-[1.03] hover:shadow-sm"
                  )}
                >
                  <span className="text-[10px] sm:text-xs font-medium">{d.weekday}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">{d.monthDay}</span>
                  <span className="text-[10px] text-muted-foreground sm:hidden">{d.day}</span>
                  <span className="text-xs sm:text-sm font-bold mt-0.5">${d.price}</span>
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateDates(1)}
          disabled={dateOffset >= maxOffset - 7}
          className="shrink-0 rounded-full h-8 w-8 md:h-10 md:w-10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
