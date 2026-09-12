"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
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
        title: "Start with you",
        label: "PERSONAL",
        text: "We begin with your interests, your pace, your priorities, and what you want this journey to feel like.",
    },
    {
        number: "02",
        title: "Built around you",
        label: "THOUGHTFUL",
        text: "Every recommendation is shaped around you. No fixed itineraries, no one-size-fits-all packages.",
    },
    {
        number: "03",
        title: "Technology, quietly",
        label: "INTELLIGENT",
        text: "Smart technology takes care of the complexity behind the scenes, while you stay focused on the experience.",
    },
]

const highlights = [
    {
        title: "Personal",
        text: "Made around you",
    },
    {
        title: "Thoughtful",
        text: "Every detail matters",
    },
    {
        title: "Intelligent",
        text: "Technology that helps",
    },
]

export function AboutUs() {
    const router = useRouter()

    return (
        <section
            id="aboutus"
            className="relative overflow-hidden bg-none py-16 sm:py-20 lg:py-24"
        >
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#479EA8]/[0.05] blur-3xl" />

                <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-[#0E40C7]/[0.025] blur-3xl" />

                <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-[#FBAB18]/[0.04] blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
                {/* Badge */}
                {/* <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                    className="mb-7 flex justify-center"
                >
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        It Starts with a Conversation
                    </div>
                </motion.div> */}

                {/* Main Heading */}
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative z-10 mx-auto"
                    >
                        <div className="relative mx-auto w-fit">
                            {/* Background Word */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[64px] font-black uppercase tracking-[0.08em] text-muted/40 sm:text-[105px] lg:text-[150px]"
                            >
                                CHOOSE US
                            </span>

                            {/* Heading */}
                            <h2 className="relative z-10 text-4xl font-bold leading-[1.08] tracking-tight text-[#10213F] sm:text-5xl md:text-6xl">
                                We Don’t Plan.
                                {/* <br /> */}
                                <span className="text-[#10213F]">
                                    We Listen.
                                </span>
                            </h2>
                        </div>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#536174] sm:text-lg md:text-xl"
                    >
                        End-to-end journeys built entirely around you.
                        <br className="hidden sm:block" />
                        <span className="text-[#10213F]">
                            {" "}
                            Not templates. Not packages.
                        </span>{" "}
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
                    className="mx-auto mt-14 flex max-w-5xl items-center gap-4"
                >
                    <div className="h-px flex-1 bg-[#10213F]/10" />

                    <span className="text-[10px] font-semibold tracking-[0.25em] text-[#6B7280] sm:text-xs">
                        HOW WE CREATE YOUR JOURNEY
                    </span>

                    <div className="h-px flex-1 bg-[#10213F]/10" />
                </motion.div>

                {/* Supporting Values */}
                <div className="mx-auto mt-6 max-w-5xl">
                    <div className="grid overflow-hidden rounded-[1.75rem] border border-[#10213F]/10 bg-white/50 backdrop-blur-sm md:grid-cols-3">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.number}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true,
                                    margin: "-80px",
                                }}
                                variants={fadeUp}
                                transition={{
                                    delay: index * 0.12,
                                }}
                                className={`group relative px-6 py-8 transition-colors duration-300 hover:bg-white/70 sm:px-8 sm:py-10 ${
                                    index !== 0
                                        ? "border-t border-[#10213F]/10 md:border-l md:border-t-0"
                                        : ""
                                }`}
                            >
                                {/* Number + Label */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold tracking-[0.2em] text-[#0E40C7]">
                                        {value.number}
                                    </span>

                                    <span className="text-[9px] font-semibold tracking-[0.2em] text-[#6B7280] sm:text-[10px]">
                                        {value.label}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[#10213F]">
                                    {value.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-4 text-sm leading-7 text-[#536174] sm:text-base">
                                    {value.text}
                                </p>

                                {/* Accent Line */}
                                <div className="mt-8 h-px w-12 bg-[#FBAB18] transition-all duration-300 group-hover:w-20" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Value Highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                        duration: 0.7,
                        delay: 0.1,
                    }}
                    className="mx-auto mt-10 max-w-4xl"
                >
                    <div className="grid grid-cols-3 divide-x divide-[#10213F]/10">
                        {highlights.map((highlight) => (
                            <div
                                key={highlight.title}
                                className="px-3 text-center sm:px-6"
                            >
                                <p className="text-sm font-semibold text-[#10213F] sm:text-base">
                                    {highlight.title}
                                </p>

                                <p className="mt-1 text-[11px] text-[#6B7280] sm:text-xs">
                                    {highlight.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    variants={fadeUp}
                    className="mt-12 flex flex-col items-center justify-center gap-3"
                >
                    <button
                        onClick={() => router.push("/itinerary/ai")}
                        className="group inline-flex items-center gap-3 rounded-full bg-[#0E40C7] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#0E40C7]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0E40C7]/30 active:translate-y-0 sm:px-8 sm:text-lg"
                    >
                        <span>Tailor My Trip</span>

                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    <span className="text-xs font-medium tracking-wide text-[#6B7280]">
                        Powered by Smart AI
                    </span>
                </motion.div>

                {/* Closing Thought */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                    }}
                    className="mx-auto mt-12 max-w-3xl border-t border-[#10213F]/10 pt-10 text-center"
                >
                    <p className="text-lg leading-relaxed text-[#536174] sm:text-xl">
                        Because the best journeys aren't the ones with the
                        most
                        <span className="text-[#10213F]"> things.</span>
                    </p>

                    <p className="mt-2 text-lg font-medium leading-relaxed text-[#0E40C7] sm:text-xl">
                        They're the ones that feel like they were made for you.
                    </p>
                </motion.div>

                {/* Bottom Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        delay: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mx-auto mt-16 h-px max-w-xs origin-center bg-gradient-to-r from-transparent via-[#0E40C7]/20 to-transparent"
                />
            </div>
        </section>
    )
}