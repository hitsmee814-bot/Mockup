"use client"

import { motion } from "framer-motion"

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

export default function FounderNote() {
    return (
        <section className="relative overflow-hidden bg-[#F6F8F7] py-24 sm:py-32 lg:py-40">

            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

                <div
                    className="
                        grid
                        grid-cols-1
                        items-start
                        gap-14
                        lg:grid-cols-[0.7fr_1.3fr]
                        lg:gap-24
                    "
                >
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-100px",
                        }}
                        variants={fadeUp}
                        className="lg:sticky lg:top-24"
                    >
                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.25em]
                                text-[#0E40C7]
                            "
                        >
                            A note from the founder
                        </p>

                        <div className="mt-8 hidden h-px w-20 bg-black/15 lg:block" />

                        <p
                            className="
                                mt-6
                                max-w-xs
                                text-sm
                                leading-relaxed
                                text-black/40
                            "
                        >
                            Why I believe travel needs to
                            become more human.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-100px",
                        }}
                        variants={fadeUp}
                        className="max-w-3xl"
                    >

                        {/* Opening statement */}

                        <h2
                            className="
                                max-w-3xl
                                text-4xl
                                font-medium
                                leading-[1.05]
                                tracking-[-0.04em]
                                text-black
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            The age of being processed is ending.
                            <br />
                            <span className="text-black/35">
                                The age of being understood is beginning.
                            </span>
                        </h2>


                        {/* Founder portrait */}

                        <div className="mt-12 sm:mt-16">
                            <div
                                className="
                                    relative
                                    h-[280px]
                                    w-full
                                    overflow-hidden
                                    rounded-[1.75rem]
                                    bg-black/5
                                    sm:h-[360px]
                                    lg:hidden
                                "
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85"
                                    alt="Founder"
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />
                            </div>
                        </div>


                        <div
                            className="
                                mt-10
                                space-y-7
                                text-base
                                leading-[1.9]
                                text-black/60
                                sm:mt-14
                                sm:text-lg
                            "
                        >

                            <p>
                                I spent twenty-five years building and
                                running technology inside large
                                organisations — nearly two decades with
                                Ericsson, IBM and Wipro in India, then five
                                years in Europe leading digital
                                transformation across a set of global
                                companies, with a year at IIM Lucknow
                                somewhere in between.
                            </p>

                            <p>
                                The work taught me how complex systems are
                                actually made to perform — and, just as
                                often, why they fail the people they&apos;re
                                meant to serve.
                            </p>

                            <p>
                                Travel was where I felt that failure most
                                personally.
                            </p>

                            <p>
                                The industry had spent a decade optimising
                                the transaction — faster search, sharper
                                pricing, endless comparison — and quietly
                                optimised away the traveller.
                            </p>

                            <p>
                                More options produced less certainty.
                                More information, more fatigue. You could
                                now book a trip in minutes and still arrive
                                having understood nothing about where you
                                were going.
                            </p>

                        </div>

                        <div
                            className="
                                my-12
                                border-l-2
                                border-[#0E40C7]
                                pl-6
                                sm:my-16
                                sm:pl-8
                            "
                        >
                            <p
                                className="
                                    text-2xl
                                    font-medium
                                    leading-[1.25]
                                    tracking-tight
                                    text-black
                                    sm:text-3xl
                                    lg:text-4xl
                                "
                            >
                                The efficiency was real;
                                the experience had thinned.
                            </p>
                        </div>

                        <div
                            className="
                                space-y-7
                                text-base
                                leading-[1.9]
                                text-black/60
                                sm:text-lg
                            "
                        >

                            <p>
                                What I kept returning to was a simple
                                conviction: technology should carry the
                                load a journey doesn&apos;t need a human
                                for — so that human judgment can be spent
                                where it actually matters, on understanding
                                a person and designing for them.
                            </p>

                            <p>
                                That belief is the whole architecture of
                                Bonhomiee.
                            </p>

                            <p>
                                In late 2023 I left London and came home to
                                Kolkata to build it: a small team that would
                                rather do the work well than do it at volume,
                                and an intelligence layer, Ascendus, built
                                to make that depth scale without ever
                                becoming the thing you notice.
                            </p>

                        </div>


                        <div className="mt-12 sm:mt-16">

                            <div
                                className="
                                    mb-5
                                    h-px
                                    w-16
                                    bg-black/15
                                "
                            />

                            <p
                                className="
                                    text-lg
                                    font-medium
                                    tracking-tight
                                    text-black
                                "
                            >
                                — Sudip Pal
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-black/40
                                "
                            >
                                Founder, Bonhomiee
                            </p>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>
    )
}