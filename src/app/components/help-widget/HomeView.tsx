"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  HelpCircle,
  FileQuestion,
  Headphones,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import type { View } from "./types"
import { quickLinks } from "./data"

const actions: { icon: typeof HelpCircle; label: string; desc: string; view: View }[] = [
  { icon: HelpCircle, label: "FAQs", desc: "Browse common questions", view: "faq" },
  { icon: FileQuestion, label: "Ask a Question", desc: "Submit your query", view: "request" },
  { icon: Headphones, label: "Contact Support", desc: "Call, email, or visit", view: "contact" },
]

export default function HomeView({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-5"
    >
      {/* Action Cards */}
      <div className="flex flex-col gap-1.5">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          How can we help?
        </p>
        {actions.map(({ icon: Icon, label, desc, view }, i) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={() => setView(view)}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-primary/5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-[11px] text-muted-foreground">{desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Quick Links */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Quick Links
        </p>
        <div className="grid grid-cols-4 gap-2">
          {quickLinks.map(({ icon: Icon, label, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.03 }}
            >
              <Link
                href={href}
                className="group flex flex-col items-center gap-1.5 rounded-xl p-2.5 transition-all hover:bg-primary/5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary/20">
                  <Icon className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-[10px] font-medium text-foreground leading-tight text-center">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-between rounded-xl border border-secondary/20 bg-secondary/5 px-4 py-3"
      >
        <div>
          <p className="text-xs font-medium text-foreground">Explore travel deals</p>
          <p className="text-[10px] text-muted-foreground">Save up to 40% on packages</p>
        </div>
        <Link
          href="/packages"
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/10 transition-colors hover:bg-secondary/20"
        >
          <ExternalLink className="h-3.5 w-3.5 text-secondary" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
