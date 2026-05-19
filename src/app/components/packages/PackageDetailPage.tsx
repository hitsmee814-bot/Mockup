"use client";

import { TourPackage } from "./types";
import {
  Star, Clock, MapPin, ChevronRight, Calendar, Users,
  Shield, ChevronDown, Hotel, Utensils, AlertTriangle,
  Compass, Share2, Download, MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ItineraryStepper } from "./ItineraryStepper";
import { EnquiryDialog } from "./EnquiryDialog";
import { useState } from "react";
import { TourImageView } from "./TourImageView";
import type { Accommodation } from "./types";

function AccommodationAccordion({ acc, index }: { acc: Accommodation; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={`rounded-xl border overflow-hidden transition-colors ${open ? "border-[#3FB8FF40] shadow-md" : "border-gray-200"}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 + index * 0.08 }}
    >
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 px-4 py-3.5 bg-white cursor-pointer text-left">
        <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${open ? "bg-[#3FB8FF] text-white" : "bg-[#3FB8FF15] text-[#3FB8FF]"}`}>
          <Hotel className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{acc.hotel_name}</p>
          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
            <MapPin className="size-2.5" /> {acc.location}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-gray-400 shrink-0 mr-2">
          <span className="flex items-center gap-1"><Clock className="size-3 text-[#3FB8FF]" /> {acc.nights}N</span>
          <span className="flex items-center gap-1"><Utensils className="size-3 text-[#FBAB18]" /> {acc.meal_plan}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
          <ChevronDown className="size-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-4 pb-4 pt-1 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: MapPin, label: "Location", value: acc.location, color: "#ef4444" },
                { icon: Hotel, label: "Hotel", value: acc.hotel_name, color: "#3FB8FF" },
                { icon: Clock, label: "Nights", value: `${acc.nights} Night${acc.nights > 1 ? "s" : ""}`, color: "#8b5cf6" },
                { icon: Utensils, label: "Meals", value: acc.meal_plan, color: "#FBAB18" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-gray-50 p-2.5 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <item.icon className="size-3" style={{ color: item.color }} />
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface Props {
  pkg: TourPackage;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

export function PackageDetailPage({ pkg }: Props) {
  const router = useRouter();
  const { tour, images, availability, accommodations, cancellation_policy, itinerary_days } = pkg;
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const coverImage = images.find((i) => i.is_cover) || images[0];
  const duration = `${tour.duration_nights}N/${tour.duration_days}D`;
  const availableSlots = availability.reduce((sum, a) => sum + a.available_slots, 0);
  const bookingHref = `/itinerary/packages/${tour.id}/booking`;

  // Collect all activity locations for map reference
  const allActivities = itinerary_days.flatMap((d) => d.activities);

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: tour.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/itinerary/packages" className="hover:text-[#3FB8FF] transition-colors">Tours</Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-gray-800 font-semibold truncate">{tour.title}</span>
        </nav>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="relative h-56 sm:h-72 md:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <TourImageView
            imageUrl={coverImage?.image_url}
            alt={tour.title}
            className="w-full h-full object-cover"
            fallbackSeed={`tour-${tour.id}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <motion.div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-1.5 text-white/80 text-xs mb-1">
              <MapPin className="size-3" /> {tour.destination} • From {tour.origin_city}
            </div>
            <h1 className="text-white text-lg sm:text-xl md:text-2xl font-extrabold leading-tight">{tour.title}</h1>
            <div className="flex items-center gap-3 mt-1.5">
              {tour.avg_rating > 0 && (
                <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: "#FBAB18" }}>
                  <Star className="size-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} /> {tour.avg_rating} ({tour.total_reviews})
                </span>
              )}
              <span className="flex items-center gap-1 text-white/70 text-[11px]"><Clock className="size-3" /> {duration}</span>
              <span className="flex items-center gap-1 text-white/70 text-[11px]"><Users className="size-3" /> Max {tour.max_guests}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Mobile booking card */}
        <motion.div
          className="lg:hidden rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 space-y-4 mb-6"
          style={{ boxShadow: "0 4px 32px 0 rgba(63,184,255,0.08)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-extrabold" style={{ color: "#3FB8FF" }}>₹{tour.base_price.toLocaleString()}</p>
              <p className="text-[11px] text-gray-400">per person</p>
            </div>
            <div className="text-right text-[11px] text-gray-400 space-y-0.5">
              <p className="font-semibold text-gray-800">{duration}</p>
              {availableSlots > 0 && <p className="text-green-600 font-semibold">{availableSlots} slots available</p>}
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button onClick={() => router.push(bookingHref)} className="flex-1 text-white font-bold py-3 rounded-xl text-sm cursor-pointer" style={{ background: "#3FB8FF" }} whileTap={{ scale: 0.98 }}>Book Now</motion.button>
            <motion.button onClick={() => setEnquiryOpen(true)} className="flex-1 font-bold py-3 rounded-xl text-sm cursor-pointer border-2 border-[#3FB8FF] text-[#3FB8FF]" whileTap={{ scale: 0.98 }}>Enquire</motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">

            {/* Tour at a Glance */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-gray-800">
                <Compass className="size-5 text-[#3FB8FF]" /> Tour at a Glance
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: MapPin, label: "Destination", value: tour.destination, color: "#ef4444" },
                  { icon: Clock, label: "Duration", value: duration, color: "#3FB8FF" },
                  { icon: Users, label: "Max Guests", value: `${tour.max_guests} people`, color: "#22c55e" },
                  { icon: Calendar, label: "Start Date", value: new Date(tour.start_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), color: "#8b5cf6" },
                  { icon: MapPin, label: "Origin", value: tour.origin_city, color: "#FBAB18" },
                  { icon: Star, label: "Rating", value: tour.avg_rating > 0 ? `${tour.avg_rating} ★ (${tour.total_reviews})` : "New", color: "#FBAB18" },
                ].map((item, i) => (
                  <motion.div key={item.label} className="rounded-xl border border-gray-100 bg-white p-3 sm:p-4 space-y-1.5" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 + i * 0.05 }}>
                    <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: item.color + "15" }}>
                      <item.icon className="size-4" style={{ color: item.color }} />
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{item.label}</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800 leading-snug">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description (HTML) */}
            {tour.description && (
              <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
                <h2 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2 text-gray-800">
                  <MessageCircle className="size-5 text-[#3FB8FF]" /> About This Tour
                </h2>
                <div
                  className="prose prose-sm max-w-none text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2"
                  dangerouslySetInnerHTML={{ __html: tour.description }}
                />
              </motion.div>
            )}

            {/* Itinerary */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <h2 className="font-bold text-base sm:text-lg mb-5 flex items-center gap-2 text-gray-800">
                <Calendar className="size-5 text-[#3FB8FF]" /> Day-by-Day Itinerary
              </h2>
              <ItineraryStepper itinerary={itinerary_days} tourId={tour.id} />
            </motion.div>

            {/* Accommodations */}
            {accommodations.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
                <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-gray-800">
                  <Hotel className="size-5 text-[#3FB8FF]" /> Accommodation
                </h2>
                <div className="space-y-2">
                  {accommodations.map((acc, i) => (
                    <AccommodationAccordion key={acc.id} acc={acc} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Cancellation Policy */}
            {cancellation_policy.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
                <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-gray-800">
                  <AlertTriangle className="size-5 text-[#FBAB18]" /> Cancellation Policy
                </h2>
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="text-left px-4 py-2.5 font-semibold">Days Before Departure</th>
                        <th className="text-right px-4 py-2.5 font-semibold">Refund</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cancellation_policy
                        .sort((a, b) => b.days_before - a.days_before)
                        .map((p) => (
                          <tr key={p.id} className="border-t border-gray-100">
                            <td className="px-4 py-2.5 text-gray-700">
                              {p.days_before === 0 ? "Day of departure" : `${p.days_before}+ days`}
                            </td>
                            <td className="px-4 py-2.5 text-right font-semibold" style={{ color: p.refund_percentage > 50 ? "#22c55e" : p.refund_percentage > 0 ? "#FBAB18" : "#ef4444" }}>
                              {p.refund_percentage}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Availability */}
            {availability.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.35 }}>
                <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-gray-800">
                  <Calendar className="size-5 text-[#3FB8FF]" /> Available Dates
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availability.map((slot) => (
                    <div key={slot.id} className="rounded-xl border border-gray-100 p-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-800">
                          {new Date(slot.start_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – {new Date(slot.end_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{slot.available_slots}/{slot.total_slots} slots available</p>
                      </div>
                      <p className="text-sm font-extrabold" style={{ color: "#3FB8FF" }}>₹{slot.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN — Sticky Booking (desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <motion.div
              className="sticky top-6 rounded-2xl border border-gray-100 bg-white p-5 space-y-5"
              style={{ boxShadow: "0 4px 32px 0 rgba(63,184,255,0.08)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div>
                <p className="text-3xl font-extrabold" style={{ color: "#3FB8FF" }}>₹{tour.base_price.toLocaleString()}</p>
                <p className="text-xs text-gray-400">per person</p>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="space-y-2.5 text-xs text-gray-400">
                <div className="flex justify-between"><span>Duration</span><span className="font-semibold text-gray-800">{duration}</span></div>
                <div className="flex justify-between"><span>Max Guests</span><span className="font-semibold text-gray-800">{tour.max_guests}</span></div>
                <div className="flex justify-between"><span>Availability</span><span className="font-semibold text-green-600">{availableSlots} slots</span></div>
                {tour.avg_rating > 0 && (
                  <div className="flex justify-between"><span>Rating</span><span className="font-semibold text-gray-800 flex items-center gap-1"><Star className="size-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} /> {tour.avg_rating}</span></div>
                )}
              </div>

              <motion.button
                onClick={() => router.push(bookingHref)}
                className="w-full text-white font-bold py-3 rounded-xl text-sm cursor-pointer"
                style={{ background: "#3FB8FF" }}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 24px 0 rgba(63,184,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.button>

              <motion.button
                onClick={() => setEnquiryOpen(true)}
                className="w-full font-bold py-3 rounded-xl text-sm cursor-pointer border-2 border-[#3FB8FF] text-[#3FB8FF]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enquire Now
              </motion.button>

              <div className="grid grid-cols-2 gap-2">
                <motion.button onClick={handleShare} className="flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 cursor-pointer" whileTap={{ scale: 0.95 }}>
                  <Share2 className="size-3.5" /> Share
                </motion.button>
                <motion.button className="flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 cursor-pointer" whileTap={{ scale: 0.95 }}>
                  <Download className="size-3.5" /> Brochure
                </motion.button>
              </div>

              <div className="flex items-center justify-center gap-3 pt-1">
                <span className="flex items-center gap-1 text-[10px] text-gray-400"><Shield className="size-3 text-[#3FB8FF]" /> Secure Booking</span>
                <span className="size-0.5 rounded-full bg-gray-300" />
                <span className="text-[10px] text-gray-400">Free Cancellation</span>
              </div>

              <Link href="/itinerary/packages" className="block text-center text-xs text-gray-400 hover:text-[#3FB8FF] transition-colors">
                ← Back to tours
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <EnquiryDialog open={enquiryOpen} onOpenChange={setEnquiryOpen} packageName={tour.title} />
    </div>
  );
}
