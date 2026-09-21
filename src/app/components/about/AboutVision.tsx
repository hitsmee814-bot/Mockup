"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

export default function AboutVision() {
    return (
        <section className="py-0 text-[#1B120B] sm:py-0 lg:py-0">
            <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
                    <motion.div variants={fadeUp} className="mt-0 sm:mt-8 sm:pt-0">
                        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                            <p className="max-w-2xl text-base leading-7 text-[#1B120B]/65 sm:text-lg sm:leading-8">
                                If that sounds like a company you&apos;d want to travel with, build with, or design with — we&apos;d like to hear from you.
                            </p>

                            <button className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold text-[#0E40C7]">
                                <span>Come build with us</span>

                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0E40C7]/20 transition-all duration-300 group-hover:bg-[#0E40C7] group-hover:text-white">
                                    <ArrowUpRight size={17} strokeWidth={1.7} />
                                </span>
                            </button>
                        </div>
                    </motion.div>
                {/* Section Intro */}
                {/* <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 max-w-3xl sm:mb-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0E40C7] sm:text-base">
                        What we&apos;re building toward
                    </p>

                    <div className="mt-3 h-[2px] w-14 bg-[#FBAB18]" />
                </motion.div> */}

                {/* Main Statement */}
                {/* <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-6xl">
                    <motion.h2 variants={fadeUp} className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-[4.1rem]">
                        The travel industry spent a decade
                        <span className="text-[#FBAB18]"> solving the wrong problem.</span>
                    </motion.h2>

                    <motion.p variants={fadeUp} className="mt-7 max-w-3xl text-base leading-7 text-[#1B120B]/70 sm:mt-8 sm:text-lg sm:leading-8">
                        Faster booking, sharper comparison, better prices. It worked, until the traveller got more efficient than the platform and something human got lost along the way.
                    </motion.p>
                </motion.div> */}

                {/* Divider */}
                <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="my-5 h-px origin-left bg-[#1B120B]/10 sm:my-5" />

                {/* The Next Chapter */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-5xl">
                    {/* <motion.div variants={fadeUp} className="mb-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FBAB18] sm:text-base">
                            The next chapter
                        </p>

                        <div className="mt-3 h-[2px] w-14 bg-[#FBAB18]" />
                    </motion.div>

                    <motion.p variants={fadeUp} className="max-w-5xl text-3xl font-medium leading-[1.22] tracking-[-0.035em] text-[#1B120B] sm:text-4xl lg:text-5xl">
                        We&apos;re building toward an industry that measures success differently:
                        <span className="text-[#0E40C7]"> not in transactions completed,</span>{" "}
                        but in people who come home feeling something real happened.
                    </motion.p> */}

                    {/* CTA */}
                </motion.div>


            </div>
        </section>
    )
}