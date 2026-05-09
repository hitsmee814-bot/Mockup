"use client"

import { useState } from "react"
import { TourPackage } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, User, Mail, Phone, Users, CalendarDays,
  MapPin, Star, Clock, Shield, MessageSquare,
  CheckCircle2, ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface BookingFormProps {
  pkg: TourPackage
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all"

const labelClass = "flex items-center gap-2 text-xs font-bold text-gray-500 mb-1.5"

function AnimatedValue({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className="relative inline-flex items-center h-5 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className={`whitespace-nowrap ${className}`}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function BookingForm({ pkg }: BookingFormProps) {
  const { tour, availability } = pkg
  const detailHref = `/itinerary/packages/${tour.id}`
  const duration = `${tour.duration_nights}N/${tour.duration_days}D`

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    people: 2,
    selectedSlot: availability[0]?.id || 0,
    specialRequests: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [shake, setShake] = useState(false)

  function update(field: string, value: string | number) {
    setForm(prev => {
      const next = { ...prev, [field]: value }
      // Clamp people if slot changes and new slot has fewer available seats
      if (field === "selectedSlot") {
        const slot = availability.find(a => a.id === value)
        if (slot && next.people > slot.available_slots) {
          next.people = slot.available_slots
        }
      }
      return next
    })
  }

  const selectedAvailability = availability.find(a => a.id === form.selectedSlot)
  const maxAllowed = selectedAvailability?.available_slots || tour.max_guests
  const pricePerPerson = selectedAvailability?.price || tour.base_price
  const totalPrice = pricePerPerson * form.people

  function incrementPeople() {
    if (form.people >= maxAllowed) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      toast.error(`Only ${maxAllowed} slot${maxAllowed > 1 ? "s" : ""} available for this date`)
      return
    }
    update("people", form.people + 1)
  }

  function decrementPeople() {
    if (form.people <= 1) return
    update("people", form.people - 1)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.phone) {
      toast.error("Please fill all required fields")
      return
    }
    setSubmitted(true)
    toast.success("Booking confirmed! 🎉")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/itinerary/packages" className="transition-colors hover:text-[#3FB8FF]">Tours</Link>
          <ChevronRight className="size-3 shrink-0" />
          <Link href={detailHref} className="transition-colors hover:text-[#3FB8FF] truncate max-w-[140px]">{tour.title}</Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-gray-800 font-semibold">Booking</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessView tour={tour} detailHref={detailHref} totalPrice={totalPrice} form={form} />
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -40 }} className="space-y-6 sm:space-y-8">
              {/* Header */}
              <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
                <Link href={detailHref} className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#3FB8FF] transition-colors mb-3">
                  <ArrowLeft className="size-3" /> Back to tour details
                </Link>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">
                  Complete Your <span style={{ color: "#3FB8FF" }}>Booking</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Fill in your details to reserve {tour.title}</p>
              </motion.div>

              {/* Tour mini card */}
              <motion.div className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-gray-100 p-3 sm:p-4" style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.06)" }} {...fadeUp} transition={{ delay: 0.1 }}>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-800 truncate">{tour.title}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="flex items-center gap-1 text-[11px] text-gray-400"><MapPin className="size-2.5" /> {tour.destination}</span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400"><Clock className="size-2.5" /> {duration}</span>
                    {tour.avg_rating > 0 && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: "#FBAB18" }}>
                        <Star className="size-2.5" style={{ fill: "#FBAB18" }} /> {tour.avg_rating}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Left — form fields */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Personal Details */}
                    <motion.div className="rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-4" style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.04)" }} {...fadeUp} transition={{ delay: 0.15 }}>
                      <h2 className="font-bold text-sm flex items-center gap-2 text-gray-800">
                        <User className="size-4" style={{ color: "#3FB8FF" }} /> Personal Details
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}><User className="size-3" /> Full Name *</label>
                          <input value={form.fullName} onChange={e => update("fullName", e.target.value)} placeholder="John Doe" className={inputClass} style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties} required />
                        </div>
                        <div>
                          <label className={labelClass}><Mail className="size-3" /> Email Address *</label>
                          <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="john@example.com" className={inputClass} style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties} required />
                        </div>
                        <div>
                          <label className={labelClass}><Phone className="size-3" /> Phone Number *</label>
                          <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 98765 43210" className={inputClass} style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties} required />
                        </div>
                        <div>
                          <label className={labelClass}><Users className="size-3" /> Number of Travellers</label>
                          <motion.div
                            className="flex items-center gap-3"
                            animate={shake ? { x: [0, -6, 6, -4, 4, -2, 2, 0] } : {}}
                            transition={{ duration: 0.4 }}
                          >
                            <motion.button
                              type="button"
                              onClick={decrementPeople}
                              className="size-10 rounded-xl border border-gray-200 flex items-center justify-center text-lg font-bold hover:bg-gray-50 cursor-pointer text-gray-600"
                              whileTap={{ scale: 0.9 }}
                              style={{ opacity: form.people <= 1 ? 0.4 : 1 }}
                            >
                              −
                            </motion.button>
                            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                              <AnimatePresence mode="popLayout">
                                <motion.span
                                  key={form.people}
                                  className="text-xl font-extrabold text-gray-800 absolute"
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -20, opacity: 0 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                  {form.people}
                                </motion.span>
                              </AnimatePresence>
                            </div>
                            <motion.button
                              type="button"
                              onClick={incrementPeople}
                              className="size-10 rounded-xl border border-gray-200 flex items-center justify-center text-lg font-bold hover:bg-gray-50 cursor-pointer text-gray-600"
                              whileTap={{ scale: 0.9 }}
                              style={{
                                opacity: form.people >= maxAllowed ? 0.4 : 1,
                                borderColor: form.people >= maxAllowed ? "#ef444450" : undefined,
                              }}
                            >
                              +
                            </motion.button>
                          </motion.div>
                          <p className="text-[10px] text-gray-400 mt-1.5">
                            <AnimatedValue value={`${maxAllowed} slot${maxAllowed > 1 ? "s" : ""} available`} className="text-gray-400" />
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Select Date Slot */}
                    {availability.filter(a => a.status === "available").length > 0 && (
                      <motion.div className="rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-4" style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.04)" }} {...fadeUp} transition={{ delay: 0.2 }}>
                        <h2 className="font-bold text-sm flex items-center gap-2 text-gray-800">
                          <CalendarDays className="size-4" style={{ color: "#3FB8FF" }} /> Select Travel Date
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {availability.filter(a => a.status === "available").map(slot => (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => update("selectedSlot", slot.id)}
                              className="p-3 rounded-xl border text-left transition-all cursor-pointer"
                              style={form.selectedSlot === slot.id
                                ? { borderColor: "#3FB8FF", background: "#3FB8FF08" }
                                : { borderColor: "#e5e7eb" }
                              }
                            >
                              <p className="text-xs font-bold text-gray-800">
                                {new Date(slot.start_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – {new Date(slot.end_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-0.5">{slot.available_slots} slots • ₹{slot.price.toLocaleString()}/person</p>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Special Requests */}
                    <motion.div className="rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-4" style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.04)" }} {...fadeUp} transition={{ delay: 0.25 }}>
                      <h2 className="font-bold text-sm flex items-center gap-2 text-gray-800">
                        <MessageSquare className="size-4" style={{ color: "#3FB8FF" }} /> Special Requests
                      </h2>
                      <textarea value={form.specialRequests} onChange={e => update("specialRequests", e.target.value)} placeholder="Any dietary requirements, accessibility needs..." rows={3} className={`${inputClass} resize-none`} style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties} />
                    </motion.div>

                    {/* Submit — mobile */}
                    <motion.div className="lg:hidden" {...fadeUp} transition={{ delay: 0.3 }}>
                      <motion.button type="submit" className="w-full text-white font-bold py-3.5 rounded-xl text-sm cursor-pointer" style={{ background: "#3FB8FF" }} whileHover={{ scale: 1.02, boxShadow: "0 6px 20px 0 rgba(63,184,255,0.35)" }} whileTap={{ scale: 0.98 }}>
                        Confirm Booking — ₹{totalPrice.toLocaleString()}
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Right — price summary */}
                  <div className="lg:col-span-1">
                    <motion.div className="sticky top-6 bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 space-y-4" style={{ boxShadow: "0 4px 24px 0 rgba(63,184,255,0.10)" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                      <h3 className="font-bold text-sm text-gray-800">Price Summary</h3>
                      <div className="space-y-2.5 text-xs text-gray-400">
                        <div className="flex justify-between items-center">
                          <span>Price per person</span>
                          <AnimatedValue value={`₹${pricePerPerson.toLocaleString()}`} className="text-gray-800" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Travellers</span>
                          <AnimatedValue value={`${form.people}`} className="font-semibold text-gray-800" />
                        </div>
                        <div className="flex justify-between"><span>Duration</span><span className="font-semibold text-gray-800">{duration}</span></div>
                        {selectedAvailability && (
                          <>
                            <div className="flex justify-between items-center">
                              <span>Travel Date</span>
                              <AnimatedValue value={`${new Date(selectedAvailability.start_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${new Date(selectedAvailability.end_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`} className="font-semibold text-gray-800" />
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Slots Available</span>
                              <AnimatedValue value={`${selectedAvailability.available_slots} of ${selectedAvailability.total_slots}`} className="font-semibold text-green-600" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Amount</p>
                          <span className="relative inline-flex items-center h-8 overflow-hidden">
                            <AnimatePresence mode="popLayout">
                              <motion.span
                                key={totalPrice}
                                className="text-2xl font-extrabold whitespace-nowrap"
                                style={{ color: "#3FB8FF" }}
                                initial={{ y: 24, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: -24, opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              >
                                ₹{totalPrice.toLocaleString()}
                              </motion.span>
                            </AnimatePresence>
                          </span>
                        </div>
                        <AnimatedValue value={`${form.people} person${form.people > 1 ? "s" : ""}`} className="text-[10px] text-gray-400" />
                      </div>

                      <motion.button type="submit" onClick={handleSubmit} className="hidden lg:block w-full text-white font-bold py-3 rounded-xl text-sm cursor-pointer" style={{ background: "#3FB8FF" }} whileHover={{ scale: 1.02, boxShadow: "0 6px 20px 0 rgba(63,184,255,0.35)" }} whileTap={{ scale: 0.98 }}>
                        Confirm Booking
                      </motion.button>

                      <div className="flex items-center justify-center gap-3 pt-1">
                        <span className="flex items-center gap-1 text-[10px] text-gray-400"><Shield className="size-3" style={{ color: "#3FB8FF" }} /> Secure Payment</span>
                        <span className="size-0.5 rounded-full bg-gray-300" />
                        <span className="text-[10px] text-gray-400">Free Cancellation</span>
                      </div>

                      <Link href={detailHref} className="block text-center text-xs text-gray-400 transition-colors hover:text-[#3FB8FF]">← Back to tour details</Link>
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

/* Success View */
function SuccessView({ tour, detailHref, totalPrice, form }: {
  tour: TourPackage["tour"]
  detailHref: string
  totalPrice: number
  form: { fullName: string; email: string; people: number }
}) {
  return (
    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="max-w-lg mx-auto py-12 sm:py-20 text-center space-y-6">
      <motion.div className="mx-auto size-20 rounded-full flex items-center justify-center" style={{ background: "#3FB8FF15" }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }}>
        <CheckCircle2 className="size-10" style={{ color: "#3FB8FF" }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl font-extrabold text-gray-800">Booking Confirmed!</h2>
        <p className="text-sm text-gray-400 mt-2">Thank you, {form.fullName.split(" ")[0]}! Your trip to {tour.destination} is booked.</p>
      </motion.div>
      <motion.div className="rounded-2xl border border-gray-100 p-5 text-left space-y-3 mx-auto" style={{ boxShadow: "0 4px 24px 0 rgba(63,184,255,0.08)" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="font-bold text-sm text-gray-800">{tour.title}</p>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex justify-between"><span>Travellers</span><span className="font-semibold text-gray-800">{form.people} person{form.people > 1 ? "s" : ""}</span></div>
          <div className="flex justify-between"><span>Confirmation sent to</span><span className="font-semibold text-gray-800 truncate max-w-[180px]">{form.email}</span></div>
          <div className="h-px bg-gray-100" />
          <div className="flex justify-between items-center"><span className="font-bold text-gray-800">Total Paid</span><span className="text-lg font-extrabold" style={{ color: "#3FB8FF" }}>₹{totalPrice.toLocaleString()}</span></div>
        </div>
      </motion.div>
      <motion.div className="flex flex-col sm:flex-row gap-3 justify-center pt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Link href={detailHref} className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">View Tour</Link>
        <Link href="/itinerary/packages" className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-colors" style={{ background: "#3FB8FF" }}>Explore More Tours</Link>
      </motion.div>
    </motion.div>
  )
}
