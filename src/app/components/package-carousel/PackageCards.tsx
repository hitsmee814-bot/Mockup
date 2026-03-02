"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Home, Globe } from "lucide-react"
import { PremiumButton } from "@/app/utils/PremiumButton"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const destinations = {
  domestic: [
    { name: "Goa Beach Paradise", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", rating: 4.8, price: "$299", days: 5, people: "2-4" },
    { name: "Kerala Backwaters", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80", rating: 4.9, price: "$349", days: 6, people: "2-6" },
    { name: "Rajasthan Heritage", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80", rating: 4.7, price: "$399", days: 7, people: "2-8" },
    { name: "Himachal Adventure", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80", rating: 4.8, price: "$279", days: 4, people: "2-6" },
    { name: "Udaipur Royal Tour", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80", rating: 4.9, price: "$429", days: 5, people: "2-4" },
    { name: "Andaman Islands", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", rating: 4.8, price: "$549", days: 6, people: "2-6" },
  ],
  international: [
    { name: "Maldives Luxury", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", rating: 4.9, price: "$1,299", days: 7, people: "2-4" },
    { name: "Dubai Extravaganza", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", rating: 4.8, price: "$899", days: 5, people: "2-6" },
    { name: "Bali Paradise", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", rating: 4.9, price: "$799", days: 6, people: "2-4" },
    { name: "Paris Romance", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", rating: 4.7, price: "$1,499", days: 7, people: "2-4" },
    { name: "Switzerland Alps", image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80", rating: 4.9, price: "$1,699", days: 8, people: "2-6" },
    { name: "Thailand Explorer", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", rating: 4.8, price: "$699", days: 6, people: "2-8" },
  ],
}

export default function VacationDestinations() {
  const [mode, setMode] = useState<"domestic" | "international">("domestic")

  const isDomestic = mode === "domestic"
  const data = destinations[mode]

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#1B120B] mb-4">
            Premium Vacation Packages
          </h2>
          <p className="text-gray-500 text-lg">
            Handpicked journeys crafted for elevated travel experiences
          </p>
        </div>

        <div className="flex justify-center mb-20">
          <div className="flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm relative">
            <ToggleButton
              label="Domestic"
              active={isDomestic}
              onClick={() => setMode("domestic")}
              activeColor="bg-[#3FB8FF]"
            />
            <ToggleButton
              label="International"
              active={!isDomestic}
              onClick={() => setMode("international")}
              activeColor="bg-[#FBAB18]"
            />
          </div>
        </div>

        <div className="hidden xl:grid grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {data.map((dest) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card dest={dest} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="xl:hidden relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {data.map((dest) => (
                <CarouselItem
                  key={dest.name}
                  className="basis-full md:basis-1/2 px-3"
                >
                  <Card dest={dest} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-5"/>
            <CarouselNext className="right-9"/>
          </Carousel>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="text-lg font-semibold text-[#3FB8FF] hover:text-[#FBAB18] transition-colors"
          >
            {isDomestic ? "Explore 20+ destinations" : "Explore 30+ destinations"}
          </a>
        </div>

      </div>
    </section>
  )
}

function Card({ dest }: { dest: any }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500">
      <div className="relative h-64 overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-md">
          <Star className="w-4 h-4 fill-[#FBAB18] text-[#FBAB18]" />
          <span className="font-semibold text-sm">{dest.rating}</span>
        </div>
      </div>

      <div className="p-7">
        <h3 className="text-xl font-bold text-[#1B120B] mb-4">{dest.name}</h3>

        <div className="flex items-center justify-between text-gray-500 text-sm mb-5">
          <span>{dest.days} Days</span>
          <span>{dest.people} People</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#3FB8FF]">
            {dest.price}
          </span>

          <PremiumButton variant="primary">
            Book Now
          </PremiumButton>
        </div>
      </div>
    </div>
  )
}

function ToggleButton({ label, active, onClick, activeColor }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${active ? "text-white" : "text-slate-400"
        }`}
    >
      <span className="relative z-20 flex items-center gap-2">
        {label}
        {label === "Domestic" ? (
          <Home className="w-4 h-4" />
        ) : (
          <Globe className="w-4 h-4" />
        )}
      </span>

      {active && (
        <motion.div
          layoutId="active-pill"
          className={`absolute inset-0 rounded-xl ${activeColor}`}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  )
}