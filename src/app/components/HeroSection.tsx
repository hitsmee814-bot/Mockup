"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import HeaderNav from "./HeaderNav"
import AuthRoleDialog from "./AuthDialog"

const wordVariant: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
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

const mobileBackgroundImage =
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85"

function TravelCard({
    images,
    index,
    className = "",
}: {
    images: string[]
    index: number
    className?: string
}) {
    const imageIndex = index % images.length

    return (
        <div className={`relative w-full overflow-hidden rounded-[1.25rem] shadow-[0_18px_45px_rgba(14,64,199,0.12)] ${className}`}>
            <AnimatePresence initial={false}>
                <motion.img
                    key={images[imageIndex]}
                    src={images[imageIndex]}
                    alt="Travel destination"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{
                        opacity: { duration: 1.2, ease: "easeInOut" },
                        scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
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
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [])

    const scrollToSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        })
    }

    const goToItinerary = () => {
        router.push("/itinerary/packages")
    }

    return (
        <section className="relative min-h-screen w-full overflow-hidden lg:min-h-[100svh]">
            <HeaderNav enableScrollBg position="fixed" onAuthOpen={() => router.push("/auth")} />

            <div className="flex min-h-screen w-full flex-col lg:min-h-[100svh] lg:flex-row">
                {/* LEFT — TRAVEL COLLAGE */}
                <motion.div
                    initial={{ opacity: 0, x: 90 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative hidden min-h-[100svh] w-full items-center justify-end pl-[clamp(16px,2vw,40px)] pr-0 lg:flex lg:w-[60%]"
                >
                    {/* COMPACT COLLAGE — LAPTOP / HIGHER BROWSER ZOOM */}
                    <div className="grid w-full max-w-[760px] grid-cols-2 gap-3 pr-[clamp(8px,1vw,20px)] xl:hidden">
                        <div className="flex flex-col gap-3">
                            <TravelCard images={travelCards[1]} index={index} className="h-[clamp(210px,30vh,270px)]" />
                            <TravelCard images={travelCards[2]} index={index} className="h-[clamp(160px,23vh,210px)]" />
                        </div>

                        <div className="flex items-center">
                            <TravelCard images={travelCards[0]} index={index} className="h-[clamp(330px,58vh,440px)]" />
                        </div>
                    </div>

                    {/* FULL COLLAGE — LARGER DESKTOP */}
                    <div className="hidden w-full max-w-[900px] grid-cols-3 items-center gap-[clamp(10px,1.2vw,20px)] pr-[clamp(8px,1vw,24px)] xl:grid">
                        <div className="flex flex-col gap-[clamp(10px,1.2vw,20px)]">
                            <TravelCard images={travelCards[1]} index={index} className="h-[clamp(230px,25vh,310px)]" />
                            <TravelCard images={travelCards[2]} index={index} className="h-[clamp(190px,21vh,260px)]" />
                        </div>

                        <div className="flex flex-col gap-[clamp(10px,1.2vw,20px)]">
                            <TravelCard images={travelCards[3]} index={index} className="h-[clamp(260px,29vh,360px)]" />
                            <TravelCard images={travelCards[4]} index={index} className="h-[clamp(190px,21vh,260px)]" />
                        </div>

                        <div className="flex items-center">
                            <TravelCard images={travelCards[0]} index={index} className="h-[clamp(340px,48vh,500px)]" />
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT — HERO CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -70 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-5 py-20 sm:px-10 lg:min-h-[100svh] lg:w-[40%] lg:px-[clamp(24px,3vw,56px)]"
                >
                    {/* MOBILE BACKGROUND */}
                    <div className="pointer-events-none absolute inset-0 lg:hidden">
                        <img src={mobileBackgroundImage} alt="" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-[#071A38]/45" />
                    </div>

                    {/* DESKTOP DECORATIVE CIRCLE */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                        className="pointer-events-none absolute -right-40 -top-40 hidden h-[500px] w-[500px] rounded-full border border-[#479EA8]/10 lg:block"
                    />

                    {/* CONTENT */}
                    <div className="relative z-10 w-full max-w-[680px]">
                        {/* EYEBROW */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.6 }}
                            className="mb-[clamp(14px,1.5vw,22px)] flex items-center justify-center gap-2 lg:justify-start"
                        >
                            <span className="h-px w-6 shrink-0 bg-[#FBAB18] sm:w-8" />
                            <span className="text-[clamp(9px,0.65vw,12px)] font-bold uppercase tracking-[0.2em] text-[#FBAB18] lg:text-[#479EA8]">
                                Your journey, your way
                            </span>
                            <span className="h-px w-6 shrink-0 bg-[#FBAB18] sm:w-8" />
                        </motion.div>

                        {/* MAIN TEXT */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.12,
                                        delayChildren: 0.75,
                                    },
                                },
                            }}
                            className="text-center lg:text-left"
                        >
                            {/* TRAVEL THAT */}
                            <motion.h1
                                variants={wordVariant}
                                className="font-extrabold leading-[0.95] tracking-tight text-white lg:text-[#10213F]"
                                style={{ fontSize: "clamp(2.5rem, 4.2vw, 5.5rem)" }}
                            >
                                Travel That
                            </motion.h1>

                            {/* ANIMATED WORD */}
                            <div
                                className="relative my-2 flex w-full items-center justify-center overflow-hidden lg:my-[clamp(8px,0.8vw,16px)] lg:justify-start"
                                style={{ height: "clamp(3.5rem, 6vw, 7rem)" }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[index]}
                                        initial={{ y: 45, opacity: 0, filter: "blur(10px)" }}
                                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                        exit={{ y: -45, opacity: 0, filter: "blur(10px)" }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute font-extrabold leading-none text-[#FBAB18]"
                                        style={{ fontSize: "clamp(2.5rem, 4.2vw, 5.5rem)" }}
                                    >
                                        {words[index]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>

                            {/* YOU */}
                            <motion.h1
                                variants={wordVariant}
                                className="font-extrabold leading-[0.95] tracking-tight text-white lg:text-[#10213F]"
                                style={{ fontSize: "clamp(2.5rem, 4.2vw, 5.5rem)" }}
                            >
                                You
                            </motion.h1>

                            {/* DESCRIPTION */}
                            <motion.p
                                variants={wordVariant}
                                className="mx-auto mt-[clamp(18px,2vw,30px)] max-w-[580px] text-base font-medium leading-relaxed text-white/90 sm:text-lg lg:mx-0 lg:text-[clamp(14px,1.15vw,19px)] lg:font-normal lg:text-[#536174]"
                            >
                                Because the best trips start with
                                <br className="hidden sm:block" />
                                <span className="font-bold text-white lg:font-medium lg:text-[#10213F]">
                                    {" "}knowing the traveler.
                                </span>
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                variants={wordVariant}
                                className="mt-[clamp(22px,2.5vw,36px)] flex justify-center lg:justify-start"
                            >
                                <button
                                    onClick={goToItinerary}
                                    className="group inline-flex items-center gap-3 rounded-full bg-[#0E40C7] px-[clamp(22px,2vw,32px)] py-[clamp(12px,1vw,16px)] text-[clamp(14px,1vw,18px)] font-bold text-white shadow-lg shadow-[#000000]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0E40C7]/30 active:translate-y-0"
                                >
                                    <span>Plan My Journey</span>
                                    <ArrowRight className="h-[clamp(17px,1.3vw,21px)] w-[clamp(17px,1.3vw,21px)] transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* EXPLORE MORE */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.7, duration: 0.6 }}
                            onClick={scrollToSection}
                            className="mt-7 hidden w-fit cursor-pointer text-center lg:block"
                        >
                            <div className="flex w-fit flex-col items-center gap-1">
                                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0E40C7]/70">
                                    Explore More
                                </span>

                                <motion.div
                                    animate={{ y: [0, 6, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ChevronDown size={24} strokeWidth={1.5} className="text-[#0E40C7]" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <AuthRoleDialog open={authOpen} onOpenChange={setAuthOpen} />
        </section>
    )
}