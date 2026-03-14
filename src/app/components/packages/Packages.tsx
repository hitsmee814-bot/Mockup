"use client"

import { useMemo, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { travelPackages } from "./data"
import { FilterBar } from "./FilterBar"
import { PackageCard } from "./PackageCard"
import { PackageSkeleton } from "./PackageSkeleton"
import { FilterDrawer } from "./FilterDrawer"
import { Compass } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Category } from "./types"

const SKELETON_COUNT = 8

function parseDuration(duration: string): number {
  return parseInt(duration)
}

function matchesDurationFilter(pkgDuration: string, filter: string): boolean {
  const days = parseDuration(pkgDuration)
  if (filter === "1-3 Days") return days >= 1 && days <= 3
  if (filter === "4-5 Days") return days >= 4 && days <= 5
  if (filter === "6-7 Days") return days >= 6 && days <= 7
  if (filter === "8+ Days") return days >= 8
  return true
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

export function Packages() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const tripType = searchParams.get("tripType") as Category | "All" | null
  const activeFilter: Category | "All" = tripType ?? "All"
  const budget = Number(searchParams.get("budget") ?? 250000)
  const dest = searchParams.get("dest")
  const duration = searchParams.get("duration")
  const categories = searchParams.get("categories")?.split(",").filter(Boolean) ?? []
  const rating = searchParams.get("rating") ? Number(searchParams.get("rating")) : null

  const [search, setSearch] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [searchParams.toString(), search])

  function handleFilter(cat: Category | "All") {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === "All") params.delete("tripType")
    else params.set("tripType", cat)
    router.push(`/itinerary/packages?${params.toString()}`)
  }

  const activeFilterCount = [
    searchParams.get("budget"),
    searchParams.get("dest"),
    searchParams.get("duration"),
    searchParams.get("categories"),
    searchParams.get("rating"),
    searchParams.get("people"),
  ].filter(Boolean).length

  const filtered = useMemo(() => {
    return travelPackages.filter(pkg => {
      if (activeFilter !== "All" && !pkg.categories.includes(activeFilter as Category)) return false
      if (pkg.price > budget) return false
      if (dest && !pkg.destination.toLowerCase().includes(dest.toLowerCase()) && !pkg.country.toLowerCase().includes(dest.toLowerCase())) return false
      if (duration && !matchesDurationFilter(pkg.duration, duration)) return false
      if (categories.length && !categories.some(c => pkg.categories.includes(c as Category))) return false
      if (rating && pkg.rating < rating) return false
      const q = search.toLowerCase()
      if (q && !pkg.name.toLowerCase().includes(q) && !pkg.destination.toLowerCase().includes(q) && !pkg.country.toLowerCase().includes(q)) return false
      return true
    })
  }, [activeFilter, budget, dest, duration, categories.join(), rating, search])

  return (
    <div className="min-h-screen bg-white px-3 sm:px-4 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border"
            style={{ background: "#3FB8FF18", color: "#3FB8FF", borderColor: "#3FB8FF40" }}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <Compass className="size-3.5" /> Explore Our Packages
          </motion.div>
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find Your Perfect <span style={{ color: "#3FB8FF" }}>Getaway</span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Handpicked travel experiences for every kind of traveller — from solo adventures to luxury honeymoons.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <FilterBar
            active={activeFilter}
            search={search}
            onFilter={handleFilter}
            onSearch={setSearch}
            onOpenFilters={() => setFilterOpen(true)}
            hasDrawerFilters={activeFilterCount > 0}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => <PackageSkeleton key={i} />)}
            </motion.div>
          ) : filtered.length > 0 ? (
            <motion.div
              key="results"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
            >
              <motion.p
                className="text-xs text-gray-400 mb-5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Showing <span className="font-semibold text-gray-700">{filtered.length}</span> packages
                {activeFilter !== "All" && <> in <span className="font-semibold" style={{ color: "#3FB8FF" }}>{activeFilter}</span></>}
              </motion.p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filtered.map(pkg => (
                  <motion.div key={pkg.id} variants={cardVariant}>
                    <PackageCard pkg={pkg} currentSearch={searchParams.toString()} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="text-center py-24 text-gray-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                className="text-5xl mb-4"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                🔍
              </motion.p>
              <p className="font-bold text-base text-gray-600">No packages found</p>
              <p className="text-sm mt-1">Try a different filter or search term</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  )
}
