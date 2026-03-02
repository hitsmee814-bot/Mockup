"use client"

import { motion, useTransform, MotionValue } from "framer-motion"

export function TimelineCard({
  title,
  desc,
  index,
  total,
  scrollYProgress,
}: {
  title: string
  desc: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const segment = 1 / (total - 1)
  const point = index * segment

  const opacity = useTransform(
    scrollYProgress,
    [
      point - segment * 0.5,
      point - segment * 0.15,
      point + segment * 0.5,
    ],
    [0, 1, 0]
  )

  const y = useTransform(
    scrollYProgress,
    [
      point - segment * 0.5,
      point,
      point + segment * 0.5,
    ],
    [60, 0, -60]
  )

  const scale = useTransform(
    scrollYProgress,
    [
      point - segment * 0.4,
      point,
      point + segment * 0.4,
    ],
    [0.97, 1, 0.97]
  )

  const contentOpacity = useTransform(
    scrollYProgress,
    [
      point - segment * 0.2,
      point,
      point + segment * 0.3,
    ],
    [0, 1, 0]
  )

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute w-full max-w-2xl"
    >
      <div
        className="relative rounded-3xl p-12 overflow-hidden
        bg-[#1B120B]
        border border-[#3769F1]/30
        shadow-[0_25px_80px_-20px_rgba(0,0,0,0.85)]"
      >
        <div
          className="absolute inset-0 -z-10
          bg-gradient-to-br
          from-[#04257E]/50
          via-[#3769F1]/30
          to-[#59C3C4]/40
          blur-2xl"
        />

        <motion.div
          style={{ opacity: contentOpacity }}
          className="mb-6 inline-flex items-center gap-2 rounded-full
          bg-[#0E40C7]/20
          px-4 py-1 text-sm
          text-[#7B9FFF]
          border border-[#3769F1]/40"
        >
          Step {index + 1}
        </motion.div>

        <motion.h3
          style={{ opacity: contentOpacity }}
          className="text-4xl font-bold text-[#FFFFFF] mb-6 tracking-tight"
        >
          {title}
        </motion.h3>

        <motion.div
          style={{ opacity: contentOpacity }}
          className="h-[3px] w-16
          bg-gradient-to-r
          from-[#3769F1]
          to-[#83DEE0]
          mb-6 rounded-full"
        />

        <motion.p
          style={{ opacity: contentOpacity }}
          className="text-[#CAD8FF] text-lg leading-relaxed"
        >
          {desc}
        </motion.p>
      </div>
    </motion.div>
  )
}