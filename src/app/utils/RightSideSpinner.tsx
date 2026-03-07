"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

export function RightSideLoader({ loading }: { loading: boolean }) {
  const [progress, setProgress] = useState(20)

  useEffect(() => {
    if (!loading) {
      setProgress(20)
      return
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev
        return prev + 18
      })
    }, 80)

    return () => clearInterval(timer)
  }, [loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-gray-50/70 backdrop-blur-sm"
        >
          <div className="w-[280px] space-y-3 text-center">
            <Progress value={progress} className="h-2" />

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-gray-600 font-medium"
            >
              Please wait...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}