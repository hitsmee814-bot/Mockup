"use client"

import { TravelPackage } from "./types"
import { Star, Clock, MapPin, CheckCircle2, ChevronRight, Calendar, Shield, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ItineraryStepper } from "./ItineraryStepper"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

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

    const backHref = tripType
        ? `/itinerary/packages?tripType=${encodeURIComponent(tripType)}`
        : "/itinerary/packages"

    const bookingHref = tripType
        ? `/itinerary/packages/${pkg.id}/booking?tripType=${encodeURIComponent(tripType)}`
        : `/itinerary/packages/${pkg.id}/booking`

    const breadcrumbLabel = tripType ?? "All"

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-2">
                {/* <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/itinerary/packages" className="transition-colors hover:text-[#3FB8FF]">Itineraries</Link>
          <ChevronRight className="size-3 shrink-0" />
          <Link href={backHref} className="capitalize transition-colors hover:text-[#3FB8FF]">{breadcrumbLabel}</Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-gray-800 font-semibold truncate">{pkg.name}</span>
        </nav> */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>

                    <Breadcrumb>
                        <BreadcrumbList className="text-xs text-gray-400">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/itinerary/packages" className="cursor-pointer">
                                    Itineraries
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator>
                                <ChevronRight className="size-3 shrink-0" />
                            </BreadcrumbSeparator>

                            <BreadcrumbItem>
                                <BreadcrumbLink href={backHref} className="cursor-pointer capitalize">
                                    {breadcrumbLabel}
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator>
                                <ChevronRight className="size-3 shrink-0" />
                            </BreadcrumbSeparator>

                            <BreadcrumbItem>
                                <BreadcrumbPage>{pkg.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 sm:space-y-8">

                <motion.div
                    className="relative h-48 sm:h-72 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        onError={e => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.id}/1200/600`
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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

                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">

                        <motion.div className="flex flex-wrap gap-2" {...fadeUp} transition={{ delay: 0.15 }}>
                            {pkg.categories.map((cat, i) => (
                                <motion.div
                                    key={cat}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + i * 0.06 }}
                                >
                                    <Link
                                        href={`/itinerary/packages?tripType=${encodeURIComponent(cat)}`}
                                        className="text-xs font-semibold px-3 py-1 rounded-full border transition-all hover:shadow-md inline-block"
                                        style={{ background: "#3FB8FF10", color: "#3FB8FF", borderColor: "#3FB8FF30" }}
                                    >
                                        {cat}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            className="text-sm text-gray-500 leading-relaxed"
                            {...fadeUp}
                            transition={{ delay: 0.25 }}
                        >
                            {pkg.shortDescription}
                        </motion.p>

                        <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
                            <h2 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-800">
                                <CheckCircle2 className="size-4" style={{ color: "#3FB8FF" }} /> What&apos;s Included
                            </h2>
                            <div className="grid grid-cols-2 gap-2">
                                {pkg.inclusions.map((item, i) => (
                                    <motion.div
                                        key={item}
                                        className="flex items-center gap-2 text-xs rounded-xl px-3 py-2.5 border border-gray-100 bg-gray-50/80 text-gray-600 hover:border-[#3FB8FF30] hover:bg-[#3FB8FF06] transition-colors"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.35 + i * 0.06 }}
                                    >
                                        <span className="size-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "#3FB8FF12" }}>
                                            <ChevronRight className="size-2.5" style={{ color: "#3FB8FF" }} />
                                        </span>
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
                            <h2 className="font-bold text-sm mb-5 flex items-center gap-2 text-gray-800">
                                <Calendar className="size-4" style={{ color: "#3FB8FF" }} /> Day-by-Day Itinerary
                            </h2>
                            <ItineraryStepper itinerary={pkg.itinerary} packageId={pkg.id} />
                        </motion.div>
                    </div>

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
