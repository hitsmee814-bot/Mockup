"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  ArrowLeft, CreditCard, Shield, Lock, User, Mail, Phone,
  Check, Loader2, Star, Info, BedDouble, Clock, MapPin, Calendar,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { hotels } from "./data"
import { Header } from "./header"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, type: "spring" as const, stiffness: 200, damping: 24 },
})

export function HotelBilling({ id }: { id: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hotel = hotels.find((h) => h.id === id)
  const roomId = searchParams.get("room") || hotel?.roomTypes[0]?.id
  const nights = parseInt(searchParams.get("nights") || "3")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [processing, setProcessing] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  if (!hotel) {
    return (<div className="force-light"><Header title="Hotel" /><div className="p-8 text-center text-gray-400">Hotel not found.</div></div>)
  }

  const room = hotel.roomTypes.find((r) => r.id === roomId) || hotel.roomTypes[0]
  const subtotal = room.price * nights
  const taxes = Math.round(subtotal * 0.14)
  const serviceFee = 35
  const total = subtotal + taxes + serviceFee

  const handlePay = () => { setProcessing(true); setTimeout(() => { setProcessing(false); setConfirmed(true) }, 2500) }

  const fareRows = [
    { label: `${room.name} × ${nights} nights`, value: `$${subtotal}`, tip: `$${room.price}/night × ${nights} nights` },
    { label: "Taxes & Fees", value: `$${taxes}`, tip: "Local taxes and resort fees" },
    { label: "Service Fee", value: `$${serviceFee}`, tip: "Platform booking fee" },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <div className="force-light">
        {/* <Header title="Hotel" /> */}

        <AnimatePresence>
          {processing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin" style={{ color: "#3FB8FF" }} />
                <p className="text-lg font-semibold text-gray-800">Processing payment...</p>
                <p className="text-sm text-gray-400">Please do not close this page</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {confirmed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
              <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="flex flex-col items-center gap-5 text-center max-w-sm mx-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 300 }} className="h-20 w-20 rounded-full flex items-center justify-center" style={{ background: "#3FB8FF15" }}>
                  <Check className="h-10 w-10" style={{ color: "#3FB8FF" }} />
                </motion.div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">Booking Confirmed!</p>
                  <p className="text-sm text-gray-400 mt-2">Your stay at {hotel.name} has been booked for {nights} nights.</p>
                  <p className="text-xs text-gray-400 mt-1">Confirmation sent to your email.</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <Button variant="outline" onClick={() => router.push("/hotel")}>Search More</Button>
                  <Button className="text-white" style={{ background: "#3FB8FF" }} onClick={() => router.push("/hotel")}>Done</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => router.back()}><ArrowLeft className="h-4 w-4" /></Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink className="cursor-pointer" onClick={() => router.push("/hotel")}>Hotels</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink className="cursor-pointer" onClick={() => router.back()}>Details</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Payment</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1 space-y-5">
              {/* Hotel summary */}
              <motion.div {...fadeUp(0)}>
                <Card className="p-4 border border-gray-100 shadow-sm bg-gray-50/50">
                  <div className="flex items-center gap-4">
                    <motion.span className="text-4xl" initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ type: "spring" }}>{hotel.image}</motion.span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{hotel.name}</p>
                        <div className="flex">
                          {Array.from({ length: hotel.stars }).map((_, i) => (
                            <Star key={i} className="h-2.5 w-2.5" style={{ fill: "#FBAB18", color: "#FBAB18" }} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {hotel.location}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-0.5"><BedDouble className="h-3 w-3" /> {room.name}</span>
                        <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" /> {nights} nights</span>
                        <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {hotel.checkIn} – {hotel.checkOut}</span>
                      </div>
                    </div>
                    {hotel.freeCancellation && <Badge className="text-[10px] text-white shrink-0" style={{ background: "#3FB8FF" }}>Free Cancel</Badge>}
                  </div>
                </Card>
              </motion.div>

              {/* Guest Details */}
              <motion.div {...fadeUp(0.06)}>
                <Card className="p-5 md:p-6 border border-gray-100 shadow-md">
                  <h3 className="font-bold text-base mb-4 flex items-center gap-2"><User className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Guest Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "First Name", placeholder: "John", type: "text" },
                      { label: "Last Name", placeholder: "Doe", type: "text" },
                      { label: "Email", placeholder: "john@example.com", type: "email", icon: Mail },
                      { label: "Phone", placeholder: "+1 (555) 000-0000", type: "tel", icon: Phone },
                    ].map((field, i) => (
                      <motion.div key={field.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04, type: "spring", stiffness: 220 }}>
                        <Label className="text-sm mb-1.5 block flex items-center gap-1">
                          {field.icon && <field.icon className="h-3 w-3" />} {field.label}
                        </Label>
                        <Input type={field.type} placeholder={field.placeholder} className="h-10" />
                      </motion.div>
                    ))}
                    <motion.div className="sm:col-span-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, type: "spring", stiffness: 220 }}>
                      <Label className="text-sm mb-1.5 block">Special Requests (optional)</Label>
                      <Textarea placeholder="Early check-in, extra pillows, etc." className="resize-none" rows={2} />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>

              {/* Payment Method */}
              <motion.div {...fadeUp(0.12)}>
                <Card className="p-5 md:p-6 border border-gray-100 shadow-md">
                  <h3 className="font-bold text-base mb-4 flex items-center gap-2"><CreditCard className="h-4 w-4" style={{ color: "#3FB8FF" }} /> Payment Method</h3>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3 mb-5">
                    {[
                      { value: "card", label: "Credit / Debit Card", icon: "💳" },
                      { value: "upi", label: "UPI", icon: "📱" },
                      { value: "netbanking", label: "Net Banking", icon: "🏦" },
                      { value: "paylater", label: "Pay at Hotel", icon: "🏨" },
                    ].map((m, i) => (
                      <motion.label
                        key={m.value}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.16 + i * 0.05, type: "spring", stiffness: 220 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                          "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all",
                          paymentMethod === m.value ? "border-[#3FB8FF] bg-[#3FB8FF]/5 shadow-sm" : "border-gray-100 hover:border-gray-200"
                        )}
                      >
                        <RadioGroupItem value={m.value} />
                        <span className="text-lg">{m.icon}</span>
                        <span className="text-sm font-medium">{m.label}</span>
                      </motion.label>
                    ))}
                  </RadioGroup>

                  <AnimatePresence mode="wait">
                    {paymentMethod === "card" && (
                      <motion.div key="card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                        <div><Label className="text-sm mb-1.5 block">Card Number</Label><Input placeholder="4242 4242 4242 4242" className="h-10" /></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><Label className="text-sm mb-1.5 block">Expiry</Label><Input placeholder="MM / YY" className="h-10" /></div>
                          <div><Label className="text-sm mb-1.5 block">CVV</Label><Input type="password" placeholder="•••" className="h-10" /></div>
                        </div>
                        <div><Label className="text-sm mb-1.5 block">Name on Card</Label><Input placeholder="John Doe" className="h-10" /></div>
                      </motion.div>
                    )}
                    {paymentMethod === "upi" && (
                      <motion.div key="upi" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <Label className="text-sm mb-1.5 block">UPI ID</Label><Input placeholder="yourname@upi" className="h-10" />
                      </motion.div>
                    )}
                    {paymentMethod === "netbanking" && (
                      <motion.div key="netbanking" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <p className="text-sm text-gray-400">You will be redirected to your bank&apos;s website to complete the payment.</p>
                      </motion.div>
                    )}
                    {paymentMethod === "paylater" && (
                      <motion.div key="paylater" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <p className="text-sm text-gray-400">No payment required now. Pay directly at the hotel during check-in.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            </div>

            {/* Fare Summary Sticky */}
            <div className="lg:w-96">
              <motion.div {...fadeUp(0.16)} className="lg:sticky lg:top-8">
                <Card className="border border-gray-100 shadow-md overflow-hidden">
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-4">Price Summary</h3>
                    <div className="space-y-1">
                      {fareRows.map((row, i) => (
                        <Tooltip key={row.label}>
                          <TooltipTrigger asChild>
                            <motion.div
                              className="flex justify-between text-sm py-2 px-2 rounded-lg cursor-default hover:bg-gray-50/80 transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 220 }}
                            >
                              <span className="text-gray-400">{row.label}</span>
                              <motion.span className="font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.08 }}>{row.value}</motion.span>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent side="left">{row.tip}</TooltipContent>
                        </Tooltip>
                      ))}
                      <Separator className="my-2" />
                      <motion.div className="flex justify-between items-center px-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, type: "spring" }}>
                        <span className="font-bold">Total</span>
                        <motion.span className="text-xl font-extrabold" style={{ color: "#3FB8FF" }} initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: 0.65, type: "spring", stiffness: 300, damping: 15 }}>
                          ${total}
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full h-11 gap-2 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow" style={{ background: "#3FB8FF" }} onClick={handlePay} disabled={processing}>
                        <Lock className="h-4 w-4" /> {paymentMethod === "paylater" ? "Confirm Booking" : `Pay $${total}`}
                      </Button>
                    </motion.div>
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                      <Shield className="h-3 w-3" /><span>Secure payment · 256-bit SSL encrypted</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
