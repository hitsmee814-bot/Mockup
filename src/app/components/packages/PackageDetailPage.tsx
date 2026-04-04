"use client"

import { TravelPackage } from "./types"
import {
  Star, Clock, MapPin, CheckCircle2, ChevronRight, Calendar, Users,
  Shield, XCircle, Tag, Map, Download, Share2,
  ChevronDown, Route, Package, Hotel, Utensils, AlertTriangle, Info,
  Compass, Eye, MessageCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ItineraryStepper } from "./ItineraryStepper"
import { ReviewsSection } from "./ReviewsSection"
import { EnquiryDialog } from "./EnquiryDialog"
import { useState } from "react"
import dynamic from "next/dynamic"
import type { Accommodation } from "./types"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

function AccommodationAccordion({ acc, index }: { acc: Accommodation; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className={`rounded-xl border overflow-hidden transition-colors ${
        open ? "border-primary/30 shadow-md shadow-primary/5" : "border-border"
      }`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 + index * 0.08 }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-card cursor-pointer text-left"
      >
        <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
          open ? "bg-primary text-white" : "bg-primary/10 text-primary"
        }`}>
          <Hotel className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground truncate">{acc.hotelName}</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="size-2.5" /> {acc.destination}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-muted-foreground shrink-0 mr-2">
          <span className="flex items-center gap-1"><Clock className="size-3 text-primary" /> {acc.nights}N</span>
          <span className="flex items-center gap-1"><Utensils className="size-3 text-secondary" /> {acc.mealPlan}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
          <ChevronDown className="size-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-border space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: MapPin, label: "Destination", value: acc.destination, color: "#ef4444" },
                  { icon: Hotel, label: "Property", value: acc.hotelName, color: "#3FB8FF" },
                  { icon: Clock, label: "Nights", value: `${acc.nights} ${acc.nights === 1 ? "Night" : "Nights"}`, color: "#8b5cf6" },
                  { icon: Utensils, label: "Meal Plan", value: acc.mealPlan, color: "#FBAB18" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="rounded-lg bg-muted/50 p-2.5 space-y-1"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-1.5">
                      <item.icon className="size-3" style={{ color: item.color }} />
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{item.label}</span>
                    </div>
                    <p className="text-xs font-semibold text-foreground leading-snug">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface Props {
  pkg: TravelPackage
  tripType?: string
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
}

export function PackageDetailPage({ pkg, tripType }: Props) {
  const router = useRouter()
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  const backHref = tripType ? `/itinerary/packages?tripType=${encodeURIComponent(tripType)}` : "/itinerary/packages"
  const bookingHref = tripType ? `/itinerary/packages/${pkg.id}/booking?tripType=${encodeURIComponent(tripType)}` : `/itinerary/packages/${pkg.id}/booking`
  const breadcrumbLabel = tripType ?? "All"
  const images = pkg.images?.length ? pkg.images : [pkg.image]

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: pkg.name, text: pkg.shortDescription, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  function handleDownload() {
    const text = `${pkg.name}\n${pkg.destination}, ${pkg.country}\n${pkg.duration}\n\nPrice: ₹${pkg.price.toLocaleString()} per person\n\n${pkg.overview}\n\nInclusions:\n${pkg.inclusions.map(i => `• ${i}`).join("\n")}\n\nExclusions:\n${pkg.exclusions.map(i => `• ${i}`).join("\n")}\n\nItinerary:\n${pkg.itinerary.map(d => `Day ${d.day}: ${d.title}\n${d.description}`).join("\n\n")}`
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `${pkg.name.replace(/\s+/g, "-")}-Brochure.txt`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
        <nav className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Link href="/itinerary/packages" className="hover:text-primary transition-colors">Packages</Link>
          <ChevronRight className="size-3 shrink-0" />
          <Link href={backHref} className="capitalize hover:text-primary transition-colors">{breadcrumbLabel}</Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-foreground font-semibold truncate">{pkg.name}</span>
        </nav>
      </div>

      {/* Hero Image Grid — asymmetric bento layout */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3 h-56 sm:h-72 md:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main large image — spans 2 cols, 2 rows */}
          <div className="relative col-span-2 row-span-2 overflow-hidden bg-muted">
            <img
              src={images[0]}
              alt={pkg.name}
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.id}-0/800/600` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <motion.div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-1.5 text-white/80 text-xs mb-1">
                <MapPin className="size-3" /> {pkg.destination}, {pkg.country}
              </div>
              <h1 className="text-white text-lg sm:text-xl md:text-2xl font-extrabold leading-tight">{pkg.name}</h1>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-secondary">
                  <Star className="size-3 fill-secondary text-secondary" /> {pkg.rating} ({pkg.reviews})
                </span>
                <span className="flex items-center gap-1 text-white/70 text-[11px]"><Clock className="size-3" /> {pkg.duration}</span>
              </div>
            </motion.div>
            <motion.span className="absolute top-3 left-3 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-lg text-white bg-secondary" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
              {discount}% OFF
            </motion.span>
          </div>

          {/* Top-right tall image — 1 col, 2 rows (if available) */}
          {images[1] && (
            <motion.div
              className="relative col-span-1 row-span-2 overflow-hidden bg-muted rounded-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <img src={images[1]} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.id}-1/400/600` }} />
            </motion.div>
          )}

          {/* Bottom-right small images — 1 col each, 1 row each */}
          {images[2] && (
            <motion.div
              className="relative col-span-1 row-span-1 overflow-hidden bg-muted rounded-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <img src={images[2]} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.id}-2/400/300` }} />
            </motion.div>
          )}
          {images[3] ? (
            <motion.div
              className="relative col-span-1 row-span-1 overflow-hidden bg-muted rounded-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <img src={images[3]} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.id}-3/400/300` }} />
              {images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">+{images.length - 4} more</span>
                </div>
              )}
            </motion.div>
          ) : null}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">

        {/* Mobile/Tablet: Booking card on top */}
        <motion.div
          className="lg:hidden rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-4 mb-6"
          style={{ boxShadow: "0 4px 32px 0 rgba(63,184,255,0.08)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString()}</p>
              <p className="text-2xl font-extrabold text-primary">₹{pkg.price.toLocaleString()}</p>
              <p className="text-[11px] text-muted-foreground">per person</p>
            </div>
            <div className="text-right text-[11px] text-muted-foreground space-y-0.5">
              <p className="font-semibold text-foreground">{pkg.duration}</p>
              <p className="flex items-center justify-end gap-1"><Star className="size-3 fill-secondary text-secondary" /> {pkg.rating} ({pkg.reviews})</p>
            </div>
          </div>

          {/* Mobile price breakdown */}
          {pkg.priceBreakdown?.length ? (
            <div>
              <button onClick={() => setShowBreakdown(o => !o)} className="flex items-center justify-between w-full text-xs font-semibold text-primary cursor-pointer py-1">
                <span>View Price Breakdown</span>
                <motion.div animate={{ rotate: showBreakdown ? 180 : 0 }} transition={{ duration: 0.25 }}><ChevronDown className="size-4" /></motion.div>
              </button>
              <AnimatePresence>
                {showBreakdown && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="pt-2 space-y-1.5 border-t border-border mt-2">
                      {pkg.priceBreakdown.map((item, i) => (
                        <motion.div key={item.label} className="flex justify-between text-xs" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-semibold text-foreground">₹{item.amount.toLocaleString()}</span>
                        </motion.div>
                      ))}
                      <div className="flex justify-between text-xs font-bold pt-1.5 border-t border-border">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary">₹{pkg.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : null}

          <div className="flex gap-2">
            <motion.button onClick={() => router.push(bookingHref)} className="flex-1 text-white font-bold py-3 rounded-xl text-sm cursor-pointer bg-primary" whileTap={{ scale: 0.98 }}>Book Now</motion.button>
            <motion.button onClick={() => setEnquiryOpen(true)} className="flex-1 font-bold py-3 rounded-xl text-sm cursor-pointer border border-primary text-primary bg-primary/5" whileTap={{ scale: 0.98 }}>Enquire</motion.button>
          </div>
          <div className="flex gap-2">
            <motion.button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border border-border bg-muted text-foreground cursor-pointer" whileTap={{ scale: 0.95 }}><Download className="size-3.5" /> Brochure</motion.button>
            <motion.button onClick={handleShare} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border border-border bg-muted text-foreground cursor-pointer" whileTap={{ scale: 0.95 }}><Share2 className="size-3.5" /> Share</motion.button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Shield className="size-3 text-primary" /> Secure Booking</span>
            <span className="size-0.5 rounded-full bg-border" />
            <span className="text-[10px] text-muted-foreground">Free Cancellation</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">

            {/* 1. Tour at a Glance */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-foreground">
                <Compass className="size-5 text-primary" /> Tour at a Glance
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: MapPin, label: "Destination", value: `${pkg.destination}, ${pkg.country}`, color: "#ef4444" },
                  { icon: Clock, label: "Duration", value: pkg.duration, color: "#3FB8FF" },
                  { icon: Route, label: "Route", value: pkg.route || "—", color: "#8b5cf6" },
                  { icon: Users, label: "Age Group", value: pkg.ageGroup || "All Ages", color: "#22c55e" },
                  { icon: Package, label: "Package Type", value: pkg.packageType || pkg.categories[0], color: "#FBAB18" },
                  { icon: Star, label: "Rating", value: `${pkg.rating} ★ (${pkg.reviews})`, color: "#FBAB18" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="rounded-xl border border-border bg-card p-3 sm:p-4 space-y-1.5"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.05 }}
                  >
                    <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: item.color + "15" }}>
                      <item.icon className="size-4" style={{ color: item.color }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{item.label}</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Tags */}
              {pkg.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {pkg.tags.map((tag, i) => (
                    <motion.span key={tag} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.03 }}>
                      <Tag className="size-2.5" /> {tag}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {pkg.overview && (
                <motion.div className="mt-5 rounded-xl border border-border bg-card p-4 sm:p-5" {...fadeUp} transition={{ delay: 0.25 }}>
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-foreground">
                    <Eye className="size-4 text-primary" /> Overview
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pkg.overview}</p>
                </motion.div>
              )}
            </motion.div>

            {/* 2. Map */}
            {pkg.locations?.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
                <h2 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2 text-foreground">
                  <Map className="size-5 text-primary" /> Route Map
                </h2>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pkg.locations.map((loc, i) => (
                    <span key={loc.name} className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground">
                      <span className="size-4 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-primary">{i + 1}</span>
                      {loc.name}
                    </span>
                  ))}
                </div>
                <div className="rounded-2xl border border-border overflow-hidden">
                  <LeafletMap locations={pkg.locations} />
                </div>
              </motion.div>
            )}

            {/* 3. Day-by-Day Itinerary */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <h2 className="font-bold text-base sm:text-lg mb-5 flex items-center gap-2 text-foreground">
                <Calendar className="size-5 text-primary" /> Day-by-Day Itinerary
              </h2>
              <ItineraryStepper itinerary={pkg.itinerary} packageId={pkg.id} />
            </motion.div>

            {/* 4. Accommodation */}
            {pkg.accommodations?.length ? (
              <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
                <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-foreground">
                  <Hotel className="size-5 text-primary" /> Accommodation Details
                </h2>
                <div className="space-y-2">
                  {pkg.accommodations.map((acc, i) => (
                    <AccommodationAccordion key={i} acc={acc} index={i} />
                  ))}
                </div>
                <motion.div className="mt-3 flex items-start gap-2 rounded-xl border border-secondary/20 bg-secondary/5 px-3 py-2.5" {...fadeUp} transition={{ delay: 0.35 }}>
                  <AlertTriangle className="size-4 text-secondary shrink-0 mt-0.5" />
                  <p className="text-[11px] text-secondary leading-relaxed">
                    Room allocation is subject to availability at the time of booking. Equivalent or upgraded properties may be provided.
                  </p>
                </motion.div>
              </motion.div>
            ) : null}

            {/* 5. Inclusions */}
            <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
              <h2 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2 text-foreground">
                <CheckCircle2 className="size-5 text-green-500" /> What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.inclusions.map((item, i) => (
                  <motion.div key={item} className="flex items-start gap-2 text-xs rounded-xl px-3 py-2.5 border border-green-500/10 bg-green-500/5 text-foreground" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.03 }}>
                    <CheckCircle2 className="size-3.5 mt-0.5 shrink-0 text-green-500" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 6. Exclusions */}
            {pkg.exclusions?.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.33 }}>
                <h2 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2 text-foreground">
                  <XCircle className="size-5 text-red-400" /> What&apos;s Not Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.exclusions.map((item, i) => (
                    <motion.div key={item} className="flex items-start gap-2 text-xs rounded-xl px-3 py-2.5 border border-red-400/10 bg-red-400/5 text-muted-foreground" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.03 }}>
                      <XCircle className="size-3.5 mt-0.5 shrink-0 text-red-400" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 6. Important Notes */}
            {pkg.importantNotes?.length ? (
              <motion.div {...fadeUp} transition={{ delay: 0.35 }}>
                <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-foreground">
                  <Info className="size-5 text-chart-3" /> Important Notes
                </h2>
                <div className="rounded-xl border border-chart-3/20 bg-chart-3/5 p-4 space-y-2.5">
                  {pkg.importantNotes.map((note, i) => (
                    <motion.div key={i} className="flex items-start gap-2 text-xs text-foreground/80" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.04 }}>
                      <span className="mt-1.5 size-1.5 rounded-full bg-chart-3 shrink-0" />
                      {note}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {/* 7. Travel Advisory */}
            {pkg.travelAdvisory?.length ? (
              <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
                <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-foreground">
                  <AlertTriangle className="size-5 text-secondary" /> Travel Advisory
                </h2>
                <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4 space-y-2.5">
                  {pkg.travelAdvisory.map((tip, i) => (
                    <motion.div key={i} className="flex items-start gap-2 text-xs text-foreground/80" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.04 }}>
                      <AlertTriangle className="size-3 mt-0.5 shrink-0 text-secondary" />
                      {tip}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {/* 8. Reviews */}
            {pkg.userReviews?.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.45 }}>
                <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-foreground">
                  <MessageCircle className="size-5 text-primary" /> Traveller Reviews
                </h2>
                <ReviewsSection reviews={pkg.userReviews} rating={pkg.rating} totalReviews={pkg.reviews} />
              </motion.div>
            )}

          </div>

          {/* ═══ RIGHT COLUMN — Sticky Booking Card (desktop only) ═══ */}
          <div className="hidden lg:block lg:col-span-1">
            <motion.div
              className="sticky top-6 rounded-2xl border border-border bg-card p-5 space-y-5"
              style={{ boxShadow: "0 4px 32px 0 rgba(63,184,255,0.08)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {/* Price */}
              <div>
                <p className="text-xs text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString()}</p>
                <p className="text-3xl font-extrabold text-primary">₹{pkg.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per person</p>
              </div>

              <div className="h-px bg-border" />

              {/* Quick info */}
              <div className="space-y-2.5 text-xs text-muted-foreground">
                <div className="flex justify-between"><span>Duration</span><span className="font-semibold text-foreground">{pkg.duration}</span></div>
                <div className="flex justify-between"><span>Rating</span><span className="font-semibold text-foreground flex items-center gap-1"><Star className="size-3 fill-secondary text-secondary" /> {pkg.rating}</span></div>
                <div className="flex justify-between"><span>Reviews</span><span className="font-semibold text-foreground">{pkg.reviews}</span></div>
              </div>

              {/* Price Breakdown Toggle */}
              {pkg.priceBreakdown?.length ? (
                <div>
                  <button
                    onClick={() => setShowBreakdown(o => !o)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-primary cursor-pointer py-1"
                  >
                    <span>View Price Breakdown</span>
                    <motion.div animate={{ rotate: showBreakdown ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="size-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {showBreakdown && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 space-y-2 border-t border-border mt-2">
                          {pkg.priceBreakdown.map((item, i) => (
                            <motion.div
                              key={item.label}
                              className="flex justify-between text-xs"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <span className="text-muted-foreground">{item.label}</span>
                              <span className="font-semibold text-foreground">₹{item.amount.toLocaleString()}</span>
                            </motion.div>
                          ))}
                          <div className="flex justify-between text-xs font-bold pt-2 border-t border-border">
                            <span className="text-foreground">Total</span>
                            <span className="text-primary">₹{pkg.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : null}

              {/* Book Now */}
              <motion.button
                onClick={() => router.push(bookingHref)}
                className="w-full text-white font-bold py-3 rounded-xl text-sm cursor-pointer bg-primary"
                whileHover={{ scale: 1.02, boxShadow: "0 6px 24px 0 rgba(63,184,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.button>

              {/* Enquiry */}
              <motion.button
                onClick={() => setEnquiryOpen(true)}
                className="w-full font-bold py-3 rounded-xl text-sm cursor-pointer border-2 border-primary text-primary bg-primary/5"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(63,184,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                Have a Question? Enquire Now
              </motion.button>

              {/* Download & Share */}
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border border-border bg-muted text-foreground cursor-pointer hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="size-3.5" /> Brochure
                </motion.button>
                <motion.button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border border-border bg-muted text-foreground cursor-pointer hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="size-3.5" /> Share
                </motion.button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Shield className="size-3 text-primary" /> Secure Booking
                </span>
                <span className="size-0.5 rounded-full bg-border" />
                <span className="text-[10px] text-muted-foreground">Free Cancellation</span>
              </div>

              <Link href={backHref} className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors">
                ← Back to packages
              </Link>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Enquiry Dialog */}
      <EnquiryDialog open={enquiryOpen} onOpenChange={setEnquiryOpen} packageName={pkg.name} />
    </div>
  )
}
