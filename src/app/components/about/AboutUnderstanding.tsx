"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

export default function AboutUnderstanding() {
    return (
        <section className="bg-white py-14 text-[#1B120B] sm:py-16 lg:py-18">

            <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">

                {/* Main Content */}
                <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">

                    {/* Image - Desktop Only */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative hidden h-[62vh] min-h-[420px] overflow-hidden rounded-[1.75rem] lg:block"
                    >
                        <img
                            src="https://images.pexels.com/photos/14018097/pexels-photo-14018097.jpeg"
                            alt="Traveller taking a quiet moment in the mountains"
                            className="h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.025]"
                        />

                        {/* Gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />

                        {/* Caption */}
                        <div className="absolute bottom-6 left-6 text-sm font-medium text-white/90 sm:bottom-7 sm:left-7">
                            Made for you
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.12,
                                },
                            },
                        }}
                        className="max-w-2xl"
                    >

                        {/* Label */}
                        <motion.div
                            variants={fadeUp}
                            className="mb-6"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0E40C7] sm:text-base">
                                The difference
                            </p>

                            <div className="mt-3 h-[2px] w-14 bg-[#FBAB18]" />
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            variants={fadeUp}
className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#1B120B] sm:text-[2.75rem] lg:text-[3.5rem]"                        >
                            We&apos;re not selling a place.
                            <br />
                            <span className="text-[#FBAB18]">
                                We&apos;re trying to understand a person.
                            </span>
                        </motion.h2>

                        {/* Main Copy */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-7 max-w-xl space-y-4 text-base leading-7 text-[#1B120B]/70 sm:mt-8 sm:text-lg sm:leading-8"
                        >
                            <p>
                                A booking platform optimises for the fastest path
                                to payment. We optimise for what happens after
                                you&apos;re home — the sense that this trip was
                                made for you, not for someone with your budget
                                and your dates.
                            </p>

                            <p className="font-medium text-[#1B120B]/70">
                                Being understood shouldn&apos;t be a privilege.
                                We think it should be the baseline, for every
                                traveller.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Closing Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-10 border-t border-[#1B120B]/10 pt-8 sm:mt-12 sm:pt-10"
                >
                    <p className="max-w-3xl text-2xl font-medium leading-[1.3] tracking-[-0.025em] text-[#1B120B] sm:text-3xl">
                        Because the best journeys don&apos;t just take you
                        somewhere.
                        <span className="text-[#0E40C7]">
                            {" "}They feel like they were meant for you.
                        </span>
                    </p>
                </motion.div>

            </div>
        </section>
    )
}