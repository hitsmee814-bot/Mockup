"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, X, ArrowLeft } from "lucide-react"
import type { View } from "./types"
import HomeView from "./HomeView"
import FAQView from "./FAQView"
import ContactView from "./ContactView"
import RequestView from "./RequestView"
import logoPrimary from "../../assets/images/white.png"
import Image from "next/image"

const viewTitle: Record<View, string> = {
    home: "Help & Support",
    faq: "FAQs",
    contact: "Contact Us",
    request: "Ask a Question",
}

export default function HelpWidget() {
    const [open, setOpen] = useState(false)
    const [view, setView] = useState<View>("home")

    const close = () => {
        setOpen(false)
        setTimeout(() => setView("home"), 300)
    }

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="mb-2 flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-primary/20 shadow-2xl shadow-primary/20 sm:w-[380px]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-primary px-4 py-3.5 sm:px-5 sm:py-4">
                            <div className="flex items-center gap-2.5">
                                {view !== "home" && (
                                    <motion.button
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        onClick={() => setView("home")}
                                        className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-primary-foreground/20"
                                    >
                                        <ArrowLeft className="h-4 w-4 text-primary-foreground" />
                                    </motion.button>
                                )}
                                <div>
                                    <h3 className="text-sm font-semibold text-primary-foreground">
                                        {viewTitle[view]}
                                    </h3>
                                    <p className="text-[11px] text-primary-foreground/70">
                                        We&apos;re here to help, 24/7
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={close}
                                className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-primary-foreground/20"
                            >
                                <X className="h-4 w-4 text-white" />
                            </button>
                        </div>

                        <div className="force-light custom-scrollbar max-h-[min(480px,60vh)] overflow-y-auto bg-white px-4 py-4 sm:px-5">
                            <AnimatePresence mode="wait">
                                {view === "home" && <HomeView setView={setView} />}
                                {view === "faq" && <FAQView />}
                                {view === "contact" && <ContactView />}
                                {view === "request" && <RequestView />}
                            </AnimatePresence>
                        </div>

                        <div className="bg-primary px-5 py-2.5">
                            <p className="text-center text-[10px] text-primary-foreground/70">
                                Powered by Bonhomiee
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (open ? close() : setOpen(true))}
                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg shadow-secondary/30 sm:h-14 sm:w-14"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <X className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="help"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {/* <HelpCircle className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" /> */}
                            <Image src={logoPrimary} alt="logo" height={30} width={30}/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}
