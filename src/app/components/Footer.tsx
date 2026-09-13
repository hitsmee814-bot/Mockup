"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { Instagram, Twitter, Facebook, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Logo from "../assets/images/logo in white.png"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function PremiumFooter() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const exploreLinks = [
    { label: "Packages", href: "/itinerary/packages" },
    { label: "Flights", href: "/itinerary/flights" },
    { label: "Hotel", href: "/itinerary/hotel" },
  ]

  const companyLinks = [
    { label: "About Us", href: "/about" },
  ]

  return (
    <footer className="relative overflow-hidden bg-[#04257E] text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>

          {/* TOP STATEMENT */}
          <motion.div variants={item} className="border-b border-white/15 py-16 md:py-20">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
                  Travel that feels
                  <br />
                  <span className="text-[#3FB8FF]">understood.</span>
                </h2>
              </div>

              <Link
                href="/itinerary/packages"
                className="group flex w-fit items-center gap-3 border-b border-white/30 pb-2 text-sm font-medium text-white transition-colors hover:border-[#FBAB18] hover:text-[#FBAB18]"
              >
                Explore journeys
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </motion.div>

          {/* MAIN FOOTER */}
          <div className="grid grid-cols-1 gap-14 py-16 sm:grid-cols-2 md:grid-cols-4 md:gap-10 lg:py-20">

            {/* BRAND */}
            <motion.div variants={item} className="sm:col-span-2 md:col-span-1">
              <Image src={Logo} alt="Bonhomiee" className="h-10 w-auto object-contain" priority />

              <p className="mt-6 max-w-xs text-sm leading-7 text-white/65">
                Explore the world with luxury and comfort. Premium curated travel experiences crafted for unforgettable journeys.
              </p>

              <div className="mt-7 flex items-center gap-2.5">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/65 transition-all duration-300 hover:border-[#3FB8FF] hover:bg-[#3FB8FF] hover:text-white"
                    aria-label={`Social media ${i + 1}`}
                  >
                    <Icon size={17} strokeWidth={1.7} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* EXPLORE */}
            <motion.div variants={item}>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
                Explore
              </h3>

              <ul className="space-y-4 text-sm">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="group relative inline-flex items-center text-white/65 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}

                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: hoveredLink === link.label ? "100%" : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute -bottom-1 left-0 h-px bg-[#FBAB18]"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COMPANY */}
            <motion.div variants={item}>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
                Company
              </h3>

              <ul className="space-y-4 text-sm">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative inline-flex text-white/65 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}

                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#FBAB18] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CONTACT */}
            <motion.div variants={item}>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
                Contact
              </h3>

              <div className="space-y-5 text-sm">
                <div className="group flex items-start gap-3 text-white/65 transition-colors duration-300 hover:text-white">
                  <MapPin
                    size={17}
                    strokeWidth={1.7}
                    className="mt-0.5 shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]"
                  />
                  <span>Kolkata, India</span>
                </div>

                <div className="group flex items-start gap-3 text-white/65 transition-colors duration-300 hover:text-white">
                  <Phone
                    size={17}
                    strokeWidth={1.7}
                    className="mt-0.5 shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]"
                  />
                  <span>+91 9330868500</span>
                </div>

                <div className="group flex items-start gap-3 text-white/65 transition-colors duration-300 hover:text-white">
                  <Mail
                    size={17}
                    strokeWidth={1.7}
                    className="mt-0.5 shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]"
                  />
                  <span className="break-all">bookings@bonhomiee.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM BAR */}
          <motion.div
            variants={item}
            className="flex flex-col gap-4 border-t border-white/15 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>© {new Date().getFullYear()} Bonhomiee Travels. All rights reserved.</p>
            <p className="text-white/35">Thoughtful journeys. Seamlessly planned.</p>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  )
}