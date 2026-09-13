"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import HeaderNav from "./HeaderNav"
import AuthRoleDialog from "./AuthDialog"

const wordVariant: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const travelCards = [
    [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=900&q=85",
    ],
]

const mobileBackgroundImage = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90"

function TravelCard({ images, index, className = "" }: { images: string[]; index: number; className?: string }) {
    const imageIndex = index % images.length

    return (
        <div className={`relative w-full overflow-hidden rounded-[1.5rem] shadow-[0_18px_45px_rgba(14,64,199,0.12)] ${className}`}>
            <AnimatePresence initial={false}>
                <motion.img key={images[imageIndex]} src={images[imageIndex]} alt="Travel destination" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1 }} transition={{ opacity: { duration: 1.2, ease: "easeInOut" }, scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }} className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B120B]/20 to-transparent" />
        </div>
    )
}

export default function HeroSection() {
    const router = useRouter()
    const [authOpen, setAuthOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const words = ["Knows", "Understands", "Remembers"]

    useEffect(() => {
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000)
        return () => clearInterval(timer)
    }, [])

    const scrollToSection = () => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }

    const goToItinerary = () => {
        router.push("/itinerary/packages")
    }

    return (
        <section className="relative min-h-screen w-full overflow-hidden lg:min-h-[100svh]">
            <HeaderNav enableScrollBg position="fixed" onAuthOpen={() => router.push("/auth")} />

            <div className="flex min-h-screen w-full flex-col lg:min-h-[100svh] lg:flex-row">
                {/* DESKTOP / LAPTOP IMAGE COLLAGE */}
                <motion.div initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative hidden min-h-[100svh] w-[60%] items-center justify-center px-4 lg:flex lg:-mr-6 xl:-mr-10">
                    <div className="grid w-full max-w-[900px] grid-cols-3 items-center gap-3 sm:gap-4 lg:gap-5">
                        <div className="flex flex-col gap-4 sm:gap-5">
                            <TravelCard images={travelCards[1]} index={index} className="h-[260px] sm:h-[290px] lg:h-[310px]" />
                            <TravelCard images={travelCards[2]} index={index} className="h-[220px] sm:h-[250px] lg:h-[260px]" />
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-5">
                            <TravelCard images={travelCards[3]} index={index} className="h-[300px] sm:h-[350px] lg:h-[360px]" />
                            <TravelCard images={travelCards[4]} index={index} className="h-[220px] sm:h-[250px] lg:h-[260px]" />
                        </div>

                        <div className="flex items-center">
                            <TravelCard images={travelCards[0]} index={index} className="h-[390px] sm:h-[470px] lg:h-[500px]" />
                        </div>
                    </div>
                </motion.div>

                {/* HERO CONTENT */}
                <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 py-20 sm:px-10 lg:-ml-6 lg:min-h-[100svh] lg:w-[40%] lg:px-6 xl:-ml-10 xl:px-8">
                    {/* MOBILE BACKGROUND IMAGE */}
                    <div className="pointer-events-none absolute inset-0 lg:hidden">
                        <img src={mobileBackgroundImage} alt="" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-[#071A38]/75" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#071A38]/85 via-[#071A38]/70 to-[#071A38]/90" />
                    </div>

                    {/* DESKTOP DECORATIVE CIRCLE */}
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute -right-40 -top-40 hidden h-[500px] w-[500px] rounded-full border border-[#479EA8]/10 lg:block" />

                    <div className="relative z-10 w-full max-w-2xl">
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5 flex items-center justify-center gap-2">
                            <span className="h-px w-8 bg-[#FBAB18]" />
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FBAB18] lg:text-[#479EA8]">Your journey, your way</span>
                            <span className="h-px w-8 bg-[#FBAB18]" />
                        </motion.div>

                        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="text-center">
                            <motion.h1 variants={wordVariant} className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[#10213F] xl:text-7xl">
                                Travel That
                            </motion.h1>

                            <div className="relative mx-auto my-2 flex h-[60px] w-full items-center justify-center overflow-hidden sm:h-[75px] md:h-[90px] lg:my-3 lg:h-[95px] xl:h-[105px]">
                                <AnimatePresence mode="wait">
                                    <motion.span key={words[index]} initial={{ y: 45, opacity: 0, filter: "blur(10px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: -45, opacity: 0, filter: "blur(10px)" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="absolute text-4xl font-extrabold text-[#FBAB18] sm:text-5xl md:text-6xl lg:text-[#FBAB18] xl:text-7xl">
                                        {words[index]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>

                            <motion.h1 variants={wordVariant} className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[#10213F] xl:text-7xl">
                                You
                            </motion.h1>

                            <motion.p variants={wordVariant} className="mx-auto mt-7 max-w-lg text-base font-medium leading-relaxed text-white/90 sm:text-lg md:text-xl lg:font-normal lg:text-[#536174]">
                                Because the best trips start with
                                <br className="hidden sm:block" />
                                <span className="font-bold text-white lg:font-medium lg:text-[#10213F]">knowing the traveler.</span>
                            </motion.p>

                            <motion.div variants={wordVariant} className="mt-9 flex justify-center">
                                <button onClick={goToItinerary} className="group inline-flex items-center gap-3 rounded-full bg-[#0E40C7] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#000000]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0E40C7]/30 active:translate-y-0 sm:px-8 sm:text-lg">
                                    <span>Plan My Journey</span>
                                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </motion.div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }} className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 border-t border-white/20 pt-5 sm:gap-6 sm:pt-6 lg:mt-12 lg:border-[#10213F]/10 lg:pt-6">
                            {[
                                ["Personalized", "Just for you"],
                                ["Smarter", "Every journey"],
                                ["Made for you", "Not everyone"],
                            ].map(([title, subtitle], i) => (
                                <div key={title} className="flex items-center gap-3 sm:gap-6">
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-white sm:text-sm lg:text-[#10213F]">{title}</p>
                                        <p className="mt-1 text-[10px] text-white/65 sm:text-xs lg:text-[#6B7280]">{subtitle}</p>
                                    </div>
                                    {i < 2 && <div className="h-8 w-px bg-white/20 lg:bg-[#10213F]/10" />}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* EXPLORE MORE */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} onClick={scrollToSection} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 cursor-pointer text-center sm:bottom-8 lg:block">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0E40C7]/70">Explore More</span>
                            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                                <ChevronDown size={24} strokeWidth={1.5} className="text-[#0E40C7]" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <AuthRoleDialog open={authOpen} onOpenChange={setAuthOpen} />
        </section>
    )
}