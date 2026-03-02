"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import {
  Instagram,
  Twitter,
  Facebook,
  MapPin,
  Mail,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Logo from "../assets/images/logo in white.png"

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
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

  return (
    <footer className="relative bg-gradient-to-br from-[#071A2F] via-[#0A2540] to-[#0E2F56] text-white overflow-hidden border-t border-[#3FB8FF]/20">

      <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-[#1DA1F2] via-[#3FB8FF]/30 to-[#00C6FF] blur-3xl"></div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12"
      >
        <motion.div variants={item}>
          <div className="mb-6">
            <Image
              src={Logo}
              alt="Logo"
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          <p className="text-white/70 leading-relaxed text-sm">
            Explore the world with luxury and comfort. Premium curated travel
            experiences crafted for unforgettable journeys.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.15, y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group p-2 bg-[#0E2F56] rounded-full border border-[#3FB8FF]/40 hover:border-[#FBAB18] hover:shadow-[0_0_20px_#FBAB18] transition-all duration-300"
              >
                <Icon
                  size={18}
                  className="text-[#3FB8FF] group-hover:text-[#FBAB18] transition-colors duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item}>
          <h3 className="text-lg font-semibold mb-6 text-[#5ED3FF]">
            Explore
          </h3>
          <ul className="space-y-4 text-sm">
            {[
              "Destinations",
              "Luxury Packages",
              "Adventure Tours",
              "Cruises",
              "Private Jets",
            ].map((link, i) => (
              <li key={i}>
                <div
                  className="relative w-fit"
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href="#"
                    className="relative font-medium text-white/70 hover:text-[#FBAB18] transition-colors"
                  >
                    {link}
                    <motion.span
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#FBAB18] to-[#FFD166] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredLink === link ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item}>
          <h3 className="text-lg font-semibold mb-6 text-[#5ED3FF]">
            Company
          </h3>
          <ul className="space-y-4 text-sm">
            {[
              "About Us",
              "Travel Blog",
              "FAQ",
              "Careers",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((link, i) => (
              <li key={i}>
                <motion.div
                  className="relative w-fit"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <Link
                    href="#"
                    className="relative font-medium text-white/70 hover:text-[#FBAB18] transition-colors duration-300"
                  >
                    {link}
                  </Link>

                  <motion.span
                    variants={{
                      rest: { scaleX: 0 },
                      hover: { scaleX: 1 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#FBAB18] to-[#FFD166] origin-left"
                  />
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item}>
          <h3 className="text-lg font-semibold mb-6 text-[#5ED3FF]">
            Contact
          </h3>

          <div className="space-y-4 text-white/70 text-sm">
            <div className="flex items-center gap-3 group">
              <MapPin size={16} className="text-[#3FB8FF] group-hover:text-[#FBAB18] transition-colors duration-300" />
              <span className="group-hover:text-white transition-colors duration-300">
                Kolkata, India
              </span>
            </div>

            <div className="flex items-center gap-3 group">
              <Phone size={16} className="text-[#3FB8FF] group-hover:text-[#FBAB18] transition-colors duration-300" />
              <span className="group-hover:text-white transition-colors duration-300">
                +91 9330868500
              </span>
            </div>

            <div className="flex items-center gap-3 group">
              <Mail size={16} className="text-[#3FB8FF] group-hover:text-[#FBAB18] transition-colors duration-300" />
              <span className="group-hover:text-white transition-colors duration-300">
                bookings@bonhomiee.com
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="relative border-t border-[#3FB8FF]/40 shadow-[0_-5px_30px_rgba(63,184,255,0.2)] text-center py-6 text-sm text-white/50">
        © {new Date().getFullYear()} Bonhomiee Travels. All rights reserved.
      </div>
    </footer>
  )
}