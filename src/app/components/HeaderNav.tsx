"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, ChevronDown, LogIn, User2, Sparkles } from "lucide-react"
import logoPrimary from "../assets/images/final logo Bonhomiee white without.png"
import { PremiumButton } from "../utils/PremiumButton"
import { HiOutlineBriefcase } from "react-icons/hi"
import { SearchDialog } from "./common/SearchDialog"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"


type NavChild = {
    label: string
    id: string
}

type NavItem = {
    label: string
    id?: string
    children?: NavChild[]
    hot?: boolean
}
const navItems: NavItem[] = [
    { label: "Curated Trips", id: "toppackages" },
    { label: "Our Offerings", id: "packages" },
    { label: "The Bonhomiee Way", id: "aboutus" },
    { label: "Contact Us", id: "faq" },
    { label: "AI", id: "ai", hot: true },

]

// const navItems = [
//   { label: "Getting Started", id: "hero-sub" },
//   // { label: "Services", id: "hero-sub" },
//   { label: "Packages", id: "packages" },
//   // {
//   //   label: "Explore",
//   //   children: [
//   //     { label: "Our Services", id: "services" },
//   //   ],
//   // },
//   { label: "Testimonials", id: "testimonials" },
//   // {
//   //   label: "About",
//   //   children: [
//   //     { label: "Inspiration", id: "inspiration" },
//   //     { label: "About us", id: "team" },
//   //   ],
//   // },
//   { label: 'Partner', id: "partner" },
//   // {
//   //   label: "Support",
//   //   children: [
//   //     { label: "Privacy", id: "privacy" },
//   //     { label: "FAQs", id: "faq" },
//   //   ],
//   // },
// ]

interface HeaderNavProps {
    enableScrollBg?: boolean
    onAuthOpen?: () => void
    position?: "fixed" | "sticky"
}

export default function HeaderNav({
    enableScrollBg = false,
    onAuthOpen,
    position = "sticky",
}: HeaderNavProps) {
    const router = useRouter()
    const [scrollRatio, setScrollRatio] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)
    const [hovered, setHovered] = useState<string | null>(null)
    const { isLoggedIn, logout } = useAuth()

    const isScrolled = enableScrollBg ? scrollRatio > 0.6 : true
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
    }, [menuOpen])

    useEffect(() => {
        if (!enableScrollBg) return
        const threshold = 200
        const handleScroll = () =>
            setScrollRatio(Math.min(window.scrollY / threshold, 1))

        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [enableScrollBg])

    const handleNavClick = (id: string) => {
        console.log(id);
        if(id==="packages"){
            router.push("/itinerary/packages")
        }
        const el = document.getElementById(id)
        if (!el) return

        const y = el.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: y, behavior: "smooth" })
        setMenuOpen(false)
    }

    return (
        <>
            <motion.header
                initial={enableScrollBg ? { y: -80, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`
    ${position === "fixed" ? "fixed top-0 left-0" : "sticky top-0"}
    w-full z-50
    transition-all duration-300
    rounded-b-md

    ${isScrolled ? "backdrop-blur-xl" : ""}
  `}
                style={{
                    background: isScrolled ? "#3FB8FF" : "transparent",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    <div
                        className="relative w-[160px] h-10 cursor-pointer"
                        onClick={() => handleNavClick("hero-sub")}
                    >
                        <Image
                            src={logoPrimary}
                            alt="Logo"
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>

                    <nav className="hidden md:flex items-center">
                        <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]">
                            {navItems.map((item) => {
                                const isHovered = hovered === item.label

                                return (
                                    <div
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() => setHovered(item.label)}
                                        onMouseLeave={() => setHovered(null)}
                                    >
                                        <button
                                            onClick={() => {
                                                if (item.label === "AI") {
                                                    router.push("/itinerary/ai")
                                                    return
                                                }
                                                if (!item.children) handleNavClick(item.id!)
                                            }}
                                            className="relative px-5 py-2 rounded-full text-sm font-medium flex items-center gap-1 text-white"
                                        >
                                            <AnimatePresence>
                                                {isHovered && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                        className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                                                    />
                                                )}
                                            </AnimatePresence>

                                            {/* Bottom beam */}
                                            <motion.div
                                                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
                                                initial={false}
                                                animate={{
                                                    width: isHovered ? "50%" : "0%",
                                                    opacity: isHovered ? 0.8 : 0,
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            />

                                            {/* Label */}
                                            <motion.span
                                                className="relative z-10 flex items-center gap-1"
                                                animate={{
                                                    scale: isHovered ? 1.05 : 1,
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.hot && <Sparkles className="h-3 w-3 text-amber-400" />}
                                                {item.label}
                                            </motion.span>

                                            {item.hot && (
                                                <motion.span
                                                    className="absolute -top-1.5 -right-2 z-20 px-1 py-px text-[7px] font-bold uppercase rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white leading-none"
                                                    animate={{
                                                        boxShadow: [
                                                            "0 0 3px rgba(245,158,11,0.3)",
                                                            "0 0 8px rgba(245,158,11,0.6)",
                                                            "0 0 3px rgba(245,158,11,0.3)",
                                                        ],
                                                        scale: [1, 1.15, 1],
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    Hot
                                                </motion.span>
                                            )}
                                            {item.children && (
                                                <ChevronDown size={14} className="relative z-10 opacity-70" />
                                            )}
                                        </button>

                                        {/* Dropdown stays SAME */}
                                        <AnimatePresence>
                                            {item.children && hovered === item.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="absolute top-full left-0 pt-4 z-50"
                                                >
                                                    <div className="
                  w-56
                  bg-[#FFFFFF]
                  border border-[#3FB8FF]/20
                  shadow-[0_10px_30px_rgba(27,18,11,0.08)]
                  rounded-xl
                  p-3
                  space-y-1
                ">
                                                        {item.children.map((subItem) => (
                                                            <button
                                                                key={subItem.id}
                                                                onClick={() => handleNavClick(subItem.id)}
                                                                className="
                        block w-full text-left
                        px-3 py-2
                        rounded-lg
                        text-sm
                        text-[#1B120B]
                        transition-all duration-200
                        hover:bg-[#3FB8FF]/10
                      "
                                                            >
                                                                {subItem.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </div>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <SearchDialog />

                        {isLoggedIn ? (
                            <PremiumButton
                                size="sm"
                                onClick={() => router.push('itinerary/profile')}
                                variant={isScrolled ? "ghost" : "primary"}
                            >
                                Profile
                                <User2 size={18} />
                            </PremiumButton>
                        ) : (
                            <PremiumButton
                                size="sm"
                                variant={isScrolled ? "ghost" : "primary"}
                                onClick={onAuthOpen}
                            >
                                Login
                                <LogIn size={18} />
                            </PremiumButton>
                        )}

                        {/* <PremiumButton
                size="sm"
                variant="secondary"
                onClick={onAuthOpen}
            >
                Book Demo
                <HiOutlineBriefcase size={18} />
            </PremiumButton> */}

                    </div>

                    <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden text-[#FFFFFF]"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </motion.header>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed top-[70px]  z-40 md:hidden" style={{ width: "100%" }}
                    >
                        <div className="bg-[#3FB8FF] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-4">

                            {/* CLOSE */}
                            <div className="flex justify-end mb-2">
                                <button onClick={() => setMenuOpen(false)}>
                                    <X className="text-white" size={22} />
                                </button>
                            </div>

                            {/* NAV */}
                            <div className="space-y-1">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        {!item.children ? (
                                            <button
                                                onClick={() => {
                                                    if (item.label === "AI") {
                                                        router.push("/itinerary/ai")
                                                        return
                                                    }
                                                    handleNavClick(item.id!)
                                                }}
                                                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-white/90 hover:bg-white/15 transition flex items-center gap-2"
                                            >
                                                {item.hot && <Sparkles className="h-3 w-3 text-amber-300" />}
                                                {item.label}

                                                {item.hot && (
                                                    <span className="ml-2 px-1 py-px text-[8px] font-bold uppercase rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                                        Hot
                                                    </span>
                                                )}
                                            </button>
                                        ) : (
                                            <>
                                                <div className="px-4 py-2 text-white font-semibold">
                                                    {item.label}
                                                </div>

                                                <div className="pl-3 space-y-1">
                                                    {item.children.map((subItem) => (
                                                        <button
                                                            key={subItem.id}
                                                            onClick={() => handleNavClick(subItem.id)}
                                                            className="block w-full text-left px-4 py-2 text-sm text-white/75 hover:bg-white/15 rounded-lg transition"
                                                        >
                                                            {subItem.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* ACTIONS */}
                            <div className="pt-4 mt-3 border-t border-white/15 flex flex-col gap-3">
                                {isLoggedIn ? (
                                    <PremiumButton size="sm">
                                        Profile
                                    </PremiumButton>
                                ) : (
                                    <PremiumButton
                                        size="sm"
                                        onClick={() => {
                                            setMenuOpen(false)
                                            onAuthOpen?.()
                                        }}
                                    >
                                        Login
                                    </PremiumButton>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}