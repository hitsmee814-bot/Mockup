"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactView() {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Contact Information
      </p>

      <div className="rounded-xl border border-border bg-muted p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Customer Support</p>
        <div className="flex flex-col gap-3">
          {[
            { icon: Phone, label: "+1 (800) 123-4567", sub: "Toll-free, 24/7" },
            { icon: Mail, label: "support@travelapp.com", sub: "Reply within 1 hour" },
            { icon: MapPin, label: "123 Travel Street, NY 10001", sub: "Mon–Fri, 9 AM – 6 PM" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground">{label}</p>
                <p className="text-[11px] text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted p-4">
        <p className="mb-1 text-sm font-medium text-foreground">Business Hours</p>
        <p className="mb-3 text-[11px] text-muted-foreground">All times in EST</p>
        <div className="flex flex-col gap-1.5 text-xs">
          {[
            ["Phone Support", "24/7"],
            ["Live Chat", "24/7"],
            ["Email Support", "Mon–Sun, 8 AM – 10 PM"],
            ["Office Visit", "Mon–Fri, 9 AM – 6 PM"],
          ].map(([label, time]) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className="text-foreground">{time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-4">
        <p className="mb-1 text-sm font-medium text-secondary">Emergency Assistance</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          If you&apos;re stranded or need urgent help during travel, call our priority line at{" "}
          <span className="text-secondary">+1 (800) 999-0000</span> for immediate assistance.
        </p>
      </div>
    </motion.div>
  )
}
