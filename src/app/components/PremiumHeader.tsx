"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { Search, LogIn, Menu, X, Sparkles } from "lucide-react"
import { AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/overview/dashboard", label: "Dashboard" },
  { href: "/packages", label: "Explore" },
  { href: "/bookings", label: "Bookings" },
  { href: "/finances/payments", label: "Finances" },
  { href: "/smartai", label: "AI", hot: true },
  { href: "/about-us", label: "About Us" },
]

export function PremiumHeader() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20))

  const blur = useTransform(scrollY, [0, 60], [8, 18])
  const shadowOpacity = useTransform(scrollY, [0, 60], [0, 0.08])

  return (
    <>
      <motion.header className="sticky top-0 z-50 w-full">
        <motion.div
          style={{
            backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
            WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
            boxShadow: useTransform(shadowOpacity, (v) => `0 4px 24px rgba(0,0,0,${v})`),
          }}
          className="rounded-b-2xl bg-background/90 border-b border-border/50"
        >
          <div className="relative flex items-center justify-between px-5 sm:px-8 h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <motion.div
                className="relative h-8 w-8 rounded-xl overflow-hidden shadow-sm"
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <img
                  src="https://ui-avatars.com/api/?name=B&background=3FB8FF&color=fff&bold=true&size=64&rounded=true"
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <motion.span
                className="text-lg font-bold tracking-tight text-foreground hidden sm:block"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Company
              </motion.span>
            </Link>

            {/* Center Nav */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center gap-0.5 rounded-full p-1 bg-muted/50 border border-border/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                {navLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href)
                  const isHovered = hovered === link.href

                  return (
                    <Link key={link.href} href={link.href}>
                      <motion.div
                        className="relative px-5 py-2 rounded-full cursor-pointer"
                        onMouseEnter={() => setHovered(link.href)}
                        onMouseLeave={() => setHovered(null)}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Active pill */}
                        {isActive && (
                          <motion.div
                            layoutId="header-active-pill"
                            className="absolute inset-0 rounded-full bg-card shadow-sm border border-border"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}

                        {/* Hover glow */}
                        <AnimatePresence>
                          {isHovered && !isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                              className="absolute inset-0 rounded-full bg-primary/[0.07] border border-primary/10 shadow-[0_0_12px_rgba(63,184,255,0.08)]"
                            />
                          )}
                        </AnimatePresence>

                        {/* Bottom beam */}
                        <motion.div
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                          initial={false}
                          animate={{
                            width: isActive ? "50%" : isHovered ? "50%" : "0%",
                            opacity: isActive ? 1 : isHovered ? 0.8 : 0,
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />

                        {/* Active shimmer */}
                        {isActive && (
                          <motion.div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                            />
                          </motion.div>
                        )}

                        {/* Label */}
                        <motion.span
                          className="relative z-10 text-sm font-medium flex items-center gap-1"
                          animate={{
                            color: isActive ? "var(--primary)" : isHovered ? "var(--primary)" : "var(--muted-foreground)",
                            scale: isHovered && !isActive ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {"hot" in link && <Sparkles className="h-3 w-3 text-amber-500" />}
                          {link.label}
                        </motion.span>

                        {/* Hot badge top-right */}
                        {"hot" in link && (
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

                        {/* Active dot */}
                        {isActive && (
                          <motion.div
                            layoutId="header-dot"
                            className="absolute -top-0.5 right-2 h-1.5 w-1.5 rounded-full bg-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-full bg-primary/50"
                              animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Search */}
              <motion.div
                className="relative hidden sm:flex items-center"
                animate={{ width: focused ? 220 : 160 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div
                  animate={{ color: focused ? "var(--primary)" : "var(--muted-foreground)" }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-3 pointer-events-none"
                >
                  <Search className="h-3.5 w-3.5" />
                </motion.div>
                <input
                  type="text"
                  placeholder="Search..."
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="w-full h-8 pl-9 pr-3 text-xs rounded-full bg-muted/50 border border-border text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:bg-card transition-all placeholder:text-muted-foreground"
                />
              </motion.div>

              {/* Login */}
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 16px rgba(63,184,255,0.25)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-sm"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Login</span>
                </motion.button>
              </Link>

              {/* Mobile menu */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[62px] left-2 right-2 z-40 bg-background/98 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg p-4 space-y-1 md:hidden"
          >
            <div className="relative mb-3 sm:hidden">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-9 pl-9 pr-3 text-sm rounded-xl bg-muted/50 border border-border text-foreground outline-none focus:border-primary/40 transition-all placeholder:text-muted-foreground"
              />
            </div>
            {navLinks.map((link, i) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
                  >
                    {isActive && <motion.div className="w-1.5 h-1.5 rounded-full bg-primary mr-2.5" layoutId="mobile-dot" />}
                    {"hot" in link && <Sparkles className="h-3 w-3 text-amber-500 mr-1" />}
                    {link.label}
                    {"hot" in link && (
                      <motion.span
                        className="ml-1.5 px-1 py-px text-[7px] font-bold uppercase rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white leading-none"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Hot
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
