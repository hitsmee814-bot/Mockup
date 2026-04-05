"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CalendarCheck, MapPin, Users, Clock, ChevronDown, Receipt,
  CheckCircle2, AlertCircle, XCircle, Plane, Search, Filter,
} from "lucide-react"
import { Booking, bookings, BookingStatus } from "../payments/data"

const statusConfig: Record<BookingStatus, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  Confirmed: { color: "#22c55e", bg: "#22c55e10", icon: CheckCircle2 },
  Pending: { color: "#FBAB18", bg: "#FBAB1810", icon: AlertCircle },
  Cancelled: { color: "#ef4444", bg: "#ef444410", icon: XCircle },
  Completed: { color: "#3FB8FF", bg: "#3FB8FF10", icon: Plane },
}

function BookingCard({ booking, index }: { booking: Booking; index: number }) {
  const [open, setOpen] = useState(false)
  const config = statusConfig[booking.status]
  const StatusIcon = config.icon
  const paidPct = Math.round((booking.paidAmount / booking.totalAmount) * 100)
  const completedSteps = booking.paymentSteps.filter(s => s.status === "Paid" || s.status === "Refunded").length

  return (
    <motion.div
      className={`rounded-2xl border overflow-hidden transition-colors ${open ? "border-primary/30 shadow-lg shadow-primary/5" : "border-border"}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <button onClick={() => setOpen(o => !o)} className="w-full text-left cursor-pointer">
        <div className="flex gap-3 sm:gap-4 p-4">
          <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-muted shrink-0">
            <img src={booking.image} alt={booking.packageName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{booking.packageName}</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="size-2.5" /> {booking.destination}</p>
              </div>
              <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: config.color, background: config.bg }}>
                <StatusIcon className="size-2.5" /> {booking.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] sm:text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><CalendarCheck className="size-3" /> {new Date(booking.travelDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – {new Date(booking.returnDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Users className="size-3" /> {booking.travellers}</span>
              <span className="font-bold text-foreground">₹{booking.totalAmount.toLocaleString()}</span>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: config.color }} initial={{ width: 0 }} animate={{ width: `${paidPct}%` }} transition={{ duration: 0.8, delay: 0.2 + index * 0.06 }} />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground shrink-0">{paidPct}%</span>
            </div>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 self-center">
            <ChevronDown className="size-4 text-muted-foreground" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-4 pb-4 pt-1 border-t border-border space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "Booking ID", value: booking.id },
                  { label: "Invoice", value: booking.invoiceId },
                  { label: "Booked On", value: new Date(booking.bookedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
                  { label: "Paid", value: `₹${booking.paidAmount.toLocaleString()} / ₹${booking.totalAmount.toLocaleString()}` },
                ].map(item => (
                  <div key={item.label} className="rounded-lg bg-muted/50 p-2.5">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-xs font-semibold text-foreground mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Receipt className="size-3 text-primary" /> Payment Steps ({completedSteps}/{booking.paymentSteps.length})
                </p>
                <div className="space-y-2">
                  {booking.paymentSteps.map((step, si) => {
                    const isPaid = step.status === "Paid"
                    const isRefunded = step.status === "Refunded"
                    return (
                      <motion.div key={si} className={`flex items-center gap-3 rounded-xl border p-3 ${isPaid ? "border-green-500/15 bg-green-500/5" : isRefunded ? "border-secondary/15 bg-secondary/5" : "border-border bg-card"}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: si * 0.06 }}>
                        <div className={`size-7 rounded-full flex items-center justify-center shrink-0 ${isPaid ? "bg-green-500/15" : isRefunded ? "bg-secondary/15" : "bg-muted"}`}>
                          {isPaid ? <CheckCircle2 className="size-3.5 text-green-500" /> : isRefunded ? <XCircle className="size-3.5 text-secondary" /> : <Clock className="size-3.5 text-muted-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground">{step.label}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {isPaid || isRefunded ? `${step.method} · ${step.paidDate ? new Date(step.paidDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : ""}` : `Due: ${new Date(step.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-foreground">₹{step.amount.toLocaleString()}</p>
                          <p className={`text-[9px] font-bold ${isPaid ? "text-green-500" : isRefunded ? "text-secondary" : "text-muted-foreground"}`}>{step.status}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function BookingsList() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "All">("All")
  const statuses: (BookingStatus | "All")[] = ["All", "Confirmed", "Pending", "Completed", "Cancelled"]

  const filtered = bookings.filter(b => {
    if (statusFilter !== "All" && b.status !== statusFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return b.packageName.toLowerCase().includes(q) || b.destination.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
          <CalendarCheck className="size-6 text-primary" /> My Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Track all your trips, payments and invoices.</p>
      </motion.div>

      <motion.div className="flex flex-col sm:flex-row gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, destination or booking ID..." className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-muted text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`shrink-0 text-[10px] sm:text-[11px] font-semibold px-3 py-2 rounded-xl border cursor-pointer transition-all ${statusFilter === s ? "bg-primary text-white border-primary" : "bg-muted border-border text-muted-foreground hover:border-primary/30"}`}>{s}</button>
          ))}
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        {[
          { label: "Total Bookings", value: bookings.length, color: "#3FB8FF" },
          { label: "Confirmed", value: bookings.filter(b => b.status === "Confirmed").length, color: "#22c55e" },
          { label: "Pending", value: bookings.filter(b => b.status === "Pending").length, color: "#FBAB18" },
          { label: "Total Spent", value: `₹${bookings.reduce((s, b) => s + b.paidAmount, 0).toLocaleString()}`, color: "#8b5cf6" },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-3 sm:p-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
            <p className="text-lg sm:text-xl font-extrabold mt-1" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </motion.div>

      <div className="space-y-3">
        {filtered.length > 0 ? filtered.map((b, i) => (
          <BookingCard key={b.id} booking={b} index={i} />
        )) : (
          <div className="text-center py-16">
            <Filter className="size-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No bookings match your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
