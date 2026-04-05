"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard, Receipt, CheckCircle2, Clock, XCircle, AlertCircle,
  ChevronDown, Download, Search, TrendingUp, ArrowUpRight,
} from "lucide-react"
import { bookings, PaymentStatus } from "./data"

const payStatusStyle: Record<PaymentStatus, { color: string; bg: string }> = {
  Paid: { color: "#22c55e", bg: "#22c55e10" },
  Partial: { color: "#FBAB18", bg: "#FBAB1810" },
  Pending: { color: "#FBAB18", bg: "#FBAB1810" },
  Refunded: { color: "#8b5cf6", bg: "#8b5cf610" },
  Failed: { color: "#ef4444", bg: "#ef444410" },
}

const allPayments = bookings.flatMap(b =>
  b.paymentSteps.map(step => ({ ...step, bookingId: b.id, packageName: b.packageName, destination: b.destination, image: b.image }))
)
const totalPaid = allPayments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0)
const totalPending = allPayments.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0)
const totalRefunded = allPayments.filter(p => p.status === "Refunded").reduce((s, p) => s + p.amount, 0)

export function PaymentsDashboard() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "All">("All")
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null)
  const statuses: (PaymentStatus | "All")[] = ["All", "Paid", "Pending", "Refunded"]

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = !search.trim() || b.packageName.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "All" || b.paymentSteps.some(s => s.status === statusFilter)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
          <CreditCard className="size-6 text-primary" /> Payments
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Invoices, billing history and pending payments.</p>
      </motion.div>

      <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {[
          { label: "Total Paid", value: `₹${totalPaid.toLocaleString()}`, icon: CheckCircle2, color: "#22c55e" },
          { label: "Pending", value: `₹${totalPending.toLocaleString()}`, icon: Clock, color: "#FBAB18" },
          { label: "Refunded", value: `₹${totalRefunded.toLocaleString()}`, icon: ArrowUpRight, color: "#8b5cf6" },
          { label: "Transactions", value: allPayments.length, icon: TrendingUp, color: "#3FB8FF" },
        ].map((stat, i) => (
          <motion.div key={stat.label} className="rounded-xl border border-border bg-card p-3 sm:p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.05 }}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
              <stat.icon className="size-3.5" style={{ color: stat.color }} />
            </div>
            <p className="text-lg sm:text-xl font-extrabold mt-1" style={{ color: stat.color }}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {totalPending > 0 && (
        <motion.div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4 flex items-start gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <AlertCircle className="size-5 text-secondary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-foreground">You have pending payments</p>
            <p className="text-xs text-muted-foreground mt-0.5">₹{totalPending.toLocaleString()} across {allPayments.filter(p => p.status === "Pending").length} installment(s). Complete them before the due dates to avoid cancellation.</p>
          </div>
        </motion.div>
      )}

      <motion.div className="flex flex-col sm:flex-row gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by package or booking ID..." className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-muted text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`shrink-0 text-[10px] sm:text-[11px] font-semibold px-3 py-2 rounded-xl border cursor-pointer transition-all ${statusFilter === s ? "bg-primary text-white border-primary" : "bg-muted border-border text-muted-foreground hover:border-primary/30"}`}>{s}</button>
          ))}
        </div>
      </motion.div>

      <div className="space-y-3">
        {filteredBookings.map((booking, bi) => {
          const isOpen = expandedBooking === booking.id
          const paidPct = Math.round((booking.paidAmount / booking.totalAmount) * 100)
          const filteredSteps = statusFilter === "All" ? booking.paymentSteps : booking.paymentSteps.filter(s => s.status === statusFilter)

          return (
            <motion.div key={booking.id} className={`rounded-2xl border overflow-hidden transition-colors ${isOpen ? "border-primary/30 shadow-lg shadow-primary/5" : "border-border"}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: bi * 0.05 }}>
              <button onClick={() => setExpandedBooking(prev => prev === booking.id ? null : booking.id)} className="w-full text-left cursor-pointer p-4 flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-12 sm:w-16 sm:h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                  <img src={booking.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-foreground truncate">{booking.packageName}</p>
                    <span className="text-[10px] font-bold text-muted-foreground shrink-0">{booking.invoiceId}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] sm:text-[11px] text-muted-foreground">
                    <span>₹{booking.paidAmount.toLocaleString()} / ₹{booking.totalAmount.toLocaleString()}</span>
                    <span className="font-bold" style={{ color: paidPct === 100 ? "#22c55e" : "#FBAB18" }}>{paidPct}% paid</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: paidPct === 100 ? "#22c55e" : "#3FB8FF" }} initial={{ width: 0 }} animate={{ width: `${paidPct}%` }} transition={{ duration: 0.8 }} />
                  </div>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                  <ChevronDown className="size-4 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-4 pb-4 pt-1 border-t border-border space-y-2">
                      <div className="grid grid-cols-[1fr_0.6fr_0.7fr_0.5fr] gap-2 text-[9px] font-bold text-muted-foreground uppercase tracking-wider py-2">
                        <span>Description</span><span>Amount</span><span>Date</span><span className="text-right">Status</span>
                      </div>
                      {filteredSteps.map((step, si) => {
                        const sty = payStatusStyle[step.status]
                        return (
                          <motion.div key={si} className="grid grid-cols-[1fr_0.6fr_0.7fr_0.5fr] gap-2 items-center rounded-xl border border-border bg-card p-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: si * 0.05 }}>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-foreground truncate">{step.label}</p>
                              {step.transactionId && <p className="text-[9px] text-muted-foreground mt-0.5">{step.transactionId}</p>}
                            </div>
                            <p className="text-xs font-bold text-foreground">₹{step.amount.toLocaleString()}</p>
                            <div className="text-[10px] text-muted-foreground">
                              {step.paidDate ? <span>{new Date(step.paidDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span> : <span>Due {new Date(step.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
                              {step.method && <p className="text-[9px]">{step.method}</p>}
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: sty.color, background: sty.bg }}>{step.status}</span>
                            </div>
                          </motion.div>
                        )
                      })}
                      <div className="flex justify-end pt-2">
                        <button className="flex items-center gap-1.5 text-[11px] font-semibold text-primary cursor-pointer hover:underline">
                          <Download className="size-3" /> Download Invoice ({booking.invoiceId})
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {filteredBookings.length === 0 && (
          <div className="text-center py-16">
            <Receipt className="size-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No payments match your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
