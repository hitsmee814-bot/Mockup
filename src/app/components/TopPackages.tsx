"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ArrowRight, Clock, MapPin, ChevronLeft, ChevronRight, Sparkles, Plane } from "lucide-react"
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

const data: Record<"domestic" | "international", Pkg[]> = {
  domestic: [
    { id: "3", name: "Golden Triangle", location: "Delhi · Agra · Jaipur", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80", price: "₹25,000", originalPrice: "₹32,000", duration: "4D / 3N", rating: 4.6, tag: "Bestseller" },
    { id: "5", name: "Kerala Backwaters", location: "Alleppey, India", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80", price: "₹30,000", originalPrice: "₹38,000", duration: "4D / 3N", rating: 4.8, tag: "Honeymoon" },
    { id: "9", name: "Ladakh Adventure", location: "Leh · Nubra Valley", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80", price: "₹42,000", originalPrice: "₹50,000", duration: "6D / 5N", rating: 4.9 },
    { id: "4", name: "Goa Beach Weekend", location: "Goa, India", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", price: "₹12,000", originalPrice: "₹16,000", duration: "3D / 2N", rating: 4.4 },
    { id: "7", name: "Varanasi Spiritual", location: "Varanasi, India", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", price: "₹15,000", originalPrice: "₹19,000", duration: "3D / 2N", rating: 4.5 },
    { id: "11", name: "Rajasthan Heritage", location: "Jaipur · Udaipur", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80", price: "₹35,000", originalPrice: "₹42,000", duration: "5D / 4N", rating: 4.7 },
    { id: "12", name: "Andaman Islands", location: "Port Blair, India", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", price: "₹48,000", originalPrice: "₹55,000", duration: "5D / 4N", rating: 4.8, tag: "Trending" },
    { id: "13", name: "Kashmir Valley", location: "Srinagar · Gulmarg", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80", price: "₹32,000", originalPrice: "₹40,000", duration: "5D / 4N", rating: 4.9 },
    { id: "14", name: "Coorg Coffee Trail", location: "Coorg, Karnataka", image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80", price: "₹18,000", originalPrice: "₹22,000", duration: "3D / 2N", rating: 4.6 },
    { id: "15", name: "Himachal Escape", location: "Manali · Shimla", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80", price: "₹22,000", originalPrice: "₹28,000", duration: "4D / 3N", rating: 4.7 },
  ],
  international: [
    { id: "1", name: "Romantic Bali Escape", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", price: "₹65,000", originalPrice: "₹80,000", duration: "5D / 4N", rating: 4.7, tag: "Trending" },
    { id: "2", name: "Swiss Alps Adventure", location: "Interlaken, Switzerland", image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80", price: "₹1,80,000", originalPrice: "₹2,10,000", duration: "7D / 6N", rating: 4.9, tag: "Luxury" },
    { id: "6", name: "Dubai Luxury Holiday", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", price: "₹90,000", originalPrice: "₹1,10,000", duration: "5D / 4N", rating: 4.7 },
    { id: "10", name: "Paris Romantic Getaway", location: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", price: "₹2,00,000", originalPrice: "₹2,30,000", duration: "6D / 5N", rating: 4.8, tag: "Popular" },
    { id: "8", name: "Thailand Explorer", location: "Bangkok · Pattaya", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", price: "₹45,000", originalPrice: "₹60,000", duration: "5D / 4N", rating: 4.6 },
    { id: "16", name: "Maldives Luxury", location: "Malé, Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", price: "₹1,20,000", originalPrice: "₹1,50,000", duration: "5D / 4N", rating: 4.9 },
    { id: "17", name: "Greece Islands", location: "Santorini, Greece", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80", price: "₹1,40,000", originalPrice: "₹1,70,000", duration: "6D / 5N", rating: 4.8 },
    { id: "18", name: "Singapore Modern", location: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", price: "₹75,000", originalPrice: "₹90,000", duration: "4D / 3N", rating: 4.7 },
    { id: "19", name: "Turkey Heritage", location: "Istanbul, Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80", price: "₹85,000", originalPrice: "₹1,05,000", duration: "6D / 5N", rating: 4.6 },
    { id: "20", name: "Iceland Adventure", location: "Reykjavik, Iceland", image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80", price: "₹1,60,000", originalPrice: "₹1,90,000", duration: "7D / 6N", rating: 4.9 },
  ],
}

const tabs = ["domestic", "international"] as const

function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <Link href={`/packages/${pkg.id}`} className="group block">
      <div className="relative h-[300px] w-[220px] sm:h-[340px] sm:w-[260px] md:h-[360px] md:w-[280px] rounded-2xl overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          {pkg.tag ? (
            <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-white/15 backdrop-blur-md text-white rounded-full border border-white/10">
              {pkg.tag}
            </span>
          ) : <span />}
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/25 backdrop-blur-md text-white text-[11px] font-medium">
            <Star className="w-3 h-3 fill-secondary text-secondary" />
            {pkg.rating}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="flex items-center gap-1 text-white/50 text-[11px] tracking-wide uppercase mb-1">
            <MapPin className="w-3 h-3" />
            {pkg.location}
          </p>
          <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">{pkg.name}</h3>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.08]">
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <Clock className="w-3 h-3" />
              {pkg.duration}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-white/30 text-[11px] line-through">{pkg.originalPrice}</span>
              <span className="font-bold text-white">{pkg.price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function TopPackages() {
  const [active, setActive] = useState<"domestic" | "international">("domestic")
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true, align: "start" })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit()
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect, active])

  return (
    <section className="py-12 sm:py-16 md:py-24" id="toppackages">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5"
          >
            <Plane className="h-3 w-3" />
            Popular Destinations
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold tracking-tight leading-tight">
            Top <span className="text-primary">Packages</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mt-2 max-w-md mx-auto">
            Handpicked trips loved by thousands of travelers
          </p>
        </motion.div>

        {/* Switcher + Nav buttons */}
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <div className="inline-flex rounded-full bg-muted p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="relative px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium capitalize rounded-full transition-colors"
              >
                {active === tab && (
                  <motion.div
                    layoutId="pkg-pill"
                    className="absolute inset-0 bg-background rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className={`relative z-10 ${active === tab ? "text-foreground" : "text-muted-foreground"}`}>
                  {tab}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex gap-3 sm:gap-4">
                {data[active].map((pkg) => (
                  <div key={pkg.id} className="shrink-0">
                    <PackageCard pkg={pkg} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-8 sm:mt-12 text-center"
      >
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
        >
          Explore more destinations
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  )
}
