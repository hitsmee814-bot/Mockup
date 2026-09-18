"use client"
import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

import sudipImage from "../../assets/images/Team CEO.jpeg"
import sanyaImage from "../../assets/images/Team Designer.jpeg"
import antaraImage from "../../assets/images/AntaraImg.jpeg"
import asmitImage from "../../assets/images/AsmitImg.jpeg"

const members = [
    {
        name: "Sudip Pal",
        position: "THE QUESTION",
        role: "Founder",
        description: "Keeps asking the one question everything else is built on: what is this trip for?",
        image: sudipImage,
        imageClass: "object-[center_15%]",
    },
    {
        name: "Sanya Hamdani",
        position: "THE VOICE",
        role: "Brand & Story",
        description: "Guards how we sound, so nothing here could belong to any other travel company.",
        image: sanyaImage,
        imageClass: "object-[80%_10%]",
    },
    {
        name: "Antara Roy",
        position: "THE BUILD",
        role: "Supplier & Client Platform",
        description: "They build what the promise runs on. Every screen you'll use, and every connection behind it.",
        image: antaraImage,
        imageClass: "object-[center_15%]",
    },
    {
        name: "Asmit Paria",
        position: "THE BUILD",
        role: "Agency Platform & Integrations",
        description: "They build what the promise runs on. Every screen you'll use, and every connection behind it.",
        image: asmitImage,
        imageClass: "object-[center_15%]",
    },
]

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
}

export default function AboutTeam() {
    const [activeCard, setActiveCard] = useState<number | null>(null)

    return (
        <section className="bg-white py-14 text-[#1B120B] sm:py-16 lg:py-18">
            <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">

                {/* Intro */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl">
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0E40C7] sm:text-base">About the team</p>
                        <div className="mt-3 h-[2px] w-14 bg-[#FBAB18]" />
                    </div>

                    <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-[4.1rem]">
                        A small team,
                        <br />
                        <span className="text-[#FBAB18]">for the trips that matter.</span>
                    </h2>

                    <p className="mt-7 max-w-2xl text-base leading-7 text-[#1B120B]/70 sm:mt-8 sm:text-lg sm:leading-8">
                        We introduce ourselves by how we think, not by headshots. Different perspectives, one shared responsibility: making every journey feel considered, personal, and unmistakably yours.
                    </p>
                </motion.div>

                {/* Team Cards */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={container} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:gap-6">
                    {members.map((member, index) => {
                        const isActive = activeCard === index

                        return (
                            <motion.div
                                key={`${member.name}-${member.position}`}
                                variants={fadeUp}
                                onMouseEnter={() => setActiveCard(index)}
                                onMouseLeave={() => setActiveCard(null)}
                                onClick={() => setActiveCard(isActive ? null : index)}
className="group relative min-h-[350px] cursor-pointer overflow-hidden rounded-[1.75rem] border border-[#1B120B]/10 bg-[#FAFAF9] transition-all duration-500 hover:border-[#0E40C7]/20 sm:min-h-[400px] lg:min-h-[450px]"                            >

                                {/* Image */}
                                <motion.div className="absolute inset-0 z-10" animate={{ scale: isActive ? 1.015 : 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
    <Image
        src={member.image}
        alt={`${member.name} - ${member.role}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
        className={`object-cover ${member.imageClass || ""}`}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
</motion.div>
                                {/* Default Member Info */}
                                <motion.div className="absolute bottom-7 left-7 right-7 z-20" animate={{ opacity: isActive ? 0 : 1, y: isActive ? 15 : 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{member.position}</p>

                                    <h3 className="max-w-[320px] text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-white">
                                        {member.name} - {member.role}
                                    </h3>
                                </motion.div>

                                {/* Hover Content */}
                                <motion.div className="absolute inset-0 z-20 flex items-end" initial={false} animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>

                                    {/* Bottom Fade */}
                                    <motion.div className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-black/90 via-black/55 to-transparent" animate={{ y: isActive ? 0 : 20 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />

                                    {/* Hover Text */}
                                    <motion.div className="relative z-10 w-full p-7" initial={{ opacity: 0, y: 20 }} animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }} transition={{ duration: 0.45, delay: isActive ? 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}>
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#FBAB18]">{member.position}</p>

                                        <h3 className="mb-3 max-w-[340px] text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-white">
                                            {member.name} - {member.role}
                                        </h3>

                                        <p className="max-w-[380px] text-sm leading-[1.7] text-white/75">
                                            {member.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Ground + Intelligence */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={container} className="mt-12 overflow-hidden border-y border-[#1B120B]/10 bg-[#FAFAF9] sm:mt-14">

                    <div className="grid items-start lg:grid-cols-2">

                        {/* The Ground */}
                        <motion.div variants={fadeUp} className="border-b border-[#1B120B]/10 px-6 py-9 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10 lg:pr-12">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0E40C7]">The Ground</p>

                            <div className="mt-3 h-[2px] w-10 bg-[#FBAB18]" />

                            <h3 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl">
                                Suppliers.
                            </h3>

                            <p className="mt-5 max-w-xl text-base leading-7 text-[#1B120B]/65 sm:text-lg sm:leading-8">
                                Suppliers in every destination, documents, visas, timings, transfers — and someone reachable when you&apos;re eight time zones away. The least visible work in the company, and the least forgiving.
                            </p>
                        </motion.div>

                        {/* The Intelligence */}
                        <motion.div variants={fadeUp} className="px-6 py-9 sm:px-8 lg:px-10 lg:py-10 lg:pl-12">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0E40C7]">The Intelligence</p>

                            <div className="mt-3 h-[2px] w-10 bg-[#FBAB18]" />

                            <h3 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl">
                                Ascendus.
                            </h3>

                            <p className="mt-5 max-w-xl text-base leading-7 text-[#1B120B]/65 sm:text-lg sm:leading-8">
                                The layer you&apos;re never meant to notice — making depth and personalisation possible at scale.
                            </p>
                        </motion.div>

                    </div>
                </motion.div>

                {/* Closing */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 max-w-4xl">
                    <p className="text-2xl font-medium leading-[1.3] tracking-[-0.025em] sm:text-3xl lg:text-4xl">
                        The people behind Bonhomiee are united by the belief that thoughtful travel starts with paying attention.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-7 text-[#1B120B]/65 sm:text-lg sm:leading-8">
                        Around them work the designers, engineers and on-ground teams who make this possible in every destination we send you to. We&apos;ll introduce you to the people on your trip — we&apos;d rather do that in a conversation than on a page.
                    </p>
                </motion.div>

            </div>
        </section>
    )
}