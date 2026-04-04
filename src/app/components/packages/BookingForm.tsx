"use client"

import { useState } from "react"
import { TravelPackage } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, User, Mail, Phone, Users, CalendarDays,
  MapPin, Star, Clock, Shield, MessageSquare, CreditCard,
  CheckCircle2, ArrowLeft, Sparkles,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface BookingFormProps {
  pkg: TravelPackage
  tripType?: string
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all"

const labelClass = "flex items-center gap-2 text-xs font-bold text-gray-500 mb-1.5"

export function BookingForm({ pkg, tripType }: BookingFormProps) {
  const detailHref = tripType
    ? `/itinerary/packages/${pkg.id}?tripType=${encodeURIComponent(tripType)}`
    : `/itinerary/packages/${pkg.id}`

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    people: 2,
    travelDate: "",
    roomType: "Double",
    specialRequests: "",
  })

  const [submitted, setSubmitted] = useState(false)

  function update(field: string, value: string | number) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const totalPrice = pkg.price * form.people
  const totalOriginal = pkg.originalPrice * form.people
  const savings = totalOriginal - totalPrice

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.phone || !form.travelDate) {
      toast.error("Please fill all required fields")
      return
    }
    setSubmitted(true)
    toast.success("Booking confirmed! 🎉")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
        <nav className="flex items-center gap-2.5 text-sm text-gray-400">
          <Link href="/packages" className="transition-colors hover:text-[#3FB8FF]">Itineraries</Link>
          <ChevronRight className="size-3 shrink-0" />
          <Link href={detailHref} className="transition-colors hover:text-[#3FB8FF] truncate max-w-[140px]">{pkg.name}</Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-gray-800 font-semibold">Booking</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessView pkg={pkg} detailHref={detailHref} totalPrice={totalPrice} form={form} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Header */}
              <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
                <Link
                  href={detailHref}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#3FB8FF] transition-colors mb-3"
                >
                  <ArrowLeft className="size-3" /> Back to package details
                </Link>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">
                  Complete Your <span style={{ color: "#3FB8FF" }}>Booking</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Fill in your details to reserve {pkg.name}</p>
              </motion.div>

              {/* Package mini card */}
              <motion.div
                className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-gray-100 p-3 sm:p-4"
                style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.06)" }}
                {...fadeUp}
                transition={{ delay: 0.1 }}
              >
                <div className="relative size-16 sm:size-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.id}/200/200` }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-800 truncate">{pkg.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <MapPin className="size-2.5" /> {pkg.destination}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Clock className="size-2.5" /> {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: "#FBAB18" }}>
                      <Star className="size-2.5" style={{ fill: "#FBAB18" }} /> {pkg.rating}
                    </span>
                  </div>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                  {/* Left — form fields */}
                  <div className="lg:col-span-2 space-y-6">

                    {/* Personal Details */}
                    <motion.div
                      className="rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-4"
                      style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.04)" }}
                      {...fadeUp}
                      transition={{ delay: 0.15 }}
                    >
                      <h2 className="font-bold text-sm flex items-center gap-2 text-gray-800">
                        <User className="size-4" style={{ color: "#3FB8FF" }} /> Personal Details
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}><User className="size-3" /> Full Name *</label>
                          <input
                            value={form.fullName}
                            onChange={e => update("fullName", e.target.value)}
                            placeholder="John Doe"
                            className={inputClass}
                            style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelClass}><Mail className="size-3" /> Email Address *</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={e => update("email", e.target.value)}
                            placeholder="john@example.com"
                            className={inputClass}
                            style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelClass}><Phone className="size-3" /> Phone Number *</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={e => update("phone", e.target.value)}
                            placeholder="+91 98765 43210"
                            className={inputClass}
                            style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelClass}><CalendarDays className="size-3" /> Travel Date *</label>
                          <input
                            type="date"
                            value={form.travelDate}
                            onChange={e => update("travelDate", e.target.value)}
                            className={inputClass}
                            style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties}
                            required
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Travel Preferences */}
                    <motion.div
                      className="rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-4"
                      style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.04)" }}
                      {...fadeUp}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="font-bold text-sm flex items-center gap-2 text-gray-800">
                        <Users className="size-4" style={{ color: "#3FB8FF" }} /> Travel Preferences
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* People counter */}
                        <div>
                          <label className={labelClass}><Users className="size-3" /> Number of Travellers</label>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => update("people", Math.max(1, form.people - 1))}
                              className="size-10 rounded-xl border border-gray-200 flex items-center justify-center text-lg font-bold hover:bg-gray-50 cursor-pointer transition-colors text-gray-600"
                            >
                              −
                            </button>
                            <span className="text-xl font-extrabold w-8 text-center text-gray-800">{form.people}</span>
                            <button
                              type="button"
                              onClick={() => update("people", Math.min(20, form.people + 1))}
                              className="size-10 rounded-xl border border-gray-200 flex items-center justify-center text-lg font-bold hover:bg-gray-50 cursor-pointer transition-colors text-gray-600"
                            >
                              +
                            </button>
                            <span className="text-xs text-gray-400">person{form.people > 1 ? "s" : ""}</span>
                          </div>
                        </div>

                        {/* Room type */}
                        <div>
                          <label className={labelClass}><CreditCard className="size-3" /> Room Preference</label>
                          <div className="flex gap-2">
                            {["Single", "Double", "Suite"].map(r => (
                              <button
                                key={r}
                                type="button"
                                onClick={() => update("roomType", r)}
                                className="flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer"
                                style={form.roomType === r
                                  ? { background: "#3FB8FF", color: "#fff", borderColor: "#3FB8FF" }
                                  : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }
                                }
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Special requests */}
                      <div>
                        <label className={labelClass}><MessageSquare className="size-3" /> Special Requests</label>
                        <textarea
                          value={form.specialRequests}
                          onChange={e => update("specialRequests", e.target.value)}
                          placeholder="Any dietary requirements, accessibility needs, celebrations..."
                          rows={3}
                          className={`${inputClass} resize-none`}
                          style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties}
                        />
                      </div>
                    </motion.div>

                    {/* Submit — mobile only */}
                    <motion.div className="lg:hidden" {...fadeUp} transition={{ delay: 0.25 }}>
                      <motion.button
                        type="submit"
                        className="w-full text-white font-bold py-3.5 rounded-xl text-sm cursor-pointer"
                        style={{ background: "#3FB8FF" }}
                        whileHover={{ scale: 1.02, boxShadow: "0 6px 20px 0 rgba(63,184,255,0.35)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Confirm Booking — ₹{totalPrice.toLocaleString()}
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Right — price summary */}
                  <div className="lg:col-span-1">
                    <motion.div
                      className="sticky top-6 bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 space-y-4"
                      style={{ boxShadow: "0 4px 24px 0 rgba(63,184,255,0.10)" }}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h3 className="font-bold text-sm text-gray-800">Price Summary</h3>

                      <div className="space-y-2.5 text-xs text-gray-400">
                        <div className="flex justify-between">
                          <span>Package Price</span>
                          <span className="text-gray-800">₹{pkg.price.toLocaleString()} × {form.people}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration</span>
                          <span className="font-semibold text-gray-800">{pkg.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Room Type</span>
                          <span className="font-semibold text-gray-800">{form.roomType}</span>
                        </div>
                        {form.travelDate && (
                          <div className="flex justify-between">
                            <span>Travel Date</span>
                            <span className="font-semibold text-gray-800">
                              {new Date(form.travelDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="h-px bg-gray-100" />

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Original Total</span>
                        <span className="text-xs text-gray-400 line-through">₹{totalOriginal.toLocaleString()}</span>
                      </div>

                      <motion.div
                        className="flex justify-between items-center rounded-xl px-3 py-2"
                        style={{ background: "#FBAB1810" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="text-xs font-semibold" style={{ color: "#B8780F" }}>
                          <Sparkles className="size-3 inline mr-1" style={{ color: "#FBAB18" }} />
                          You save
                        </span>
                        <span className="text-xs font-extrabold" style={{ color: "#B8780F" }}>₹{savings.toLocaleString()}</span>
                      </motion.div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Amount</p>
                          <p className="text-2xl font-extrabold" style={{ color: "#3FB8FF" }}>₹{totalPrice.toLocaleString()}</p>
                        </div>
                        <p className="text-[10px] text-gray-400">{form.people} person{form.people > 1 ? "s" : ""}</p>
                      </div>

                      <motion.button
                        type="submit"
                        onClick={handleSubmit}
                        className="hidden lg:block w-full text-white font-bold py-3 rounded-xl text-sm cursor-pointer"
                        style={{ background: "#3FB8FF" }}
                        whileHover={{ scale: 1.02, boxShadow: "0 6px 20px 0 rgba(63,184,255,0.35)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Confirm Booking
                      </motion.button>

                      <div className="flex items-center justify-center gap-3 pt-1">
                        <span className="flex items-center gap-1 text-[10px] text-gray-400">
                          <Shield className="size-3" style={{ color: "#3FB8FF" }} /> Secure Payment
                        </span>
                        <span className="size-0.5 rounded-full bg-gray-300" />
                        <span className="text-[10px] text-gray-400">Free Cancellation</span>
                      </div>

                      <Link
                        href={detailHref}
                        className="block text-center text-xs text-gray-400 transition-colors hover:text-[#3FB8FF]"
                      >
                        ← Back to package details
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Success confirmation view ── */

function SuccessView({ pkg, detailHref, totalPrice, form }: {
  pkg: TravelPackage
  detailHref: string
  totalPrice: number
  form: { fullName: string; email: string; people: number; travelDate: string; roomType: string }
}) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-lg mx-auto py-12 sm:py-20 text-center space-y-6"
    >
      <motion.div
        className="mx-auto size-20 rounded-full flex items-center justify-center"
        style={{ background: "#3FB8FF15" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      >
        <CheckCircle2 className="size-10" style={{ color: "#3FB8FF" }} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl font-extrabold text-gray-800">Booking Confirmed!</h2>
        <p className="text-sm text-gray-400 mt-2">
          Thank you, {form.fullName.split(" ")[0]}! Your trip to {pkg.destination} is booked.
        </p>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-gray-100 p-5 text-left space-y-3 mx-auto"
        style={{ boxShadow: "0 4px 24px 0 rgba(63,184,255,0.08)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="font-bold text-sm text-gray-800">{pkg.name}</p>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex justify-between">
            <span>Travellers</span>
            <span className="font-semibold text-gray-800">{form.people} person{form.people > 1 ? "s" : ""}</span>
          </div>
          <div className="flex justify-between">
            <span>Travel Date</span>
            <span className="font-semibold text-gray-800">
              {new Date(form.travelDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Room</span>
            <span className="font-semibold text-gray-800">{form.roomType}</span>
          </div>
          <div className="flex justify-between">
            <span>Confirmation sent to</span>
            <span className="font-semibold text-gray-800 truncate max-w-[180px]">{form.email}</span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800">Total Paid</span>
            <span className="text-lg font-extrabold" style={{ color: "#3FB8FF" }}>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href={detailHref}
          className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors"
        >
          View Package
        </Link>
        <Link
          href="/packages"
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-colors"
          style={{ background: "#3FB8FF" }}
        >
          Explore More Packages
        </Link>
      </motion.div>
    </motion.div>
  )
}
