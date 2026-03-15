"use client"

import { motion, Variants } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight } from "lucide-react"

const destinations = [
  { city: "Paris", country: "France", code: "CDG", price: 420, image: "🗼", gradient: "from-primary/20 to-secondary/20", accent: "text-primary" },
  { city: "Tokyo", country: "Japan", code: "HND", price: 780, image: "⛩️", gradient: "from-secondary/20 to-primary/20", accent: "text-secondary" },
  { city: "Dubai", country: "UAE", code: "DXB", price: 550, image: "🏙️", gradient: "from-primary/20 to-primary/10", accent: "text-primary" },
  { city: "London", country: "UK", code: "LHR", price: 380, image: "🎡", gradient: "from-secondary/20 to-secondary/10", accent: "text-secondary" },
  { city: "Singapore", country: "Singapore", code: "SIN", price: 690, image: "🌴", gradient: "from-primary/20 to-secondary/20", accent: "text-primary" },
  { city: "New York", country: "USA", code: "JFK", price: 320, image: "🗽", gradient: "from-secondary/20 to-primary/20", accent: "text-secondary" },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

export function PopularDestinations() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-800">Popular Destinations</h2>
          <p className="text-sm text-gray-400">Trending flights from your area</p>
        </div>
        <Badge variant="outline" className="gap-1">
          <MapPin className="h-3 w-3" /> 6 destinations
        </Badge>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {destinations.map((dest) => (
          <motion.div key={dest.code} variants={item}>
            <Card className="group relative overflow-hidden cursor-pointer border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative p-5 flex items-center gap-4">
                <motion.div
                  className="text-5xl"
                  whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {dest.image}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-gray-800">{dest.city}</h3>
                    <span className="text-xs text-gray-400 font-mono">{dest.code}</span>
                  </div>
                  <p className="text-sm text-gray-400">{dest.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">from</p>
                  <p className={`text-xl font-bold ${dest.accent}`}>${dest.price}</p>
                </div>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  whileHover={{ x: 3 }}
                >
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
