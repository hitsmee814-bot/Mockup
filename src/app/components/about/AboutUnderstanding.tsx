"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
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
        <section className="bg-white py-18 text-[#1B120B] sm:py-18 lg:py-18">

            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

                <div className="
                    grid items-center gap-14
                    lg:grid-cols-[0.9fr_1.1fr]
                    lg:gap-20
                ">

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="
                            relative h-[520px]
                            overflow-hidden rounded-[2rem]
                            sm:h-[620px]
                        "
                    >
                        <img
                            src="https://images.pexels.com/photos/14018097/pexels-photo-14018097.jpeg"
                            alt="Traveller taking a quiet moment in the mountains"
                            className="
                                h-full w-full object-cover
                                transition-transform duration-1000
                                hover:scale-[1.025]
                            "
                        />

                        <div className="
                            absolute inset-x-0 bottom-0 h-32
                            bg-gradient-to-t from-black/30 to-transparent
                        " />

                        <div className="
                            absolute bottom-7 left-7
                            flex items-center gap-3
                            text-sm font-medium text-white/90
                            sm:bottom-8 sm:left-8
                        ">
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
                        {/* Section Intro */}
                        <motion.div
                            variants={fadeUp}
                            className="relative mb-10"
                        >
                            <p
                                className="
                                    relative
                                    text-sm font-semibold
                                    uppercase tracking-[0.18em]
                                    text-[#0E40C7]
                                    sm:text-base
                                "
                            >
                                The Bonhomiee difference
                            </p>

                            <div className="mt-5 h-[2px] w-20 bg-[#FBAB18]" />
                        </motion.div>


                        {/* Heading */}
                        <motion.h2
                            variants={fadeUp}
                            className="
                                text-4xl font-semibold
                                leading-[1.02]
                                tracking-[-0.045em]
                                text-[#1B120B]
                                sm:text-5xl
                                lg:text-[58px]
                            "
                        >
                            We&apos;re not selling a place.
                            <br />

                            <span className="text-[#0E40C7]">
                                We&apos;re trying to understand a person.
                            </span>
                        </motion.h2>


                        {/* Main Copy */}
                        <motion.div
                            variants={fadeUp}
                            className="
                                mt-10 space-y-6
                                text-base leading-[1.85]
                                text-[#1B120B]/70
                                sm:text-lg
                            "
                        >
                            <p>
                                A booking platform optimises for the fastest path
                                to payment. We optimise for what happens after
                                you&apos;re home — the sense that this trip was
                                made for you, not for someone with your budget
                                and your dates.
                            </p>

                            <p className="font-medium text-[#1B120B]/85">
                                Being understood shouldn&apos;t be a privilege.
                                We think it should be the baseline, for every
                                traveller.
                            </p>
                        </motion.div>


                        {/* Ascendus */}
                        <motion.div
                            variants={fadeUp}
                            className="
                                mt-10 border-l-2
                                border-[#0E40C7]
                                pl-6
                            "
                        >
                            <div className="mb-3 flex items-center gap-2">
                                <span className="
                                    text-sm font-semibold
                                    text-[#0E40C7]
                                ">
                                    Ascendus
                                </span>

                                <ArrowUpRight
                                    size={15}
                                    strokeWidth={1.7}
                                    className="text-[#0E40C7]"
                                />
                            </div>

                            <p className="
                                text-sm leading-[1.8]
                                text-[#1B120B]/60
                                sm:text-base
                            ">
                                Behind the conversation is Ascendus, our
                                intelligence layer quietly doing the work that
                                lets a small team give the attention a large
                                one usually can&apos;t.
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
                    className="
                        mt-12
                        border-t border-[#1B120B]/10
                        pt-10
                        sm:mt-12
                        sm:pt-12
                    "
                >
                    <div className="
                        flex flex-col gap-6
                        sm:flex-row sm:items-end
                        sm:justify-between
                    ">

                        <p className="
                            max-w-3xl
                            text-2xl font-medium
                            leading-[1.35]
                            tracking-[-0.025em]
                            text-[#1B120B]
                            sm:text-3xl
                        ">
                            Because the best journeys don&apos;t just take you
                            somewhere.
                            <span className="text-[#0E40C7]">
                                {" "}They feel like they were meant for you.
                            </span>
                        </p>

                    </div>
                </motion.div>

            </div>

        </section>
    )
}