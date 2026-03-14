"use client"

import { TravelPackage } from "./types"
import { X, Star, Clock, MapPin, CheckCircle2, ChevronRight, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ItineraryStepper } from "./ItineraryStepper"
import { useRouter } from "next/navigation"

interface PackageDetailProps {
  pkg: TravelPackage | null
  onClose: () => void
}

export function PackageDetail({ pkg, onClose }: PackageDetailProps) {
  const router = useRouter()
  return (
    <AnimatePresence>
      {pkg && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-white border-l border-gray-100 z-50 flex flex-col overflow-hidden"
          >
            {/* Hero image */}
            <div className="relative h-56 shrink-0 bg-gray-100 overflow-hidden">
              <motion.img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onError={e => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.id}/600/400`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <motion.div
                className="absolute bottom-4 left-4 right-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="flex items-center gap-1.5 text-white/80 text-xs mb-1">
                  <MapPin className="size-3" /> {pkg.destination}, {pkg.country}
                </div>
                <h2 className="text-white text-xl font-extrabold leading-tight">{pkg.name}</h2>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#FBAB18" }}>
                    <Star className="size-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} /> {pkg.rating} ({pkg.reviews} reviews)
                  </span>
                  <span className="flex items-center gap-1 text-white/70 text-xs">
                    <Clock className="size-3" /> {pkg.duration}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* Price + CTA */}
              <motion.div
                className="flex items-center justify-between rounded-2xl p-4 border border-gray-100 bg-gray-50"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div>
                  <p className="text-xs text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</p>
                  <p className="text-2xl font-extrabold" style={{ color: "#3FB8FF" }}>₹{pkg.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">per person</p>
                </div>
                <motion.button
                  onClick={() => { onClose(); router.push(`/packages/${pkg.id}/booking`) }}
                  className="text-white font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer"
                  style={{ background: "#3FB8FF" }}
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 16px 0 rgba(63,184,255,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book Now
                </motion.button>
              </motion.div>

              {/* Categories */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {pkg.categories.map(cat => (
                  <span key={cat} className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ background: "#3FB8FF10", color: "#3FB8FF", borderColor: "#3FB8FF30" }}>
                    {cat}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-sm text-gray-500 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {pkg.shortDescription}
              </motion.p>

              {/* Inclusions */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-800">
                  <CheckCircle2 className="size-4" style={{ color: "#3FB8FF" }} /> What&apos;s Included
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {pkg.inclusions.map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100 text-gray-600 hover:border-[#3FB8FF30] transition-colors">
                      <span className="size-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "#3FB8FF12" }}>
                        <ChevronRight className="size-2.5" style={{ color: "#3FB8FF" }} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Itinerary */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-gray-800">
                  <Calendar className="size-4" style={{ color: "#3FB8FF" }} /> Day-by-Day Itinerary
                </h3>
                <ItineraryStepper itinerary={pkg.itinerary} packageId={pkg.id} />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
