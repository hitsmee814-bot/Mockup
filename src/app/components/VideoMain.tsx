"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  User,
  Briefcase,
  Building2,
  Truck,
} from "lucide-react"
import HeaderNav from "./HeaderNav"
import AuthRoleDialog from "./AuthDialog"

const repoPath = process.env.NODE_ENV === "production" ? "/Mockup" : ""

const wordVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const roles = [
  {
    label: "Customer",
    icon: User,
    route: "/signup/customer",
    description: "Book and manage trips",
  },
  {
    label: "Agent",
    icon: Briefcase,
    route: "/signup/agent",
    description: "Create and sell itineraries",
  },
  {
    label: "Supplier",
    icon: Truck,
    route: "/signup/supplier",
    description: "Hotels, transport & services",
  },
  {
    label: "Corporate",
    icon: Building2,
    route: "/signup/corporate",
    description: "Business travel solutions",
  },
]

export default function VideoMain() {
  const router = useRouter()
  const [authOpen, setAuthOpen] = useState(false)

  const scrollToSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative w-full min-h-[100svh]">
      <video
        className="absolute top-0 left-0 w-screen h-full object-cover -z-10"
        src={`${repoPath}/video/Video.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />

      <HeaderNav
        enableScrollBg
        position="fixed"
        // onAuthOpen={() => setAuthOpen(true)}
        onAuthOpen={() => router.push("/auth")}
      />

      <div
        id="hero"
        className="relative z-10 flex flex-col items-center justify-center
        min-h-[100svh] text-center px-4"
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.25 } },
          }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white
          flex flex-wrap items-center justify-center gap-1"
        >
          <motion.span variants={wordVariant}>Plan.</motion.span>
          <motion.span variants={wordVariant}>Tap.</motion.span>
          <motion.span variants={wordVariant}>
            <motion.button
              onClick={scrollToSection}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center px-5 py-2 rounded-full
              font-semibold text-white bg-[#3FB8FF] overflow-hidden"
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0
                bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0
                bg-gradient-to-r from-transparent via-white/50 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <span className="relative z-10">Go</span>
            </motion.button>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-base sm:text-lg md:text-xl
          max-w-xl text-white"
        >
          Thoughtfully crafted stays and travel experiences — powered by Bonhomiee.
        </motion.p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={scrollToSection}
          className="cursor-pointer"
        >
          <ChevronDown size={26} />
        </motion.div>
      </div>
      <AuthRoleDialog open={authOpen} onOpenChange={setAuthOpen} />
    </section>
  )
}