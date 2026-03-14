"use client"

import { TravelPackage } from "./types"
import { Star, Clock, MapPin, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface PackageCardProps {
  pkg: TravelPackage
  currentSearch?: string
}

export function PackageCard({ pkg, currentSearch }: PackageCardProps) {
  const router = useRouter()
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)

  function handleClick() {
    const qs = currentSearch ? `?${currentSearch}` : ""
    router.push(`/itinerary/packages/${pkg.id}${qs}`)
  }

  return (
    <motion.div
      onClick={handleClick}
      className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.06)" }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -8px rgba(63,184,255,0.18), 0 8px 16px -4px rgba(0,0,0,0.06)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative h-40 sm:h-52 bg-gray-100 overflow-hidden">
        <motion.img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.id}/400/300` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Discount badge */}
        <span className="absolute top-3 left-3 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-lg text-white" style={{ background: "#FBAB18" }}>
          {discount}% OFF
        </span>

        {/* Rating badge */}
        <span className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
          <Star className="size-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} />
          {pkg.rating}
        </span>

        {/* Duration */}
        <span className="absolute bottom-3 left-3 flex items-center gap-1 text-white/90 text-[11px] font-medium">
          <Clock className="size-3" /> {pkg.duration}
        </span>

        {/* Hover arrow */}
        <div className="absolute bottom-3 right-3 size-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-lg" style={{ background: "#3FB8FF" }}>
          <ArrowUpRight className="size-3.5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-2.5">
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">{pkg.destination}, {pkg.country}</span>
        </div>
        <h3 className="font-bold text-sm leading-snug line-clamp-1 text-gray-800">
          {pkg.name}
        </h3>
        <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{pkg.shortDescription}</p>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</p>
            <p className="text-base font-extrabold leading-tight" style={{ color: "#3FB8FF" }}>₹{pkg.price.toLocaleString()}</p>
            <p className="text-[10px] text-gray-400">per person</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 mb-0.5">{pkg.reviews} reviews</p>
            <div className="flex items-center gap-0.5 justify-end">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-2.5" style={{ fill: i < Math.floor(pkg.rating) ? "#FBAB18" : "#e5e7eb", color: i < Math.floor(pkg.rating) ? "#FBAB18" : "#e5e7eb" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
