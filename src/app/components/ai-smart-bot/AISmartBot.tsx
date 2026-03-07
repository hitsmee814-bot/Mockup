"use client"

import { motion } from "framer-motion"

export default function AISmartBot() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh] px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold tracking-tight text-gray-900"
        >
          Coming Soon
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60px" }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="h-[2px] bg-gray-300 mx-auto my-4 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-sm leading-relaxed"
        >
          We're crafting something thoughtful for this section.
          <br />
          Check back shortly.
        </motion.p>
      </motion.div>
    </div>
  )
}