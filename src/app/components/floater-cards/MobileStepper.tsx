"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import TallCard from "./cards/TallCard"
import { TallStep } from "./card-content"

const AUTO_DELAY = 4000
const SWIPE_THRESHOLD = 80

export default function MobileStepper({ steps }: { steps: TallStep[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const total = steps.length

  const next = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  useEffect(() => {
    const timer = setInterval(next, AUTO_DELAY)
    return () => clearInterval(timer)
  }, [next])

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next()
    if (info.offset.x > SWIPE_THRESHOLD) prev()
  }

  const prevIndex = (index - 1 + total) % total
  const nextIndex = (index + 1) % total

  return (
    <div className="w-full px-4">
      <div className="relative mx-auto h-[520px] max-w-[360px] perspective-[1200px]">
        <motion.div
          key={prevIndex}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
          animate={{
            x: -70,
            scale: 0.88,
            opacity: 0.6,
            rotateY: 12,
            y: 12,
          }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <TallCard {...steps[prevIndex]} />
        </motion.div>

        <motion.div
          key={index}
          className="absolute inset-0"
          style={{ zIndex: 3 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          initial={{ x: direction === 1 ? 120 : -120, opacity: 0.8 }}
          animate={{
            x: 0,
            scale: 1,
            opacity: 1,
            rotateY: 0,
            y: 0,
          }}
          exit={{ x: direction === 1 ? -120 : 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <TallCard {...steps[index]} />
        </motion.div>

        <motion.div
          key={nextIndex}
          className="absolute inset-0"
          style={{ zIndex: 2 }}
          animate={{
            x: 70,
            scale: 0.88,
            opacity: 0.6,
            rotateY: -12,
            y: 12,
          }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <TallCard {...steps[nextIndex]} />
        </motion.div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-[#00AFEF]" : "w-3 bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}