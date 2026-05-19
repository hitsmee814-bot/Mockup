"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, User, Briefcase, Building2, Truck, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import HeaderNav from "./HeaderNav"
import AuthRoleDialog from "./AuthDialog"

const repoPath = process.env.NODE_ENV === "production" ? "/Mockup" : ""

const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export default function VideoMain() {
    const router = useRouter()
    const [authOpen, setAuthOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const words = ["Knows", "Understands", "Remembers"]

    // Handle cycling through words every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [words.length])

    const scrollToSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        })
    }

    const goToItinerary = () => {
        router.push("/itinerary/packages") // Adjust this route as needed
    }

    return (
        <section className="relative w-full min-h-[100svh] overflow-hidden">
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
                onAuthOpen={() => router.push("/auth")}
            />

            <div
                id="hero"
                className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] text-center px-4"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                    className="flex flex-col items-center text-white"
                >
                    <motion.h1
                        variants={wordVariant}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        Travel That
                    </motion.h1>

                    <div className="relative h-[60px] sm:h-[80px] md:h-[110px] w-full flex items-center justify-center overflow-hidden my-2">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={words[index]}
                                initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: -50, opacity: 0, filter: "blur(10px)" }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="absolute text-4xl sm:text-5xl md:text-7xl font-bold text-[#3FB8FF]"
                            >
                                {words[index]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <motion.h1
                        variants={wordVariant}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        You
                    </motion.h1>

                    <motion.p
                        variants={wordVariant}
                        className="mt-8 text-base sm:text-lg md:text-xl max-w-xl text-white/80 font-light"
                    >
                        Because the best trips start with knowing the traveler.
                    </motion.p>
                    <motion.div
                        variants={wordVariant}
                        className="mt-10"
                    >
                        <button
                            onClick={goToItinerary}
                            className="
        inline-flex items-center gap-3
        px-8 py-4
        rounded-full
        bg-[#3FB8FF] text-white
        font-semibold
        shadow-lg
        transition-all duration-300
        hover:bg-[#3FB8FF]
        hover:shadow-xl
        hover:-translate-y-0.5
        active:translate-y-0 active:shadow-md
        "
                        >
                            <span>Plan My Journey</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
                <motion.div
                    onClick={scrollToSection}
                    className="flex flex-col items-center gap-2 text-white cursor-pointer group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span className="text-xs uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
                        Explore More
                    </span>

                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="group-hover:text-[#3FB8FF] transition-colors"
                    >
                        <ChevronDown size={28} strokeWidth={1.5} />
                    </motion.div>
                </motion.div>
            </div>

            <AuthRoleDialog open={authOpen} onOpenChange={setAuthOpen} />
        </section>
    )
}