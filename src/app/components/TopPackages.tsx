"use client"

import { useState } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Pkg {
  id: string
  name: string
  location: string
  image: string
  price: string
  originalPrice: string
  duration: string
  rating: number
  tag?: string
}

const packages: Pkg[] = [
  {
    id: "3",
    name: "Golden Triangle",
    location: "Delhi · Agra · Jaipur",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&q=85",
    price: "₹25,000",
    originalPrice: "₹32,000",
    duration: "4D / 3N",
    rating: 4.6,
    tag: "Bestseller",
  },
  {
    id: "5",
    name: "Kerala Backwaters",
    location: "Alleppey, India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=85",
    price: "₹30,000",
    originalPrice: "₹38,000",
    duration: "4D / 3N",
    rating: 4.8,
    tag: "Honeymoon",
  },
  {
    id: "9",
    name: "Ladakh Adventure",
    location: "Leh · Nubra Valley",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1000&q=85",
    price: "₹42,000",
    originalPrice: "₹50,000",
    duration: "6D / 5N",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Goa Beach Weekend",
    location: "Goa, India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000&q=85",
    price: "₹12,000",
    originalPrice: "₹16,000",
    duration: "3D / 2N",
    rating: 4.4,
  },
  {
    id: "7",
    name: "Varanasi Spiritual",
    location: "Varanasi, India",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1000&q=85",
    price: "₹15,000",
    originalPrice: "₹19,000",
    duration: "3D / 2N",
    rating: 4.5,
  },
  {
    id: "11",
    name: "Rajasthan Heritage",
    location: "Jaipur · Udaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1000&q=85",
    price: "₹35,000",
    originalPrice: "₹42,000",
    duration: "5D / 4N",
    rating: 4.7,
  },
]

interface PackageCardProps {
  pkg: Pkg
  className?: string
}

function PackageCard({ pkg, className = "" }: PackageCardProps) {
  return (
    <Link href={`/itinerary/packages/${pkg.id}`} className={`group relative block overflow-hidden rounded-2xl ${className}`}>
      <img src={pkg.image} alt={pkg.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/0" />

      <span className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-sm transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="h-4 w-4" />
      </span>

      {pkg.tag && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
          {pkg.tag}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="mb-1 flex items-center gap-1 text-[11px] uppercase tracking-wide text-white/70">
          <MapPin className="h-3 w-3" />
          {pkg.location}
        </p>

        <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
          {pkg.name}
        </h3>

        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xs text-white/70">
            {pkg.duration}
          </span>

          <div className="flex items-baseline gap-1.5">
            <span className="text-[11px] text-white/45 line-through">
              {pkg.originalPrice}
            </span>

            <span className="text-sm font-bold">
              {pkg.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function TopPackages() {
  const [activePackage, setActivePackage] = useState(0)

  const nextPackage = () => {
    setActivePackage((prev) => (prev + 1) % packages.length)
  }

  const previousPackage = () => {
    setActivePackage((prev) => (prev - 1 + packages.length) % packages.length)
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50

    if (info.offset.x < -swipeThreshold) {
      nextPackage()
    } else if (info.offset.x > swipeThreshold) {
      previousPackage()
    }
  }

  return (
    <section id="toppackages" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative z-10 mx-auto text-center">
          <div className="relative mx-auto w-fit">
            <h2 className="relative z-10 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Featured{" "}
              <span className="text-[#FBAB18]">
                Destinations.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mx-auto mb-10 mt-8 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:mb-12 sm:mt-12 sm:text-base">
          Handpicked travel experiences across India. Discover unforgettable places, curated packages, and journeys made for your next getaway.
        </motion.p>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activePackage} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12} onDragEnd={handleDragEnd} initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -70 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="cursor-grab active:cursor-grabbing">
                  <PackageCard pkg={packages[activePackage]} className="h-[390px] w-full sm:h-[440px]" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Previous */}
            <button onClick={previousPackage} aria-label="Previous destination" className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0E40C7] shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white">
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next */}
            <button onClick={nextPackage} aria-label="Next destination" className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0E40C7] shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {packages.map((pkg, index) => (
              <button key={pkg.id} onClick={() => setActivePackage(index)} aria-label={`Go to ${pkg.name}`} className="flex h-5 items-center justify-center">
                <span className={`h-1.5 rounded-full transition-all duration-300 ${index === activePackage ? "w-7 bg-[#FBAB18]" : "w-1.5 bg-[#0E40C7]/20"}`} />
              </button>
            ))}
          </div>

          <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Swipe to explore
          </p>
        </div>

        {/* DESKTOP / TABLET DESTINATION GRID */}
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-2 md:grid lg:grid-cols-3">
          {/* Column 1 */}
          <div className="grid grid-rows-2 gap-3 lg:h-[680px]">
            <PackageCard pkg={packages[0]} className="h-[300px] sm:h-[340px] lg:h-full" />
            <PackageCard pkg={packages[1]} className="h-[300px] sm:h-[340px] lg:h-full" />
          </div>

          {/* Column 2 */}
          <div className="grid gap-3 lg:h-[680px] lg:grid-rows-[450px_218px]">
            <PackageCard pkg={packages[2]} className="h-[300px] sm:h-[340px] lg:h-full" />
            <PackageCard pkg={packages[3]} className="h-[300px] sm:h-[340px] lg:h-full" />
          </div>

          {/* Column 3 */}
          <div className="grid grid-rows-2 gap-3 lg:h-[680px]">
            <PackageCard pkg={packages[4]} className="h-[300px] sm:h-[340px] lg:h-full" />
            <PackageCard pkg={packages[5]} className="h-[300px] sm:h-[340px] lg:h-full" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-10 flex justify-center sm:mt-12">
          <Link href="/itinerary/packages" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:border-[#0E40C7] hover:text-[#0E40C7]">
            Explore all packages
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Divider */}
        <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-16 h-px max-w-xs origin-center bg-gradient-to-r from-transparent via-[#0E40C7]/20 to-transparent" />
      </div>
    </section>
  )
}