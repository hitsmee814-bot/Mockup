"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import logoPrimary from "../assets/images/logoPrimary.png"
import logoSecondary from "../assets/images/logo png 2.png"

const repoPath = process.env.NODE_ENV === "production" ? "/Mockup" : ""

const navItems = [
  { label: "Getting Started", id: "hero-sub" },
  { label: "Packages", id: "packages" },
  { label: "Our Services", id: "services" },
  { label: "Inspiration", id: "inspiration" },
  { label: "About us", id: "team" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Privacy", id: "privacy" },
  { label: "FAQs", id: "faq" },
]

interface HeaderNavProps {
  enableScrollBg?: boolean
  onAuthOpen?: () => void
  position?: "fixed" | "sticky"
}

export default function HeaderNav({
  enableScrollBg = false,
  onAuthOpen,
  position
}: HeaderNavProps) {
  const [scrollRatio, setScrollRatio] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const [active, setActive] = useState(navItems[0].id)
  const isScrolled = scrollRatio > 0.6
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
    const el = document.getElementById(id)
    if (!el) return

    const y = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: y, behavior: "smooth" })
    setMenuOpen(false)
  }

  const bgColor = enableScrollBg
    ? `rgba(
   14, 64, 199,
      ${0 + scrollRatio}
    )`
    : "rgba(14, 64, 199, 1)"

  const headerShadow =
    enableScrollBg && scrollRatio > 0.5 ? "shadow-md" : ""

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ backgroundColor: bgColor }}
        className={`
  ${position === "fixed" ? "fixed top-0 left-0" : "sticky top-0"}
  w-full
  z-50
  px-4 md:px-10
  py-4
  transition-all
  ${headerShadow}
`}
      >
        <div className="flex items-center justify-between">
          <a href="/" className="relative flex items-center gap-2 w-[150px] h-8">
            <motion.div
              style={{ opacity: 1 - scrollRatio }}
              className="absolute inset-0"
            >
              <Image src={logoPrimary} alt="Logo" fill style={{ objectFit: "contain" }} />
            </motion.div>

            <motion.div
              style={{ opacity: scrollRatio }}
              className="absolute inset-0"
            >
              <Image src={logoSecondary} alt="Logo" fill style={{ objectFit: "contain" }} />
            </motion.div>

            <span className="relative ml-[100px] font-bold text-lg text-white" style={{ fontFamily: "Cocon, sans-serif" }}>Bonhomiee</span>
          </a>
          <nav className="hidden md:flex items-center gap-3 lg:gap-6 relative">
            {navItems.map((item) => {
              const isActive = active === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActive(item.id)
                    handleNavClick(item.id)
                  }}
                  className="relative px-4 py-2 text-sm font-medium"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 420, damping: 35 }}
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        background: isScrolled
                          ? "rgba(255,255,255,0.12)"
                          : "rgb(14, 63, 199)",
                        border: isScrolled
                          ? "1px solid rgba(255,255,255,0.25)"
                          : "1px solid rgb(14, 63, 199)",
                        backdropFilter: isScrolled ? "blur(8px)" : "none",
                      }}
                    />
                  )}

                  {/* ✨ Text */}
                  <span
                    className="relative z-10 transition-colors duration-300"
                    style={{
                      color: isScrolled
                        ? "white"
                        : "rgba(255,255,255,0.95)",
                    }}
                  >
                    {item.label}
                  </span>

                  <motion.span
                    className="absolute left-1/2 -bottom-1 h-[2px] rounded-full"
                    initial={false}
                    animate={{ width: 0, x: "-50%" }}
                    whileHover={{ width: "60%" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      backgroundColor: isScrolled ? "white" : "#0E40C7",
                    }}
                  />
                </button>
              )
            })}
          </nav>

          <div className="hidden md:flex gap-2">
            <motion.button
              onClick={onAuthOpen}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative overflow-hidden px-4 py-2 rounded-md text-sm font-medium"
            >
              <span
                className="absolute inset-0 rounded-md"
                style={{
                  background: isScrolled
                    ? "rgba(255,255,255,0.12)"
                    : "#0E40C7",
                  border: isScrolled
                    ? "1px solid rgba(255,255,255,0.3)"
                    : "1px solid rgba(14,64,199,0.6)",
                  backdropFilter: isScrolled ? "blur(8px)" : "none",
                }}
              />

              <span className="absolute inset-0 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: isScrolled
                    ? "0 0 0 rgba(255,255,255,0)"
                    : "0 8px 24px rgba(14,64,199,0.45)",
                }}
              />

              <span className="relative z-10 text-white">
                Login / Signup
              </span>
            </motion.button>
            <motion.button
              onClick={onAuthOpen}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative overflow-hidden px-4 py-2 rounded-md text-sm font-medium"
            >
              <span
                className="absolute inset-0 rounded-md"
                style={{
                  background: isScrolled
                    ? "rgba(255,255,255,0.12)"
                    : "#0E40C7",
                  border: isScrolled
                    ? "1px solid rgba(255,255,255,0.3)"
                    : "1px solid rgba(14,64,199,0.6)",
                  backdropFilter: isScrolled ? "blur(8px)" : "none",
                }}
              />

              <span className="absolute inset-0 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: isScrolled
                    ? "0 0 0 rgba(255,255,255,0)"
                    : "0 8px 24px rgba(14,64,199,0.45)",
                }}
              />

              <span className="relative z-10 text-white">
                Book Demo
              </span>
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
                    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#0E40C7] transition-all group-hover:w-full" />
                  </button>
                ))}
              </nav>

              <button
                onClick={() => {
                  setMenuOpen(false)
                  onAuthOpen?.()
                }}
                className="mt-10 w-full py-3 rounded-sm bg-[#0E40C7] font-medium"
              >
                Login / Signup
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false)
                  onAuthOpen?.()
                }}
                className="mt-4 w-full py-3 rounded-sm bg-[#0E40C7] font-medium"
              >
                Book Demo
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}