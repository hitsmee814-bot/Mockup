"use client"

import { TravelPackage } from "./types"
import {
  Star, Clock, MapPin, CheckCircle2, ChevronRight, Calendar,
  Shield, XCircle, Tag, Eye, Map, MessageCircle, ChevronLeft,
  ImageIcon,
  ArrowLeft,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ItineraryStepper } from "./ItineraryStepper"
import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

interface PackageDetailPageProps {
  pkg: TravelPackage
  tripType?: string
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function PackageDetailPage({ pkg, tripType }: PackageDetailPageProps) {
  const router = useRouter()
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
  const [currentImg, setCurrentImg] = useState(0)

  const backHref = tripType
    ? `/Mockup/itinerary/packages?tripType=${encodeURIComponent(tripType)}`
    : "/Mockup/itinerary/packages"

  const bookingHref = tripType
    ? `/Mockup/itinerary/packages/${pkg.id}/booking?tripType=${encodeURIComponent(tripType)}`
    : `/Mockup/itinerary/packages/${pkg.id}/booking`

  const breadcrumbLabel = tripType ?? "All"
  const images = pkg.images?.length ? pkg.images : [pkg.image]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
<div className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-2">
  <div className="flex items-center gap-3">

    {/* <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-full"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button> */}

    <Breadcrumb>
      <BreadcrumbList>

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/packages">Itineraries</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {tripType && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={backHref} className="capitalize">
                  {tripType}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
          </>
        )}

        <BreadcrumbItem>
          <BreadcrumbPage className="truncate max-w-[150px] sm:max-w-xs">
            {pkg.name}
          </BreadcrumbPage>
        </BreadcrumbItem>

      </BreadcrumbList>
    </Breadcrumb>

  </div>
</div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 sm:space-y-8">

        {/* Image Gallery */}
        <motion.div
          className="relative h-48 sm:h-72 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImg}
              src={images[currentImg]}
              alt={pkg.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onError={e => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.id}-${currentImg}/1200/600`
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Gallery nav */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImg(i => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => setCurrentImg(i => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
              <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`size-2 rounded-full transition-all cursor-pointer ${i === currentImg ? "bg-white scale-125" : "bg-white/50"}`}
                  />
                ))}
              </div>
              <span className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 bg-black/40 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                <ImageIcon className="size-3" /> {currentImg + 1}/{images.length}
              </span>
            </>
          )}

          {/* Hero overlay text */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-1.5 text-white/80 text-xs mb-1.5">
              <MapPin className="size-3" /> {pkg.destination}, {pkg.country}
            </div>
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">{pkg.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#FBAB18" }}>
                <Star className="size-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} /> {pkg.rating} ({pkg.reviews} reviews)
              </span>
              <span className="flex items-center gap-1 text-white/70 text-xs">
                <Clock className="size-3" /> {pkg.duration}
              </span>
            </div>
          </motion.div>
          <motion.span
            className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-lg text-white"
            style={{ background: "#FBAB18" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 300 }}
          >
            {discount}% OFF
          </motion.span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">

            {/* Tags */}
            {pkg.tags?.length > 0 && (
              <motion.div className="flex flex-wrap gap-2" {...fadeUp} transition={{ delay: 0.1 }}>
                {pkg.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                    style={{ background: "#FBAB1810", color: "#B8780F", borderColor: "#FBAB1825" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.12 + i * 0.04 }}
                  >
                    <Tag className="size-2.5" /> {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Categories */}
            <motion.div className="flex flex-wrap gap-2" {...fadeUp} transition={{ delay: 0.15 }}>
              {pkg.categories.map((cat, i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  <Link
                    href={`/packages?tripType=${encodeURIComponent(cat)}`}
                    className="text-xs font-semibold px-3 py-1 rounded-full border transition-all hover:shadow-md inline-block"
                    style={{ background: "#3FB8FF10", color: "#3FB8FF", borderColor: "#3FB8FF30" }}
                  >
                    {cat}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Overview */}
            {pkg.overview && (
              <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
                <h2 className="font-bold text-sm mb-2 flex items-center gap-2 text-gray-800">
                  <Eye className="size-4" style={{ color: "#3FB8FF" }} /> Overview
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">{pkg.overview}</p>
              </motion.div>
            )}

            {/* Inclusions */}
            <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
              <h2 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-800">
                <CheckCircle2 className="size-4" style={{ color: "#22c55e" }} /> What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.inclusions.map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2 text-xs rounded-xl px-3 py-2.5 border border-green-100 bg-green-50/50 text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.04 }}
                  >
                    <CheckCircle2 className="size-3.5 mt-0.5 shrink-0 text-green-500" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Exclusions */}
            {pkg.exclusions?.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.35 }}>
                <h2 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-800">
                  <XCircle className="size-4 text-red-400" /> What&apos;s Not Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.exclusions.map((item, i) => (
                    <motion.div
                      key={item}
                      className="flex items-start gap-2 text-xs rounded-xl px-3 py-2.5 border border-red-100 bg-red-50/40 text-gray-500"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.38 + i * 0.04 }}
                    >
                      <XCircle className="size-3.5 mt-0.5 shrink-0 text-red-400" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Map Section */}
            {pkg.locations?.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.38 }}>
                <h2 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-800">
                  <Map className="size-4" style={{ color: "#3FB8FF" }} /> Key Locations
                </h2>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pkg.locations.map((loc, i) => (
                    <span
                      key={loc.name}
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600"
                    >
                      <span
                        className="size-4 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0"
                        style={{ background: "#3FB8FF" }}
                      >{i + 1}</span>
                      {loc.name}
                    </span>
                  ))}
                </div>
                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                  <LeafletMap locations={pkg.locations} />
                </div>
              </motion.div>
            )}

            {/* Itinerary */}
            <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
              <h2 className="font-bold text-sm mb-5 flex items-center gap-2 text-gray-800">
                <Calendar className="size-4" style={{ color: "#3FB8FF" }} /> Day-by-Day Itinerary
              </h2>
              <ItineraryStepper itinerary={pkg.itinerary} packageId={pkg.id} />
            </motion.div>

            {/* Reviews */}
            {pkg.userReviews?.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.5 }}>
                <h2 className="font-bold text-sm mb-4 flex items-center gap-2 text-gray-800">
                  <MessageCircle className="size-4" style={{ color: "#3FB8FF" }} /> Traveller Reviews
                </h2>
                <div className="space-y-3">
                  {pkg.userReviews.map((review, i) => (
                    <motion.div
                      key={i}
                      className="rounded-2xl border border-gray-100 p-4 space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.52 + i * 0.08 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="size-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: "#3FB8FF" }}
                          >
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-800">{review.name}</p>
                            <p className="text-[10px] text-gray-400">
                              {new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, si) => (
                            <Star
                              key={si}
                              className="size-3"
                              style={{
                                fill: si < review.rating ? "#FBAB18" : "#e5e7eb",
                                color: si < review.rating ? "#FBAB18" : "#e5e7eb",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right — sticky booking card */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-6 bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 space-y-4"
              style={{ boxShadow: "0 4px 24px 0 rgba(63,184,255,0.10)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div>
                <p className="text-xs text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</p>
                <p className="text-3xl font-extrabold" style={{ color: "#3FB8FF" }}>₹{pkg.price.toLocaleString()}</p>
                <p className="text-xs text-gray-400">per person</p>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="space-y-2.5 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold text-gray-800">{pkg.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1">
                    <Star className="size-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} /> {pkg.rating}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Reviews</span>
                  <span className="font-semibold text-gray-800">{pkg.reviews}</span>
                </div>
              </div>
              <motion.button
                onClick={() => router.push(bookingHref)}
                className="w-full text-white font-bold py-3 rounded-xl text-sm cursor-pointer"
                style={{ background: "#3FB8FF" }}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px 0 rgba(63,184,255,0.35)" }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.button>

              <div className="flex items-center justify-center gap-3 pt-1">
                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Shield className="size-3" style={{ color: "#3FB8FF" }} /> Secure Booking
                </span>
                <span className="size-0.5 rounded-full bg-gray-300" />
                <span className="text-[10px] text-gray-400">Free Cancellation</span>
              </div>

              <Link
                href={backHref}
                className="block text-center text-xs text-gray-400 transition-colors hover:text-[#3FB8FF]"
              >
                ← Back to packages
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
