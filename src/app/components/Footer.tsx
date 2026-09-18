"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import {
  Instagram,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Linkedin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Logo from "../assets/images/logo in white.png"

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
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
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >

          {/* TOP STATEMENT */}
          <motion.div
            variants={item}
            className="border-b border-white/15 py-10 sm:py-12 lg:py-14"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">

              <div>
                <h2 className="text-3xl font-medium leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
                  Travel that feels
                  <br />
                  <span className="text-[#FBAB18]">understood.</span>
                </h2>
              </div>

              <Link
                href="/itinerary/packages"
                className="group flex w-fit items-center gap-2 border-b border-white/30 pb-1.5 text-xs font-medium text-white transition-colors hover:border-[#FBAB18] hover:text-[#FBAB18] sm:text-sm"
              >
                Explore journeys

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

            </div>
          </motion.div>

          {/* MAIN FOOTER */}
          <div className="grid grid-cols-1 gap-9 py-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 sm:py-12 md:grid-cols-4 md:gap-8 lg:py-14">

            {/* BRAND */}
            <motion.div
              variants={item}
              className="sm:col-span-2 md:col-span-1"
            >
              <Image
                src={Logo}
                alt="Bonhomiee"
                className="h-8 w-auto object-contain sm:h-9"
                priority
              />

              <p className="mt-4 max-w-xs text-xs leading-6 text-white/60 sm:text-sm sm:leading-6">
                Explore the world with luxury and comfort. Premium travel experiences crafted for unforgettable journeys.
              </p>

              {/* SOCIALS */}
              <div className="mt-5 flex items-center gap-2">
                {[
                  {
                    Icon: Instagram,
                    href: "https://www.instagram.com/bonhomiee25?stkn=Y29ldXNhOXUwMDAy",
                    label: "Instagram",
                  },
                  {
                    Icon: Linkedin,
                    href: "https://www.linkedin.com/company/bonhomiee/posts/?feedView=all",
                    label: "LinkedIn",
                  },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/65 transition-all duration-300 hover:border-[#FBAB18] hover:bg-[#FBAB18] hover:text-white"
                    aria-label={`Visit Bonhomiee on ${label}`}
                  >
                    <Icon size={16} strokeWidth={1.7} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* EXPLORE */}
            <motion.div variants={item}>
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
                Explore
              </h3>

              <ul className="space-y-2.5 text-xs sm:text-sm">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="group relative inline-flex items-center font-semibold text-white/65 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}

                      <motion.span
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            hoveredLink === link.label ? "100%" : 0,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                        }}
                        className="absolute -bottom-1 left-0 h-px bg-[#FBAB18]"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COMPANY */}
            <motion.div variants={item}>
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
                Company
              </h3>

              <ul className="space-y-2.5 text-xs sm:text-sm">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative inline-flex font-semibold text-white/65 transition-colors duration-300 hover:text-white"
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
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
                Contact
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">

                <div className="group flex items-center gap-2.5 font-semibold text-white/65 transition-colors duration-300 hover:text-white">
                  <MapPin
                    size={15}
                    strokeWidth={1.7}
                    className="shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]"
                  />

                  <span>Kolkata, India</span>
                </div>

                <div className="group flex items-center gap-2.5 font-semibold text-white/65 transition-colors duration-300 hover:text-white">
                  <Phone
                    size={15}
                    strokeWidth={1.7}
                    className="shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]"
                  />

                  <span>+91 9330868500</span>
                </div>

                <div className="group flex items-center gap-2.5 font-semibold text-white/65 transition-colors duration-300 hover:text-white">
                  <Mail
                    size={15}
                    strokeWidth={1.7}
                    className="shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]"
                  />

                  <span className="break-all">
                    bookings@bonhomiee.com
                  </span>
                </div>

              </div>
            </motion.div>

          </div>

          {/* BOTTOM BAR */}
          <motion.div
            variants={item}
            className="flex flex-col gap-2 border-t border-white/15 py-4 text-[10px] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:py-5 sm:text-xs"
          >
            <p>
              © {new Date().getFullYear()} Bonhomiee Travels. All rights reserved.
            </p>

            <p className="text-white/35">
              Thoughtful journeys. Seamlessly planned.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  )
}
