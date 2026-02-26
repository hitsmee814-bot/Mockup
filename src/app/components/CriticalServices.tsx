"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

const services = [
  {
    title: "Ready-Made Travel Packages",
    description:
      "Carefully curated domestic and international experiences designed for comfort, value, and seamless planning.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Flight Booking Tool",
    description:
      "Real-time availability, intelligent fare comparison, and a smooth booking flow built for speed and reliability.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Hotel & Cab Booking",
    description:
      "Verified hotel listings and dependable cab services to ensure comfort throughout every stage of your journey.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Corporate Travel Solutions",
    description:
      "Centralized travel management with policy compliance, reporting tools, negotiated rates, and dedicated support.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "AI Itinerary Builder",
    description:
      "An intelligent system that builds personalized travel plans based on preferences, budgets, and timelines.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
  },
]

function ServiceRow({ service, index }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3 })

  const isReversed = index % 2 !== 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 60 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid md:grid-cols-2 gap-14 items-center"
    >
      <div className={`${isReversed ? "md:order-2" : ""}`}>
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      <div className={`${isReversed ? "md:order-1" : ""}`}>
        <h3 className="text-3xl font-semibold text-[#1B120B] mb-6">
          {service.title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
          {service.description}
        </p>

        <button className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#306F7D] px-6 py-3 rounded-full transition-all duration-300 hover:bg-[#479EA8]">
          Explore <span>→</span>
        </button>
      </div>
    </motion.div>
  )
}

export default function CriticalServices() {
  return (
    <section className="w-full py-32" id="services">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-28">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E40C7]">
            Services We Offer
          </h2>
          <p className="mt-6 text-[#306F7D] max-w-2xl mx-auto">
            Intelligent travel infrastructure built for modern explorers and enterprises.
          </p>
        </div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <ServiceRow
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}