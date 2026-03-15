"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, Sparkles } from "lucide-react"
import { SearchForm } from "./search-form"
import { CompactSearchBar } from "./compact-search-bar"
import { FlightResults } from "./flight-results"
import { PopularDestinations } from "./popular-destinations"

export function Flight() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searching, setSearching] = useState(false)
  const showResults = searchParams.has('tripType')

  const handleSearch = (params: { from: string; to: string; tripType: string; departDate?: string; returnDate?: string; adults: number; children: number; infants: number; class: string }) => {
    const query = new URLSearchParams()
    if (params.from) query.set('from', params.from)
    if (params.to) query.set('to', params.to)
    query.set('tripType', params.tripType)
    if (params.departDate) query.set('departDate', params.departDate)
    if (params.returnDate) query.set('returnDate', params.returnDate)
    query.set('adults', params.adults.toString())
    if (params.children) query.set('children', params.children.toString())
    if (params.infants) query.set('infants', params.infants.toString())
    query.set('class', params.class)

    setSearching(true)
    setTimeout(() => {
      router.push(`?${query.toString()}`)
      setSearching(false)
    }, 2000)
  }

  return (
    <div className="force-light">
      <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8">
        <AnimatePresence>
          {searching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center gap-5"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <Plane className="h-10 w-10 relative" style={{ color: "#3FB8FF" }} />
                  </div>
                </motion.div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">Searching flights...</p>
                  <p className="text-sm text-gray-400 mt-1">Finding the best deals for you</p>
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="h-2 w-2 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              <div className="text-center space-y-4 pt-6">
                <motion.div
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border"
                  style={{ background: "#3FB8FF18", color: "#3FB8FF", borderColor: "#3FB8FF40" }}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Sparkles className="size-3.5" /> Premium Flight Booking
                </motion.div>
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Fly Anywhere,{" "}
                  <span style={{ color: "#3FB8FF" }}>
                    Anytime
                  </span>
                </motion.h1>
                <motion.p
                  className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Search hundreds of airlines and find the best fares for your next trip — one-way, return or multi-city.
                </motion.p>
              </div>
              <SearchForm onSearch={handleSearch} />
              <PopularDestinations />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <CompactSearchBar onSearch={handleSearch} />
              <FlightResults />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
