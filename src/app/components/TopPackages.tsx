"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { tourService } from "@/services/ItineraryService"

interface Pkg {
  id: string
  name: string
  location: string
  image: string
  price: number
  duration: string
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&q=85",
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1000&q=85",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=85",
]

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`
}

function getDuration(days: number, nights: number) {
  if (days && nights) return `${days}D / ${nights}N`
  if (days) return `${days}D`
  if (nights) return `${nights}N`
  return "Flexible duration"
}

function PackageCard({ pkg, className = "" }: { pkg: Pkg; className?: string }) {
  return (
    <Link href={`/itinerary/packages/${pkg.id}`} className={`group relative block overflow-hidden rounded-2xl ${className}`}>
      <img src={pkg.image} alt={pkg.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/0" />

      <span className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-sm transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="h-4 w-4" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="mb-1 flex items-center gap-1 text-[11px] uppercase tracking-wide text-white/70">
          <MapPin className="h-3 w-3" />
          {pkg.location}
        </p>

        <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
          {pkg.name}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-white/70">
            {pkg.duration}
          </span>

          <span className="text-sm font-bold">
            {formatPrice(pkg.price)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function TopPackages() {
  const [packages, setPackages] = useState<Pkg[]>([])
  const [activePackage, setActivePackage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const imageUrls: string[] = []

    const loadPackages = async () => {
      try {
        const tours = await tourService.getAll()

        if (!mounted || !tours.length) {
          setLoading(false)
          return
        }

const mapped: Pkg[] = []

for (let i = 0; i < tours.length; i++) {
  const tourData = tours[i] as any
  const tour = tourData.tour
  const availability = tourData.availability ?? []
  const images = tourData.images ?? []

  if (!tour) continue

  const coverImage = images.find((image: any) => image.is_cover === true)

  let image = ""

  if (coverImage?.image_url) {
    image = await tourService.getImageBlob(coverImage.image_url)

    if (image) {
      imageUrls.push(image)
    }
  }

  mapped.push({
    id: String(tour.id),
    name: tour.title,
    location: tour.destination || tour.origin_city || "India",
    image: image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    price: availability[0]?.price ?? tour.base_price ?? 0,
    duration: getDuration(tour.duration_days, tour.duration_nights),
  })
}

        if (!mounted) return

        // Backend currently returns 3 packages.
        // Duplicate the first 2 to create a 5-card layout.
        const displayPackages = [...mapped]

        if (mapped.length > 0 && displayPackages.length < 5) {
          let duplicateIndex = 0

          while (displayPackages.length < 5) {
            const source = mapped[duplicateIndex % mapped.length]

            displayPackages.push({
              ...source,
              id: `${source.id}-duplicate-${displayPackages.length}`,
            })

            duplicateIndex++
          }
        }

        setPackages(displayPackages.slice(0, 5))
      } catch (error) {
        console.error("Failed to load top packages:", error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadPackages()

    return () => {
      mounted = false
      imageUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

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

  if (loading) {
    return (
      <section id="toppackages" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="mx-auto mt-8 h-5 max-w-xl animate-pulse rounded bg-muted" />

          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-[300px] animate-pulse rounded-2xl bg-muted lg:h-[330px]" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!packages.length) {
    return null
  }

  return (
    <section id="toppackages" className="relative overflow-hidden py-16 sm:py-20 lg:pt-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

            <button onClick={previousPackage} aria-label="Previous destination" className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0E40C7] shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button onClick={nextPackage} aria-label="Next destination" className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0E40C7] shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {packages.map((pkg, index) => (
              <button key={`${pkg.id}-${index}`} onClick={() => setActivePackage(index)} aria-label={`Go to ${pkg.name}`} className="flex h-5 items-center justify-center">
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
          <div className="grid grid-rows-2 gap-3 lg:h-[680px]">
            <PackageCard pkg={packages[0]} className="h-[300px] sm:h-[340px] lg:h-full" />
            <PackageCard pkg={packages[1]} className="h-[300px] sm:h-[340px] lg:h-full" />
          </div>

          <div className="grid gap-3 lg:h-[680px] lg:grid-rows-[450px_218px]">
            <PackageCard pkg={packages[2 % packages.length]} className="h-[300px] sm:h-[340px] lg:h-full" />
            <PackageCard pkg={packages[3 % packages.length]} className="h-[300px] sm:h-[340px] lg:h-full" />
          </div>

          <div className="grid grid-rows-2 gap-3 lg:h-[680px]">
            <PackageCard pkg={packages[4 % packages.length]} className="h-[300px] sm:h-[340px] lg:h-full" />
            <PackageCard pkg={packages[1 % packages.length]} className="h-[300px] sm:h-[340px] lg:h-full" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-10 flex justify-center sm:mt-12">
          <Link href="/itinerary/packages" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:border-[#0E40C7] hover:text-[#0E40C7]">
            Explore all packages
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}