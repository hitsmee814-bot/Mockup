"use client"

import { motion, type Variants } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import logoPrimary from "../../assets/images/final logo Bonhomiee.png"

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

export default function AboutHero() {
    const router = useRouter()
    const [showHeader, setShowHeader] = useState(true)

    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY <= 20) {
                setShowHeader(true)
            } else if (currentScrollY > lastScrollY + 2) {
                setShowHeader(false)
            } else if (currentScrollY < lastScrollY - 2) {
                setShowHeader(true)
            }

            lastScrollY = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <section className="relative overflow-hidden bg-white text-[#1B120B]">

            {/* Smart Header */}
            <motion.header
                animate={{ y: showHeader ? 0 : "-100%" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-50"
            >
                <div className="mx-auto flex max-w-7xl items-center px-5 py-5 sm:px-10 sm:py-6 lg:px-16 lg:py-7">
                    <motion.button
                        type="button"
                        onClick={() => router.back()}
                        aria-label="Go back"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="cursor-pointer"
                    >
                        <Image
                            src={logoPrimary}
                            alt="Bonhomiee"
                            width={300}
                            height={90}
                            className="h-auto w-[150px] object-contain sm:w-[175px] lg:w-[190px]"
                            priority
                        />
                    </motion.button>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
                <div className="grid items-start gap-8 pb-14 sm:gap-10 sm:pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">

                    {/* Left Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="max-w-2xl"
                    >
                        {/* Label */}
                        <div className="mb-6 inline-flex flex-col items-start">
                            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0E40C7] sm:text-base">
                                About Bonhomiee
                            </span>

                            <span className="mt-2 h-[2px] w-12 rounded-full bg-[#FBAB18]" />
                        </div>

                        {/* Heading */}
<h1 className="max-w-lg text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.5rem]">
                                We begin with
                            <br />
                            a{" "}
                            <span className="text-[#FBAB18]">
                                conversation.
                            </span>
                        </h1>

                        {/* Intro */}
                        <div className="mt-7 max-w-xl space-y-4 text-base leading-7 text-[#1B120B]/70 sm:mt-8 sm:text-lg sm:leading-8">
                            <p>
                                Most travel companies begin with a destination.
                                <span className="font-semibold text-[#1B120B]">
                                    {" "}We don't.
                                </span>
                            </p>

                            <p>
                                Every trip carries a reason before it carries a
                                route — a celebration, a pause, a reunion, a
                                long-promised adventure.
                            </p>

                            <p>
                                So our first question is never{" "}
                                <span className="font-semibold text-[#1B120B]">
                                    "where."
                                </span>{" "}
                                It’s{" "}
                                <span className="font-semibold text-[#0E40C7]">
                                    "tell us about this trip."
                                </span>
                            </p>
                        </div>

                        {/* Closing Statement */}
                        <div className="mt-7 border-l-2 border-[#0E40C7] pl-5 sm:mt-8 sm:pl-6">
                            <p className="max-w-xl text-lg font-medium leading-8 text-[#1B120B] sm:text-xl sm:leading-9">
                                “From there, we build the journey around who you
                                are and what you need this one to become.”
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Image - Desktop Only */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.15,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative hidden h-[64vh] min-h-[380px] overflow-hidden rounded-[1.75rem] lg:block"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
                            alt="A peaceful travel landscape"
                            fill
                            sizes="42vw"
                            className="object-cover transition-transform duration-1000 hover:scale-[1.025]"
                            priority
                        />

                        {/* Bottom Gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/35 to-transparent" />

                        {/* Caption */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-sm font-medium tracking-wide text-white/90 sm:text-base">
                                Every journey starts with understanding.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}