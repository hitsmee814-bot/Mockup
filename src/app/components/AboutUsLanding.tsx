"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const values = [
    {
        number: "01",
        title: "Tell us about this trip",
        text: "Our first question is never “where would you like to go?” It's what this journey is for. Everything follows from the answer.",
    },
    {
        number: "02",
        title: "One answer, not a menu",
        text: "We come back with a single considered recommendation and the reasoning behind it. Choosing between three itineraries doesn't save anyone time.",
    },
    {
        number: "03",
        title: "Someone who answers",
        text: "Far from home, when something needs fixing, you call us. We stay on it until it's done.",
    },
]

export function AboutUs() {
    const router = useRouter()

    return (
        <section id="aboutus" className="relative overflow-hidden bg-none py-16 sm:py-20 lg:pt-0">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#479EA8]/[0.05] blur-3xl" />
                <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-[#0E40C7]/[0.025] blur-3xl" />
                <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-[#FBAB18]/[0.04] blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
                {/* Main Heading */}
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 mx-auto"
                    >
                        <div className="relative mx-auto w-fit">
                            {/* Heading */}
                            <h2 className="relative z-10 text-4xl font-bold leading-[1.08] tracking-tight text-[#10213F] sm:text-5xl md:text-6xl">
                                We Don’t Plan.
                                <span className="text-[#FBAB18]">{" "}We Listen.</span>
                            </h2>
                        </div>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#536174] sm:text-lg md:text-xl"
                    >
                        End-to-end journeys built entirely around you.
                        <br className="hidden sm:block" />
                        <span className="text-[#10213F]">{" "}Not templates. Not packages.</span>{" "}
                        Real, considered experiences that turn a good trip into
                        an unforgettable one.
                    </motion.p>
                </div>

                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mt-12 flex max-w-5xl items-center gap-3 sm:mt-14 sm:gap-4"
                >
                    <div className="h-px flex-1 bg-[#10213F]/10" />

                    <span className="text-[9px] font-semibold tracking-[0.2em] text-[#6B7280] sm:text-xs sm:tracking-[0.25em]">
                        HOW WE CREATE YOUR JOURNEY
                    </span>

                    <div className="h-px flex-1 bg-[#10213F]/10" />
                </motion.div>

                {/* Supporting Values */}
                <div className="mx-auto mt-5 max-w-5xl sm:mt-6">
                    <div className="grid grid-cols-2 overflow-hidden rounded-[1.25rem] border border-[#10213F]/10 bg-white/50 backdrop-blur-sm md:grid-cols-3 md:rounded-[1.75rem]">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.number}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-80px" }}
                                variants={fadeUp}
                                transition={{ delay: index * 0.12 }}
                                className={`group relative px-3 py-4 transition-colors duration-300 hover:bg-white/70 sm:px-5 sm:py-6 md:px-8 md:py-10 ${
                                    index === 0
                                        ? "col-span-2 md:col-span-1"
                                        : index === 1
                                          ? "border-t border-[#10213F]/10 md:border-l md:border-t-0"
                                          : "border-l border-t border-[#10213F]/10 md:border-t-0"
                                }`}
                            >
                                {/* Number */}
                                <div className="flex items-center">
                                    <span className="text-[10px] font-semibold tracking-[0.16em] text-[#0E40C7] sm:text-xs sm:tracking-[0.2em]">
                                        {value.number}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="mt-3 text-lg font-semibold leading-tight tracking-tight text-[#10213F] sm:mt-5 sm:text-xl md:mt-8 md:text-2xl">
                                    {value.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-2 text-[11px] leading-[1.45] text-[#536174] sm:mt-3 sm:text-sm sm:leading-6 md:mt-4 md:text-base md:leading-7">
                                    {value.text}
                                </p>

                                {/* Accent Line */}
                                <div className="mt-4 h-px w-8 bg-[#FBAB18] transition-all duration-300 group-hover:w-14 sm:mt-6 sm:w-10 md:mt-8 md:w-12 md:group-hover:w-20" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="mt-10 flex flex-col items-center justify-center gap-2 sm:mt-12 sm:gap-3"
                >
                    <button
                        onClick={() => router.push("/itinerary/ai")}
                        className="group inline-flex items-center gap-2.5 rounded-full bg-[#0E40C7] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0E40C7]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0E40C7]/30 active:translate-y-0 sm:gap-3 sm:px-8 sm:py-4 sm:text-lg"
                    >
                        <span>Tailor My Trip</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
                    </button>

                    <span className="text-[10px] font-medium tracking-wide text-[#6B7280] sm:text-xs">
                        Powered by Smart AI
                    </span>
                </motion.div>

                {/* Closing Thought */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mx-auto mt-10 max-w-3xl pt-2 text-center sm:mt-6 sm:pt-5"
                >
                    <p className="text-base leading-relaxed text-[#536174] sm:text-xl">
                        Because the best journeys aren't the ones with the most
                        <span className="text-[#10213F]"> things.</span>
                    </p>

                    <p className="mt-1.5 text-base font-medium leading-relaxed text-[#0E40C7] sm:mt-2 sm:text-xl">
                        They're the ones that feel like they were made for you.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}