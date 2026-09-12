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

export default function AboutVision() {
    return (
        <section className="bg-white py-18 text-[#1B120B] sm:py-18 lg:py-18">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

                {/* Section Intro */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mb-14"
                >
                    <p className="
                        text-sm font-semibold
                        uppercase tracking-[0.18em]
                        text-[#0E40C7]
                        sm:text-base
                    ">
                        What we&apos;re building toward
                    </p>

                    <div className="mt-5 h-[2px] w-20 bg-[#FBAB18]" />
                </motion.div>

                {/* Main Statement */}
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
                    className="max-w-6xl"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="
                            text-4xl font-semibold
                            leading-[1.02]
                            tracking-[-0.05em]
                            sm:text-5xl
                            lg:text-[68px]
                        "
                    >
                        The travel industry spent a decade
                        <span className="text-[#0E40C7]">
                            {" "}solving the wrong problem.
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="
                            mt-10 max-w-3xl
                            text-lg leading-[1.8]
                            text-[#1B120B]/70
                            sm:text-xl
                        "
                    >
                        Faster booking, sharper comparison, better prices. It
                        worked, until the traveller got more efficient than the
                        platform and something human got lost along the way.
                    </motion.p>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        my-6 h-px origin-left
                        bg-[#1B120B]/10
                        sm:my-6
                    "
                />

 {/* What We're Building */}
<div className="max-w-5xl">

    {/* Section Label */}
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-4"
    >
        <p className="
            text-sm font-semibold
            uppercase tracking-[0.18em]
            text-[#FBAB18]
            sm:text-base
        ">
            The next chapter
        </p>

        <div className="mt-5 h-[2px] w-20 bg-[#FBAB18]" />
    </motion.div>

    {/* Main Statement */}
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
    >
        <motion.p
            variants={fadeUp}
            className="
                max-w-5xl
                text-3xl font-medium
                leading-[1.25]
                tracking-[-0.035em]
                text-[#1B120B]
                sm:text-4xl
                lg:text-5xl
            "
        >
            We&apos;re building toward an industry that
            measures success differently:
            <span className="text-[#0E40C7]">
                {" "}not in transactions completed,
            </span>{" "}
            but in people who come home feeling something real
            happened.
        </motion.p>

        {/* CTA */}
        <motion.div
            variants={fadeUp}
            className="
                mt-4
                border-t border-[#1B120B]/10
                pt-8
                sm:mt-4
                sm:pt-4
            "
        >
            <div className="
                flex flex-col gap-7
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">
                <p className="
                    max-w-2xl
                    text-base leading-[1.8]
                    text-[#1B120B]/65
                    sm:text-lg
                ">
                    If that sounds like a company you&apos;d want
                    to travel with, build with, or design with —
                    we&apos;d like to hear from you.
                </p>

                <button
                    className="
                        group inline-flex
                        shrink-0 items-center
                        gap-3
                        text-sm font-semibold
                        text-[#0E40C7]
                    "
                >
                    <span>Come build with us</span>

                    <span className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        border border-[#0E40C7]/20
                        transition-all duration-300
                        group-hover:bg-[#0E40C7]
                        group-hover:text-white
                    ">
                        <ArrowUpRight
                            size={17}
                            strokeWidth={1.7}
                        />
                    </span>
                </button>
            </div>
        </motion.div>
    </motion.div>

</div>
                {/* Final Closing */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        mt-20
                        border-t border-[#1B120B]/10
                        pt-10
                        sm:mt-24
                    "
                >
                    <p className="
                        max-w-5xl
                        text-3xl font-semibold
                        leading-[1.15]
                        tracking-[-0.045em]
                        sm:text-4xl
                        lg:text-5xl
                    ">
                        Because the future of travel isn&apos;t about
                        <span className="text-[#0E40C7]">
                            {" "}going faster.
                        </span>
                        <br />
                        It&apos;s about
                        <span className="text-[#0E40C7]">
                            {" "}feeling more.
                        </span>
                    </p>
                </motion.div>

            </div>
        </section>
    )
}