"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    X,
    MapPin,
    Mail,
    Phone,
    Clock,
    ArrowUpRight,
    Headphones,
    MessageCircle,
} from "lucide-react"

import { FaWhatsapp } from "react-icons/fa"
export default function HelpWidget() {
    const [open, setOpen] = useState(false)
    const widgetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return

        const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
            if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)
        document.addEventListener("touchstart", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
            document.removeEventListener("touchstart", handleOutsideClick)
        }
    }, [open])

    return (
        <div ref={widgetRef} className="fixed bottom-4 right-4 z-[9999] sm:bottom-6 sm:right-6">
            {/* CONTACT CARD */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="absolute bottom-14 right-0 w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl shadow-black/10 sm:bottom-16 sm:w-[calc(100vw-2.5rem)] sm:max-w-[380px]"
                    >
                        {/* HEADER */}
                        <div className="bg-[#0E40C7] px-4 py-3.5 text-white sm:px-5 sm:py-5">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2.5 sm:gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 sm:h-10 sm:w-10 sm:rounded-xl">
                                        <Headphones className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-semibold sm:text-sm">Need Help?</h3>
                                        <p className="mt-0.5 text-[10px] text-white/70 sm:text-xs">
                                            We&apos;re happy to help.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Close help"
                                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* CONTACT DETAILS */}
                        <div className="p-3.5 sm:p-5">
                            <div className="space-y-0.5 sm:space-y-1">
                                {/* ADDRESS */}
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Ecospace%2C%20AA%20II%2C%20Newtown%2C%20Chakpachuria%2C%20West%20Bengal%20700160"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex gap-2.5 rounded-lg p-2.5 transition hover:bg-[#F8F6EF] sm:gap-3 sm:rounded-xl sm:p-3"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E40C7]/10 text-[#0E40C7] sm:h-9 sm:w-9">
                                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <p className="text-[10px] font-medium text-black/50 sm:text-xs">
                                                Office
                                            </p>
                                            <ArrowUpRight className="h-2.5 w-2.5 text-black/30 transition group-hover:text-[#0E40C7] sm:h-3 sm:w-3" />
                                        </div>

                                        <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#10213F] sm:mt-1 sm:text-sm">
                                            Ecospace, AA II, Newtown, Chakpachuria, West Bengal 700160
                                        </p>
                                    </div>
                                </a>

                                {/* EMAIL */}
                                <a
                                    href="mailto:support@bonhomiee.com"
                                    className="flex gap-2.5 rounded-lg p-2.5 transition hover:bg-[#F8F6EF] sm:gap-3 sm:rounded-xl sm:p-3"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E40C7]/10 text-[#0E40C7] sm:h-9 sm:w-9">
                                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[10px] font-medium text-black/50 sm:text-xs">
                                            Email
                                        </p>
                                        <p className="mt-0.5 truncate text-xs font-medium text-[#10213F] sm:mt-1 sm:text-sm">
                                            support@bonhomiee.com
                                        </p>
                                    </div>
                                </a>

                                {/* PHONE */}
                                <a
                                    href="tel:+919830268500"
                                    className="flex gap-2.5 rounded-lg p-2.5 transition hover:bg-[#F8F6EF] sm:gap-3 sm:rounded-xl sm:p-3"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E40C7]/10 text-[#0E40C7] sm:h-9 sm:w-9">
                                        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-medium text-black/50 sm:text-xs">
                                            Phone
                                        </p>
                                        <p className="mt-0.5 text-xs font-medium text-[#10213F] sm:mt-1 sm:text-sm">
                                            098302 68500
                                        </p>
                                    </div>
                                </a>

                                {/* HOURS */}
                                <div className="flex gap-2.5 rounded-lg p-2.5 sm:gap-3 sm:rounded-xl sm:p-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E40C7]/10 text-[#0E40C7] sm:h-9 sm:w-9">
                                        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-medium text-black/50 sm:text-xs">
                                            Hours
                                        </p>
                                        <p className="mt-0.5 text-xs font-medium text-[#10213F] sm:mt-1 sm:text-sm">
                                            Open · Closes 10 PM
                                        </p>
                                    </div>
                                </div>
                            </div>

{/* ACTIONS */}
<div className="mt-3 flex h-10 items-stretch gap-2 sm:mt-4 sm:h-12">
    {/* GET DIRECTIONS */}
    <a
        href="https://www.google.com/maps/search/?api=1&query=Ecospace%2C%20AA%20II%2C%20Newtown%2C%20Chakpachuria%2C%20West%20Bengal%20700160"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[#0E40C7] px-3 text-xs font-semibold leading-none text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B36A8] hover:shadow-lg sm:px-5 sm:text-sm"
    >
        <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        <span>Get Directions</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
    </a>

    {/* TRAVEL CIRCLE */}
    <a
        href="https://chat.whatsapp.com/Kch6ORF0b0vDnTmfb0exW3"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join Travel Circle on WhatsApp"
        className="flex h-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 text-xs font-semibold leading-none text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20BD5A] hover:shadow-md sm:gap-2 sm:px-4 sm:text-sm"
    >
        <FaWhatsapp className="block h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
        <span>Travel Circle</span>
    </a>
</div>
                        </div>

                        {/* FOOTER */}
                        <div className="border-t border-black/5 px-4 py-2.5 text-center sm:px-5 sm:py-3">
                            <p className="text-[9px] text-black/40 sm:text-[10px]">
                                Bonhomiee · Travel, thoughtfully designed.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOATING BUTTON */}
            <motion.button
                onClick={() => setOpen((prev) => !prev)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                aria-label={open ? "Close help" : "Open help"}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0E40C7] text-white shadow-lg shadow-[#0E40C7]/25 sm:h-14 sm:w-14"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <X className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="help"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                        >
                            <Headphones className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}