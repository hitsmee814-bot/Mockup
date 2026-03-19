"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { faqs } from "./data"

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="border-b border-border/50 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 py-3 text-left text-[13px] font-medium text-foreground transition-colors hover:text-primary"
      >
        {q}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-3 text-xs leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQView() {
  let globalIndex = 0

  return (
    <motion.div
      key="faq"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4"
    >
      {faqs.map((section) => (
        <div key={section.category}>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
            {section.category}
          </p>
          <div className="flex flex-col">
            {section.items.map((faq) => {
              const idx = globalIndex++
              return <FAQItem key={idx} q={faq.q} a={faq.a} index={idx} />
            })}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
