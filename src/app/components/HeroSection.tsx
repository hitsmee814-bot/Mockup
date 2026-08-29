"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ChevronDown, ArrowRight, Plane, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import HeaderNav from "./HeaderNav"
import AuthRoleDialog from "./AuthDialog"

const repoPath = process.env.NODE_ENV === "production" ? "/Mockup" : ""

const wordVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

export default function HeroSection() {
    const router = useRouter()

    const [authOpen, setAuthOpen] = useState(false)
    const [index, setIndex] = useState(0)

    const words = ["Knows", "Understands", "Remembers"]

    // Change animated word every 3 seconds
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
        <section className="relative w-full min-h-[100svh] overflow-hidden bg-none">

            <HeaderNav
                enableScrollBg
                position="fixed"
                onAuthOpen={() => router.push("/auth")}
            />

            <div className="flex min-h-[100svh] w-full flex-col lg:flex-row">

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
        relative
        w-full
        lg:w-1/2
        min-h-[50svh]
        lg:min-h-[100svh]
        overflow-hidden
    "
                >
                    <img
                        src={`${repoPath}/images/Tourism-Photoroom.png`}
                        alt="Travel and tourism illustration"
                        className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
        "
                    />
                </motion.div>

                <div
                    className="
                        relative
                        flex
                        w-full
                        lg:w-1/2
                        min-h-[50svh]
                        lg:min-h-[100svh]
                        items-center
                        justify-center
                        overflow-hidden
                        bg-none
                        px-6
                        py-20
                        sm:px-10
                        lg:px-16
                        xl:px-24
                    "
                >

                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
                            pointer-events-none
                            absolute
                            -right-40
                            -top-40
                            h-[500px]
                            w-[500px]
                            rounded-full
                            border
                            border-[#479EA8]/10
                        "
                    />

                    <div className="relative z-10 w-full max-w-2xl">

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-5 flex items-center justify-center gap-2"
                        >
                            <span className="h-px w-8 bg-[#479EA8]" />

                            <span
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.25em]
                                    text-[#479EA8]
                                "
                            >
                                Your journey, your way
                            </span>

                            <span className="h-px w-8 bg-[#479EA8]" />
                        </motion.div>


                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.12,
                                    },
                                },
                            }}
                            className="text-center"
                        >

                            <motion.h1
                                variants={wordVariant}
                                className="
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-[#10213F]
                                    sm:text-5xl
                                    md:text-6xl
                                    xl:text-7xl
                                "
                            >
                                Travel That
                            </motion.h1>


                            {/* Animated word */}
                            <div
                                className="
                                    relative
                                    mx-auto
                                    my-3
                                    flex
                                    h-[65px]
                                    w-full
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    sm:h-[80px]
                                    md:h-[95px]
                                    xl:h-[105px]
                                "
                            >
                                <AnimatePresence mode="wait">

                                    <motion.span
                                        key={words[index]}
                                        initial={{
                                            y: 45,
                                            opacity: 0,
                                            filter: "blur(10px)",
                                        }}
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                            filter: "blur(0px)",
                                        }}
                                        exit={{
                                            y: -45,
                                            opacity: 0,
                                            filter: "blur(10px)",
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="
                                            absolute
                                            text-4xl
                                            font-bold
                                            text-[#0E40C7]
                                            sm:text-5xl
                                            md:text-6xl
                                            xl:text-7xl
                                        "
                                    >
                                        {words[index]}
                                    </motion.span>

                                </AnimatePresence>
                            </div>


                            <motion.h1
                                variants={wordVariant}
                                className="
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-[#10213F]
                                    sm:text-5xl
                                    md:text-6xl
                                    xl:text-7xl
                                "
                            >
                                You
                            </motion.h1>


                            <motion.p
                                variants={wordVariant}
                                className="
                                    mx-auto
                                    mt-7
                                    max-w-lg
                                    text-base
                                    leading-relaxed
                                    text-[#536174]
                                    sm:text-lg
                                    md:text-xl
                                "
                            >
                                Because the best trips start with
                                <br className="hidden sm:block" />
                                <span className="font-medium text-[#10213F]">
                                    knowing the traveler.
                                </span>
                            </motion.p>


                            <motion.div
                                variants={wordVariant}
                                className="mt-9 flex justify-center"
                            >
                                <button
                                    onClick={goToItinerary}
                                    className="
                                        group
                                        inline-flex
                                        items-center
                                        gap-3
                                        rounded-full
                                        bg-[#0E40C7]
                                        px-7
                                        py-4
                                        text-base
                                        font-semibold
                                        text-white
                                        shadow-lg
                                        shadow-[#0E40C7]/20
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:shadow-xl
                                        hover:shadow-[#0E40C7]/30
                                        active:translate-y-0
                                        sm:px-8
                                        sm:py-4
                                        sm:text-lg
                                    "
                                >
                                    <span>
                                        Plan My Journey
                                    </span>

                                    <ArrowRight
                                        className="
                                            h-5
                                            w-5
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                    />
                                </button>
                            </motion.div>

                        </motion.div>


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 1.2,
                                duration: 0.7,
                            }}
                            className="
                                mx-auto
                                mt-12
                                flex
                                max-w-md
                                items-center
                                justify-center
                                gap-6
                                border-t
                                border-[#10213F]/10
                                pt-6
                            "
                        >
                            <div className="text-center">
                                <p className="text-sm font-semibold text-[#10213F]">
                                    Personalized
                                </p>
                                <p className="mt-1 text-xs text-[#6B7280]">
                                    Just for you
                                </p>
                            </div>

                            <div className="h-8 w-px bg-[#10213F]/10" />

                            <div className="text-center">
                                <p className="text-sm font-semibold text-[#10213F]">
                                    Smarter
                                </p>
                                <p className="mt-1 text-xs text-[#6B7280]">
                                    Every journey
                                </p>
                            </div>

                            <div className="h-8 w-px bg-[#10213F]/10" />

                            <div className="text-center">
                                <p className="text-sm font-semibold text-[#10213F]">
                                    Made for you
                                </p>
                                <p className="mt-1 text-xs text-[#6B7280]">
                                    Not everyone
                                </p>
                            </div>
                        </motion.div>

                    </div>


                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7 }}
                        onClick={scrollToSection}
                        className="
                            absolute
                            bottom-6
                            left-1/2
                            -translate-x-1/2
                            cursor-pointer
                            text-center
                            sm:bottom-8
                        "
                    >
                        <div className="flex flex-col items-center gap-1">

                            <span
                                className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.25em]
                                    text-[#0E40C7]/70
                                "
                            >
                                Explore More
                            </span>

                            <motion.div
                                animate={{
                                    y: [0, 6, 0],
                                }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <ChevronDown
                                    size={24}
                                    strokeWidth={1.5}
                                    className="text-[#0E40C7]"
                                />
                            </motion.div>

                        </div>
                    </motion.div>

                </div>
            </div>


            <AuthRoleDialog
                open={authOpen}
                onOpenChange={setAuthOpen}
            />

        </section>
    )
}