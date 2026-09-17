"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowUpRight, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import mobileFounderImage from "../../assets/images/Team CEO.jpeg"
import desktopFounderImage from "../../assets/images/Sudip Founder Note.jpeg"

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function FounderNote() {
    return (
        <section className="bg-white py-14 text-[#1B120B] sm:py-16 lg:py-18">
            <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
                <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">

                    {/* Content */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-2xl">

                        {/* Label */}
                        <motion.div variants={fadeUp} className="mb-6">
                            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0E40C7] sm:text-base">A note from our founder</span>
                            <div className="mt-3 h-[2px] w-14 bg-[#FBAB18]" />
                        </motion.div>

                        {/* Heading */}
                        <motion.h2 variants={fadeUp} className="text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#1B120B] sm:text-5xl lg:text-[4.1rem]">
                            A belief in technology
                            <br />
                            <span className="text-[#FBAB18]">that serves people.</span>
                        </motion.h2>

                        {/* Story */}
                        <motion.div variants={fadeUp} className="mt-7 max-w-xl space-y-4 text-base leading-7 text-[#1B120B]/70 sm:mt-8 sm:text-lg sm:leading-8">
                            <p>
                                I spent twenty-five years building technology inside large organisations — Wipro, IBM, Ericsson, and finally leading digital transformation across Europe. It taught me how complex systems work, and just as often, why they fail the people they&apos;re meant to serve.
                            </p>

                            <p>
                                Travel was where I felt that failure most. A decade of the industry optimising search and price had quietly optimised away the traveller.
                            </p>
                        </motion.div>

                        {/* Highlight */}
                        <motion.div variants={fadeUp} className="mt-7 border-l-2 border-[#0E40C7] pl-5 sm:mt-8 sm:pl-6">
                            <p className="max-w-xl text-xl font-medium leading-[1.4] tracking-tight text-[#1B120B] sm:text-2xl">
                                You could book a trip in minutes and still understand nothing about where you were going.
                            </p>
                        </motion.div>

                        {/* Personal Story */}
                        <motion.p variants={fadeUp} className="mt-7 max-w-xl text-base leading-7 text-[#1B120B]/70 sm:mt-8 sm:text-lg sm:leading-8">
                            The trips I care most about have mostly come from people who knew me first — neighbours, friends, families in my own building. They didn&apos;t come to me for a price. They came because they wanted someone to take their trip seriously.
                        </motion.p>

                        {/* Bonhomiee Story */}
                        <motion.p variants={fadeUp} className="mt-4 max-w-xl text-base leading-7 text-[#1B120B]/70 sm:text-lg sm:leading-8">
                            So in 2024 I came home to Kolkata and started something else: a small team that would rather do the work well than do it at volume, and Ascendus, built to make that depth scale without ever becoming the thing you notice.
                        </motion.p>

                        {/* Final Thought */}
                        <motion.p variants={fadeUp} className="mt-4 max-w-xl text-base leading-7 text-[#1B120B]/70 sm:text-lg sm:leading-8">
                            Every itinerary that leaves here still passes through me. One day that will stop being true — and when it does, it will be because Ascendus learned to carry what I know, not because we decided it mattered less.
                        </motion.p>

                        {/* Signature + Mobile Founder Image */}
                        <motion.div variants={fadeUp} className="mt-7 sm:mt-8">
                            <div className="mb-4 h-px w-12 bg-[#FBAB18]" />

                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="text-base font-semibold text-[#1B120B]">— Sudip Pal</p>
                                    <p className="mt-1 text-sm text-[#1B120B]/45">Founder, Bonhomiee</p>
                                </div>

                                {/* Mobile Founder Image */}
                                <Link href="https://www.linkedin.com/in/sudippalbonhomiee" target="_blank" rel="noopener noreferrer" aria-label="Sudip Pal on LinkedIn" className="group relative lg:hidden">
                                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#0E40C7]/10">
                                        <Image src={mobileFounderImage} alt="Sudip Pal, Founder of Bonhomiee" fill sizes="80px" className="object-cover" />
                                    </div>

                                    <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#0E40C7] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                                        <ArrowUpRight size={12} strokeWidth={1.8} />
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Desktop Founder Image */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative hidden h-[64vh] min-h-[420px] overflow-hidden rounded-[1.75rem] lg:block">
                        <Image src={desktopFounderImage} alt="Sudip Pal, Founder of Bonhomiee" fill sizes="42vw" className="object-cover transition-transform duration-1000 hover:scale-[1.025]" priority />

                        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/45 to-transparent" />

                        <div className="absolute bottom-7 left-7 flex items-center gap-3 text-sm font-medium text-white/90 sm:bottom-8 sm:left-8">
                            <span className="h-px w-8 bg-white/70" />
                            Sudip Pal
                        </div>

                        <Link href="https://www.linkedin.com/in/sudippalbonhomiee" target="_blank" rel="noopener noreferrer" aria-label="Sudip Pal on LinkedIn" className="absolute right-7 top-7 sm:right-8 sm:top-8">
                            <motion.div className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/90 text-[#0E40C7] backdrop-blur-sm" whileHover={{ scale: 1.08 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                                <motion.div className="absolute" initial={{ opacity: 1, scale: 1, rotate: 0 }} whileHover={{ opacity: 0, scale: 0.5, rotate: -45 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
                                    <Linkedin size={18} strokeWidth={1.8} />
                                </motion.div>

                                <motion.div className="absolute" initial={{ opacity: 0, scale: 0.5, rotate: 45 }} whileHover={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}>
                                    <ArrowUpRight size={17} strokeWidth={1.6} />
                                </motion.div>
                            </motion.div>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}