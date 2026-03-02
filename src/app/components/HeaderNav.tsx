"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import logoPrimary from "../assets/images/final logo Bonhomiee in yellow without.png"

const navItems = [
  { label: "Getting Started", id: "hero-sub" },
  {
    label: "Explore",
    children: [
      { label: "Packages", id: "packages" },
      { label: "Our Services", id: "services" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "Inspiration", id: "inspiration" },
      { label: "About us", id: "team" },
      { label: "Testimonials", id: "testimonials" },
    ],
  },
  {
    label: "Support",
    children: [
      { label: "Privacy", id: "privacy" },
      { label: "FAQs", id: "faq" },
    ],
  },
]

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
  const [scrollRatio, setScrollRatio] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const isScrolled = scrollRatio > 0.6

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
  }, [menuOpen])

  useEffect(() => {
    if (!enableScrollBg) return
    const threshold = 200
    const handleScroll = () =>
      console.log(window.scrollY);
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

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`
    ${position === "fixed" ? "fixed top-0 left-0" : "sticky top-0"}
    w-full z-50
    ${enableScrollBg ? "backdrop-blur-xl border-b border-white/10" : ""}
    transition-all duration-300
  `}
        style={{
          background: enableScrollBg
            ? `rgba(14, 64, 199, ${0.2 + scrollRatio * 0.8})`
            : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div
            className="relative w-[160px] h-10 cursor-pointer"
            onClick={() => handleNavClick("hero-sub")}
          >
            <motion.div
              className="absolute inset-0"
            >
              <Image src={logoPrimary} alt="Logo" fill style={{ objectFit: "contain" }} />
            </motion.div>

          </div>

          <nav className="hidden md:flex items-center gap-10 relative">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <button
                  onClick={() => {
                    if (!item.children) handleNavClick(item.id!)
                  }}
                  className="relative font-medium text-[15px] text-white/90 hover:text-white transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={16}
                      className="opacity-70"
                    />
                  )}

                  <motion.span
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hovered === item.label ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>

<AnimatePresence>
  {item.children && hovered === item.label && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute top-full left-0 pt-4 z-50"
    >
      <div
        className="
          w-56 
          bg-white 
          border border-[#CAD8FF]
          shadow-[0_10px_30px_rgba(4,37,126,0.08)]
          rounded-xl 
          p-3 
          space-y-1
        "
      >
        {item.children.map((subItem) => (
          <button
            key={subItem.id}
            onClick={() => handleNavClick(subItem.id)}
            className="
              block w-full text-left 
              px-3 py-2 
              rounded-lg 
              text-sm 
              text-[#04257E]
              transition-all duration-200
              hover:bg-[#CAD8FF]
              hover:text-[#04257E]
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
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onAuthOpen}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Login
            </button>

            <motion.button
              onClick={onAuthOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-white text-[#0E40C7] shadow-lg"
            >
              Book Demo
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[9999] flex flex-col pt-28 px-8"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6"
            >
              <X size={28} />
            </button>

            <nav className="flex flex-col space-y-6 text-lg font-medium">
              {navItems.map((item) => (
                <div key={item.label}>
                  {!item.children ? (
                    <button
                      onClick={() => handleNavClick(item.id!)}
                      className="text-left py-2 w-full border-b"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <>
                      <div className="font-semibold py-2">
                        {item.label}
                      </div>
                      <div className="pl-4 flex flex-col space-y-3 mt-2 text-base">
                        {item.children.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavClick(subItem.id)}
                            className="text-left text-gray-600"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}

              <div className="pt-10 flex flex-col gap-4">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onAuthOpen?.()
                  }}
                  className="text-center py-3 border rounded-lg"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onAuthOpen?.()
                  }}
                  className="text-center py-3 bg-[#0E40C7] text-white rounded-lg"
                >
                  Book Demo
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}