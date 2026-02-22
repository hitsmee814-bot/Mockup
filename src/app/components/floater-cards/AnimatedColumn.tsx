"use client"

import { motion, useTransform } from "framer-motion"

interface Props {
  children: React.ReactNode
  scrollYProgress: any
  range: number
  className?: string
}

export default function AnimatedColumn({
  children,
  scrollYProgress,
  range,
  className = "",
}: Props) {
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [range, 0, -range])

  return (
    <motion.div
      style={{ y }}
      className={`flex flex-col gap-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}