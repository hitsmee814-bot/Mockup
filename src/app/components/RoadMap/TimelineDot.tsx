"use client"

import { motion, useTransform, MotionValue } from "framer-motion"
import { LucideIcon } from "lucide-react"

export function TimelineDot({
  index,
  total,
  scrollYProgress,
  icon: Icon,
}: {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  icon: LucideIcon
}) {
  const segment = 1 / (total - 1)
  const point = index * segment

  const scale = useTransform(
    scrollYProgress,
    [point - segment * 0.4, point, point + segment * 0.4],
    [0.85, 1.3, 0.85]
  )

  const opacity = useTransform(
    scrollYProgress,
    [point - segment * 0.4, point, point + segment * 0.4],
    [0.4, 1, 0.4]
  )

  const glowOpacity = useTransform(
    scrollYProgress,
    [point - segment * 0.3, point, point + segment * 0.3],
    [0, 1, 0]
  )

  return (
    <motion.div
      style={{ scale, opacity }}
      className="relative flex items-center justify-center"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute w-20 h-20 rounded-full 
        bg-gradient-to-r 
        from-[#3FB8FF] 
        to-[#59C3C4] 
        blur-2xl"
      />

      <div className="w-16 h-16 rounded-full 
        bg-gradient-to-br 
        from-[#04257E]/40 
        to-[#0E40C7]/20 
        border border-[#3FB8FF]/30 
        backdrop-blur-xl 
        flex items-center justify-center 
        shadow-[0_10px_30px_-5px_rgba(0,0,0,0.7)]"
      >
        <div className="w-11 h-11 rounded-full 
          bg-gradient-to-br 
          from-[#3FB8FF] 
          to-[#FBAB18] 
          flex items-center justify-center 
          text-[#FFFFFF] 
          shadow-lg"
        >
          <Icon size={18} />
        </div>
      </div>
    </motion.div>
  )
}