"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ItineraryDay } from "./types"
import { Clock, Lightbulb, ChevronDown, Sparkles } from "lucide-react"

interface ItineraryStepperProps {
  itinerary: ItineraryDay[]
  packageId: string
}

export function ItineraryStepper({ itinerary, packageId }: ItineraryStepperProps) {
  const [expandedDay, setExpandedDay] = useState<number>(1)

  function toggle(day: number) {
    setExpandedDay(prev => (prev === day ? -1 : day))
  }

  return (
    <div className="relative">
      <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gray-100 z-0" />
      <motion.div
        className="absolute left-[18px] top-0 w-px z-[1]"
        style={{ background: "linear-gradient(180deg, #3FB8FF 0%, #FBAB18 100%)" }}
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />

      <div className="relative z-10 space-y-3">
        {itinerary.map((day, i) => {
          const isOpen = expandedDay === day.day
          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: "easeOut" }}
            >
              <div className="flex gap-3 sm:gap-4">
                {/* Timeline node */}
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <motion.button
                    onClick={() => toggle(day.day)}
                    className="relative size-9 rounded-full text-xs font-extrabold flex items-center justify-center cursor-pointer z-10 border-2 transition-colors"
                    style={{
                      background: isOpen ? "#3FB8FF" : "#fff",
                      color: isOpen ? "#fff" : "#3FB8FF",
                      borderColor: "#3FB8FF",
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {day.day}
                    {isOpen && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ border: "2px solid #3FB8FF" }}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </motion.button>
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0 pb-3">
                  <motion.div
                    onClick={() => toggle(day.day)}
                    className="rounded-2xl border overflow-hidden cursor-pointer transition-shadow"
                    style={{
                      borderColor: isOpen ? "#3FB8FF40" : "#f3f4f6",
                      boxShadow: isOpen
                        ? "0 8px 32px 0 rgba(63,184,255,0.12), 0 1.5px 6px 0 rgba(63,184,255,0.06)"
                        : "0 1px 4px 0 rgba(0,0,0,0.03)",
                    }}
                    layout
                  >
                    {/* Header row */}
                    <div className="flex items-center gap-3 px-3 sm:px-4 py-3 bg-white">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-sm text-gray-800 truncate">{day.title}</p>
                          {day.time && (
                            <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                              style={{ background: "#3FB8FF12", color: "#3FB8FF" }}>
                              <Clock className="size-2.5" /> {day.time}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{day.description}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="size-4 text-gray-300" />
                      </motion.div>
                    </div>

                    {/* Expandable content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 sm:px-4 pb-4 space-y-3">
                            {/* Day image */}
                            {day.image && (
                              <motion.div
                                className="relative h-32 sm:h-40 rounded-xl overflow-hidden bg-gray-100"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                              >
                                <img
                                  src={day.image}
                                  alt={day.title}
                                  className="w-full h-full object-cover"
                                  onError={e => {
                                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${packageId}-day${day.day}/600/300`
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                              </motion.div>
                            )}

                            {/* Description */}
                            <motion.p
                              className="text-xs text-gray-500 leading-relaxed"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.15 }}
                            >
                              {day.description}
                            </motion.p>

                            {/* Highlights */}
                            <motion.div
                              className="flex flex-wrap gap-1.5"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              {day.highlights.map((h, hi) => (
                                <motion.span
                                  key={h}
                                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-semibold border"
                                  style={{ background: "#FBAB1810", color: "#B8780F", borderColor: "#FBAB1825" }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.25 + hi * 0.06 }}
                                >
                                  <Sparkles className="size-2.5" style={{ color: "#FBAB18" }} />
                                  {h}
                                </motion.span>
                              ))}
                            </motion.div>

                            {/* Tips */}
                            {day.tips && day.tips.length > 0 && (
                              <motion.div
                                className="rounded-xl px-3 py-2.5 border space-y-1.5"
                                style={{ background: "#3FB8FF06", borderColor: "#3FB8FF18" }}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                              >
                                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: "#3FB8FF" }}>
                                  <Lightbulb className="size-3" /> Pro Tips
                                </p>
                                {day.tips.map(tip => (
                                  <p key={tip} className="text-[11px] text-gray-500 flex items-start gap-1.5">
                                    <span className="mt-1 size-1 rounded-full shrink-0" style={{ background: "#3FB8FF" }} />
                                    {tip}
                                  </p>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
