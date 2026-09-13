"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
    Menu,
    X,
    ChevronDown,
    LogIn,
    UserRound,
    Sparkles,
    MapPinned,
    BriefcaseBusiness,
    Compass,
    Headphones,
} from "lucide-react"
import logoPrimary from "../assets/images/final logo Bonhomiee white without.png"
import { PremiumButton } from "../utils/PremiumButton"
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
    icon: React.ElementType
}

const navItems: NavItem[] = [
    { label: "Curated Trips", id: "toppackages", icon: MapPinned },
    { label: "Our Offerings", id: "packages", icon: BriefcaseBusiness },
    { label: "The Bonhomiee Way", id: "about", icon: Compass },
    { label: "Contact Us", id: "faq", icon: Headphones },
    { label: "AI", id: "ai", hot: true, icon: Sparkles },
]

interface HeaderNavProps {
    enableScrollBg?: boolean
    onAuthOpen?: () => void
    position?: "fixed" | "sticky"
}

export default function HeaderNav({ enableScrollBg = false, onAuthOpen, position = "sticky" }: HeaderNavProps) {
    const router = useRouter()
    const [scrollRatio, setScrollRatio] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)
    const [hovered, setHovered] = useState<string | null>(null)
    const { isLoggedIn } = useAuth()

    const isScrolled = enableScrollBg ? scrollRatio > 0.6 : true

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [menuOpen])

    useEffect(() => {
        if (!enableScrollBg) return

        const threshold = 200
        const handleScroll = () => setScrollRatio(Math.min(window.scrollY / threshold, 1))

        window.addEventListener("scroll", handleScroll)
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [enableScrollBg])

    const handleNavClick = (id: string) => {
        if (id === "packages") {
            router.push("/itinerary/packages")
            setMenuOpen(false)
            return
        }

        if (id === "about") {
            router.push("/about")
            setMenuOpen(false)
            return
        }

        const el = document.getElementById(id)
        if (!el) return

        const y = el.getBoundingClientRect().top + window.scrollY

        window.scrollTo({ top: y, behavior: "smooth" })
        setMenuOpen(false)
    }

    return (
        <>
            <motion.header initial={enableScrollBg ? { y: -80, opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className={`${position === "fixed" ? "fixed top-0 left-0" : "sticky top-0"} w-full z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-xl" : ""}`} style={{ background: "#0E40C7" }}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    <div className="relative w-[160px] h-10 cursor-pointer" onClick={() => handleNavClick("hero-sub")}>
                        <Image src={logoPrimary} alt="Logo" fill style={{ objectFit: "contain" }} />
                    </div>

                    <nav className="hidden md:flex items-center">
                        <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]">
                            {navItems.map((item) => {
                                const isHovered = hovered === item.label

                                return (
                                    <div key={item.label} className="relative" onMouseEnter={() => setHovered(item.label)} onMouseLeave={() => setHovered(null)}>
                                        <button onClick={() => {
                                            if (item.label === "AI") {
                                                router.push("/itinerary/ai")
                                                return
                                            }
                                            if (!item.children) handleNavClick(item.id!)
                                        }} className="relative px-5 py-2 rounded-full text-sm font-medium flex items-center gap-1 text-white">
                                            <AnimatePresence>
                                                {isHovered && (
                                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)]" />
                                                )}
                                            </AnimatePresence>

                                            <motion.div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent" initial={false} animate={{ width: isHovered ? "50%" : "0%", opacity: isHovered ? 0.8 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} />

                                            <motion.span className="relative z-10 flex items-center gap-1" animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.2 }}>
                                                {item.hot && <Sparkles className="h-3 w-3 text-amber-400" />}
                                                {item.label}
                                            </motion.span>

                                            {item.hot && (
                                                <motion.span className="absolute -top-1.5 -right-2 z-20 px-1 py-px text-[7px] font-bold uppercase rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white leading-none" animate={{ boxShadow: ["0 0 3px rgba(245,158,11,0.3)", "0 0 8px rgba(245,158,11,0.6)", "0 0 3px rgba(245,158,11,0.3)"], scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                                                    Hot
                                                </motion.span>
                                            )}

                                            {item.children && <ChevronDown size={14} className="relative z-10 opacity-70" />}
                                        </button>

                                        <AnimatePresence>
                                            {item.children && hovered === item.label && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }} className="absolute top-full left-0 pt-4 z-50">
                                                    <div className="w-56 bg-white border border-[#0E40C7]/20 shadow-[0_10px_30px_rgba(27,18,11,0.08)] rounded-xl p-3 space-y-1">
                                                        {item.children.map((subItem) => (
                                                            <button key={subItem.id} onClick={() => handleNavClick(subItem.id)} className="block w-full text-left px-3 py-2 rounded-lg text-sm text-[#1B120B] transition-all duration-200 hover:bg-[#0E40C7]/10">
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
                        {isLoggedIn ? (
                            <PremiumButton size="sm" onClick={() => router.push("/itinerary/profile")} variant={isScrolled ? "ghost" : "primary"}>
                                Profile
                                <UserRound size={18} />
                            </PremiumButton>
                        ) : (
                            <PremiumButton size="sm" variant={isScrolled ? "ghost" : "primary"} onClick={onAuthOpen}>
                                Login
                                <LogIn size={18} />
                            </PremiumButton>
                        )}
                    </div>

                    <div className="md:hidden relative z-[60]">
                        <motion.button type="button" onClick={() => setMenuOpen((prev) => !prev)} whileTap={{ scale: 0.9 }} className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md text-white shadow-[0_4px_18px_rgba(0,0,0,0.12)]" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
                            <AnimatePresence mode="wait" initial={false}>
                                {menuOpen ? (
                                    <motion.div key="close" initial={{ opacity: 0, rotate: -90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.7 }} transition={{ duration: 0.2 }}>
                                        <X size={23} strokeWidth={2} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ opacity: 0, rotate: 90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -90, scale: 0.7 }} transition={{ duration: 0.2 }}>
                                        <Menu size={25} strokeWidth={2} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: "easeOut" }} className="fixed top-16 left-0 right-0 z-40 md:hidden">
                        <div className="w-full bg-[#0E40C7] border-t border-white/10 border-b border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
                            <div className="px-4 py-4">

                                <div className="space-y-1.5">
                                    {navItems.map((item, i) => (
                                        <motion.div key={item.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.045, duration: 0.25, ease: "easeOut" }}>
                                            {!item.children ? (
                                                <button type="button" onClick={() => {
                                                    if (item.label === "AI") {
                                                        router.push("/itinerary/ai")
                                                        setMenuOpen(false)
                                                        return
                                                    }
                                                    handleNavClick(item.id!)
                                                }} className="group relative w-full flex items-center px-4 py-3.5 rounded-xl text-left text-sm font-medium text-white border border-transparent transition-all duration-200 hover:bg-white/10 hover:border-white/10 active:scale-[0.98]">

                                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 rounded-full bg-amber-400 transition-all duration-200 group-hover:h-5" />

                                                    {/* PROPER NAV ICON */}
                                                    <span className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-white/10 border border-white/10 text-white/80 transition-all duration-200 group-hover:bg-white/15 group-hover:text-white">
                                                        <item.icon size={16} strokeWidth={1.8} />
                                                    </span>

                                                    <span className="flex-1">{item.label}</span>

                                                    {item.hot && (
                                                        <motion.span className="ml-auto px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_0_12px_rgba(251,171,24,0.25)]" animate={{ boxShadow: ["0 0 5px rgba(251,171,24,0.2)", "0 0 12px rgba(251,171,24,0.45)", "0 0 5px rgba(251,171,24,0.2)"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                                                            Hot
                                                        </motion.span>
                                                    )}

                                                    <span className="ml-3 text-white/30 group-hover:text-white/70 transition-colors">→</span>
                                                </button>
                                            ) : (
                                                <div className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden">

                                                    <div className="px-4 py-3.5 flex items-center text-white font-medium text-sm">
                                                        <span className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-white/10 border border-white/10 text-white/80">
                                                            <item.icon size={16} strokeWidth={1.8} />
                                                        </span>

                                                        {item.label}

                                                        <ChevronDown size={15} className="ml-auto text-white/50" />
                                                    </div>

                                                    <div className="px-3 pb-3 space-y-1">
                                                        {item.children.map((subItem) => (
                                                            <button key={subItem.id} type="button" onClick={() => handleNavClick(subItem.id)} className="group flex items-center w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
                                                                <span className="w-1.5 h-1.5 mr-3 rounded-full bg-white/30 group-hover:bg-amber-400 transition-colors" />
                                                                {subItem.label}
                                                                <span className="ml-auto opacity-0 group-hover:opacity-100 text-white/60 transition-opacity">→</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.2, duration: 0.3 }} className="my-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.25 }}>
                                    {isLoggedIn ? (
                                        <PremiumButton size="sm" className="w-full" onClick={() => {
                                            setMenuOpen(false)
                                            router.push("/itinerary/profile")
                                        }}>
                                            <UserRound size={17} />
                                            Profile
                                        </PremiumButton>
                                    ) : (
                                        <PremiumButton size="sm" className="w-full" onClick={() => {
                                            setMenuOpen(false)
                                            onAuthOpen?.()
                                        }}>
                                            <LogIn size={17} />
                                            Login
                                        </PremiumButton>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}