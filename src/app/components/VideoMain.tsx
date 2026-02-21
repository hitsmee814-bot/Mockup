"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import logoPrimary from "../assets/images/logoPrimary.png"
import {
    User,
    Briefcase,
    Building2,
    Truck,
} from "lucide-react"

const repoPath = process.env.NODE_ENV === "production" ? "/Mockup" : ""

const navItems = [
    { label: "Getting Started", id: "hero-sub" },
    { label: "Features", id: "features" },
    { label: "How it works", id: "how-it-works" },
    { label: "FAQs", id: "faqs" },
]

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
    const [scrollRatio, setScrollRatio] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter()
    const [authOpen, setAuthOpen] = useState(false)
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [menuOpen])

    useEffect(() => {
        const threshold = 200
        const handleScroll = () =>
            setScrollRatio(Math.min(window.scrollY / threshold, 1))

        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        })
        setMenuOpen(false)
    }

    const handleNavClick = (id: string) => {
        const el = document.getElementById(id)

        if (el) {
            const headerOffset = 0
            const elementPosition = el.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })
        }

        setMenuOpen(false)
    }

    const bgColor = `rgba(
    ${Math.round(scrollRatio * 5)},
    ${Math.round(scrollRatio * 32)},
    ${Math.round(scrollRatio * 29)},
    ${0.14 + scrollRatio * 0.86}
  )`

    const headerShadow =
        scrollRatio > 0.5 ? "shadow-md" : ""

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

            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{ backgroundColor: bgColor }}
                className={`fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-4 transition-all ${headerShadow}`}
            >
                <div className="flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 text-white">
                        <Image src={logoPrimary} alt="Logo" width={32} height={32} priority />
                        <span className="text-xl font-bold">Bonhomiee</span>
                    </a>
                    <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-white">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className="relative group"
                            >
                                {item.label}
                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#00AFEF] transition-all group-hover:w-full" />
                            </button>
                        ))}
                    </nav>

                    <div className="hidden lg:flex">
                        <motion.button
                            onClick={() => setAuthOpen(true)}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="
    relative px-6 py-2
    rounded-lg
    font-medium text-white
    tracking-wide
  "
                            style={{
                                backgroundColor: "#00AFEF",
                            }}
                        >
                            Login / Signup
                        </motion.button>
                    </div>
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden text-white"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                        />

                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 260, damping: 30 }}
                            className="fixed right-0 top-0 h-full w-72 bg-[#051F1D] z-50 p-6 text-white"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="font-bold text-lg">Menu</span>
                                <button onClick={() => setMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-6">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        className="relative group text-left"
                                    >
                                        {item.label}
                                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#00AFEF] transition-all group-hover:w-full" />
                                    </button>
                                ))}
                            </nav>
                            <button
                                onClick={() => {
                                    setMenuOpen(false)
                                    setAuthOpen(true)
                                }}
                                className="mt-10 w-full py-3 rounded-full bg-[#00AFEF] font-medium"
                            >
                                Login / Signup
                            </button>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

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
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-white flex flex-wrap items-center justify-center gap-4"
                >
                    <motion.span variants={wordVariant}>Plan.</motion.span>
                    <motion.span variants={wordVariant}>Tap.</motion.span>
                    <motion.span variants={wordVariant}>
                        <motion.button
                            onClick={scrollToSection}
                            whileTap={{ scale: 0.97 }}
                            className="relative inline-flex items-center px-5 py-2 rounded-full
               font-semibold text-white bg-[#00AFEF]
               overflow-hidden"
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
                            <span className="relative z-10 flex items-center gap-2">
                                Go
                            </span>
                        </motion.button>
                    </motion.span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 text-base sm:text-lg md:text-xl max-w-xl text-white/90"
                >
                    Thoughtfully crafted stays and travel experiences — powered by
                    Bonhomiee.
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
            </div><Dialog open={authOpen} onOpenChange={setAuthOpen}>
                <DialogContent className="sm:max-w-lg rounded-2xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-semibold">
                            Choose your role
                        </DialogTitle>
                        <p className="text-center text-sm text-muted-foreground mt-1">
                            Select how you want to continue
                        </p>
                    </DialogHeader>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {roles.map(({ label, icon: Icon, route, description }) => (
                            <button
                                key={label}
                                onClick={() => {
                                    setAuthOpen(false)
                                    router.push(route)
                                }}
                                className="
            group flex items-center gap-4 rounded-xl border p-4 text-left
            transition-all duration-200
            hover:border-[#00AFEF]
            hover:bg-[#00AFEF]/10
          "
                            >
                                <div
                                    className="
              flex h-12 w-12 items-center justify-center rounded-lg
              bg-muted transition-colors
              group-hover:bg-[#00AFEF]
            "
                                >
                                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-white" />
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-medium text-base">{label}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {description}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </section>

    )
}