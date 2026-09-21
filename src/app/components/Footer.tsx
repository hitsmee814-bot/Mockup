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
import Logo from "../assets/images/final logo Bonhomiee in yellow without.png"

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
  const [showCopied, setShowCopied] = useState(false)

  const copyMobileNumber = async () => {
    try {
      await navigator.clipboard.writeText("+91 9330868500")

      setShowCopied(true)

      window.setTimeout(() => {
        setShowCopied(false)
      }, 2200)
    } catch {
      window.location.href = "tel:+919330868500"
    }
  }

  return (
    <footer className="relative overflow-hidden bg-[#04257E] text-white">

      {/* MOBILE COPY TOAST */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={
          showCopied
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/15 bg-[#10213F] px-4 py-2 text-xs font-medium text-white shadow-lg"
      >
        Mobile number copied
      </motion.div>

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
            className="border-b border-white/15 py-6 sm:py-6 lg:py-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">

              <div>
                <h2 className="text-3xl font-medium leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
                  Travel that feels
                  <br />
                  <span className="text-[#FBAB18]">understood.</span>
                </h2>
              </div>

            </div>
          </motion.div>

{/* MAIN FOOTER */}
<div className="grid grid-cols-1 gap-7 py-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-7 sm:py-6 md:grid-cols-[1fr_auto] md:gap-16 lg:gap-24 lg:py-6">

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

    <p className="mt-3 max-w-xs text-xs leading-5 text-white/90 sm:text-sm sm:leading-6">
      Explore the world with luxury and comfort. Premium travel experiences crafted for unforgettable journeys.
    </p>
  </motion.div>

  {/* RIGHT SIDE — CONTACT + FOLLOW */}
  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:flex md:items-start md:gap-16 lg:gap-24">

    {/* CONTACT */}
    <motion.div variants={item}>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
        Contact
      </h3>

      <div className="space-y-2.5 text-xs sm:text-sm">

        {/* LOCATION */}
        <div className="group flex items-center gap-2.5 font-semibold text-white/90 transition-colors duration-300 hover:text-white">
          <MapPin
            size={15}
            strokeWidth={1.7}
            className="shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]"
          />

          <span>Kolkata, India</span>
        </div>

        {/* MOBILE */}
        <button
          type="button"
          onClick={copyMobileNumber}
          className="group flex w-fit items-center gap-2.5 text-left font-semibold text-white/90 transition-colors duration-300 hover:text-white"
          aria-label="Copy Bonhomiee mobile number"
        >
          <Phone
            size={15}
            strokeWidth={1.7}
            className="shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]"
          />

          <span>+91 9330868500</span>
        </button>

        {/* EMAIL */}
        <a
          href="mailto:hello@bonhomiee.com"
          className="group flex w-fit items-center gap-2.5 font-semibold text-white/90 transition-colors duration-300 hover:text-white"
        >
          <Mail
            size={15}
            strokeWidth={1.7}
            className="shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]"
          />

          <span className="break-all">
            hello@bonhomiee.com
          </span>
        </a>

      </div>
    </motion.div>

    {/* FOLLOW */}
    <motion.div variants={item}>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
        Follow
      </h3>

      <div className="space-y-2.5 text-xs sm:text-sm">

        {/* INSTAGRAM */}
        <motion.a
          href="https://www.instagram.com/bonhomiee25?stkn=Y29ldXNhOXUwMDAy"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
          className="group flex w-fit items-center gap-2.5 font-semibold text-white/90 transition-colors duration-300 hover:text-white"
          aria-label="Visit Bonhomiee on Instagram"
        >
          <Instagram
            size={15}
            strokeWidth={1.7}
            className="shrink-0 text-[#3FB8FF] transition-colors duration-300 group-hover:text-[#FBAB18]"
          />

          <span>Instagram</span>
        </motion.a>

        {/* LINKEDIN */}
        <motion.a
          href="https://www.linkedin.com/company/bonhomiee/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
          className="group flex w-fit items-center gap-2.5 font-semibold text-white/90 transition-colors duration-300 hover:text-white"
          aria-label="Visit Bonhomiee on LinkedIn"
        >
          <Linkedin
            size={15}
            strokeWidth={1.7}
            className="shrink-0 text-[#3FB8FF] transition-colors duration-300 group-hover:text-[#FBAB18]"
          />

          <span>LinkedIn</span>
        </motion.a>

      </div>
    </motion.div>

  </div>

</div>


{/* BOTTOM BAR */}
<motion.div
  variants={item}
  className="flex flex-col gap-2 border-t border-white/15 py-3.5 text-[10px] text-white/85 sm:flex-row sm:items-center sm:justify-between sm:py-4 sm:text-xs"
>
  <p>
    © {new Date().getFullYear()} Bonhomiee Travels. All rights reserved.
  </p>

  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
    <Link
      href="/terms-and-conditions"
      className="transition-colors duration-200 hover:text-[#FBAB18]"
    >
      Terms & Conditions
    </Link>

    <span className="text-white/30">|</span>

    <Link
      href="/privacy-policy"
      className="transition-colors duration-200 hover:text-[#FBAB18]"
    >
      Privacy Policy
    </Link>

    <span className="text-white/30">|</span>

    <Link
      href="/cancellation-refund"
      className="transition-colors duration-200 hover:text-[#FBAB18]"
    >
      Cancellation & Refund
    </Link>
  </div>
</motion.div>


        </motion.div>
      </div>
    </footer>
  )
}
