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

export default function FounderNote() {
    return (
        <section className="bg-white py-18 text-[#1B120B] sm:py-18 lg:py-18">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

                <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

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
                        className="max-w-3xl"
                    >

                        {/* Label */}
                        {/* Founder Intro */}
                        <motion.div
                            variants={fadeUp}
                            className="relative mb-10"
                        >
                            <span
                                className="
                                    absolute -left-3 -top-10
                                    font-serif text-[100px]
                                    leading-none
                                    text-[#0E40C7]/10
                                    sm:-left-5 sm:-top-14
                                    sm:text-[130px]
                                "
                            >
                                “
                            </span>

                            <p
                                className="
                                    relative
                                    text-sm font-semibold
                                    uppercase tracking-[0.18em]
                                    text-[#0E40C7]
                                    sm:text-base
                                "
                            >
                                A note from our founder
                            </p>

                            <div className="mt-5 h-[2px] w-20 bg-[#FBAB18]" />
                        </motion.div>
                        {/* Heading */}
                        <motion.h2
                            variants={fadeUp}
                            className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1B120B] sm:text-5xl lg:text-[58px]"
                        >
                            A belief in technology
                            <br />
                            <span className="text-[#0E40C7]">
                                that serves people.
                            </span>
                        </motion.h2>

                        {/* Story */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-10 space-y-6 text-base leading-[1.85] text-[#1B120B]/70 sm:text-lg"
                        >
                            <p>
                                I spent twenty-five years building technology
                                inside large organisations — Ericsson, IBM,
                                Wipro, then a spell leading digital
                                transformation across Europe. It taught me how
                                complex systems work, and just as often, why
                                they fail the people they&apos;re meant to serve.
                            </p>

                            <p>
                                Travel was where I felt that failure most. A
                                decade of the industry optimising search and
                                price had quietly optimised away the traveller.
                                You could book a trip in minutes and still
                                understand nothing about where you were going.
                            </p>
                        </motion.div>

                        {/* Highlight */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-10 border-l-2 border-[#0E40C7] pl-6"
                        >
                            <p className="text-xl font-medium leading-[1.4] tracking-tight text-[#1B120B] sm:text-2xl">
                                You could book a trip in minutes and still
                                understand nothing about where you were going.
                            </p>
                        </motion.div>

                        {/* Closing paragraph */}
                        <motion.p
                            variants={fadeUp}
                            className="mt-10 text-base leading-[1.85] text-[#1B120B]/70 sm:text-lg"
                        >
                            So in 2023 I came home to Kolkata to build something
                            else: a small team that would rather do the work
                            well than do it at volume and Ascendus, built to
                            make that depth scale without ever becoming the
                            thing you notice.
                        </motion.p>

                        {/* Signature */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-10"
                        >
                            <div className="mb-4 h-px w-12 bg-[#FBAB18]" />

                            <p className="text-base font-semibold text-[#1B120B]">
                                — Sudip Pal
                            </p>

                            <p className="mt-1 text-sm text-[#1B120B]/45">
                                Founder, Bonhomiee
                            </p>
                        </motion.div>

                    </motion.div>

                    {/* Founder Image */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 30,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative h-[520px] overflow-hidden rounded-[2rem] sm:h-[620px]"
                    >
                        <img
                            src="/images/founder.jpg"
                            alt="Sudip Pal, Founder of Bonhomiee"
                            className="h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.025]"
                        />

                        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/45 to-transparent" />

                        <div className="absolute bottom-7 left-7 flex items-center gap-3 text-sm font-medium text-white/90 sm:bottom-8 sm:left-8">
                            <span className="h-px w-8 bg-white/70" />
                            Sudip Pal
                        </div>

                        <div className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#0E40C7] backdrop-blur-sm sm:right-8 sm:top-8">
                            <ArrowUpRight
                                size={17}
                                strokeWidth={1.6}
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}