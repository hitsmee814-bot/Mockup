"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const members = [
{
        name: "Sudip Pal",
        position: "Founder",
        description:
            "Keeps asking the one question everything else is built on: what is this trip for?",
        image: "/images/Team CEO.jpeg",
        imageClass: "object-[center_15%]",
    },
    {
        name: "Sanya Hamdani",
        position: "Brand & Story",
        description:
            "Guards how we sound, so nothing here could belong to any other travel company.",
        image: "/images/Team Designer.jpeg",
        imageClass: "object-[80%_10%]",
    },
    {
        name: "Antara Roy",
        position: "Operations & Partnership",
        description:
            "The reason intent becomes delivery. Turning thoughtful planning into a journey that works.",
        image: "/images/Antara Roy.jpeg",
    },
    {
        name: "Asmit Paria",
        position: "Technology & Ascendus",
        description:
            "Builds the layer you're never meant to notice — making depth and personalisation possible at scale.",
        image: "/images/Asmit Paria.jpeg",
    },
//     {
//         name: "Trip Design",
//         position: "Trip Design",
//         description:
//             "Asks more questions than it answers, before it writes a single itinerary.",
//     },
//     {
//     name: "Care",
//     position: "Care",
//     description:
//         "Already on it before you've noticed something's wrong.",
// },
]

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

const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

export default function AboutTeam() {
    const [activeCard, setActiveCard] = useState<number | null>(null)

    return (
        <section className="bg-white py-18 text-[#1B120B] sm:py-18 lg:py-18">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

                {/* Intro */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="max-w-3xl"
                >
                    <div className="mb-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0E40C7] sm:text-base">
                            About the team
                        </p>

                        <div className="mt-5 h-[2px] w-20 bg-[#FBAB18]" />
                    </div>

                    <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[58px]">
                        A small team,
                        <br />
                        <span className="text-[#0E40C7]">
                            for the trips that matter.
                        </span>
                    </h2>

                    <p className="mt-8 max-w-2xl text-base leading-[1.85] text-[#1B120B]/70 sm:text-lg">
                        We introduce ourselves by how we think, not by headshots.
                        Different perspectives, one shared responsibility:
                        making every journey feel considered, personal, and
                        unmistakably yours.
                    </p>
                </motion.div>

                {/* Team Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={container}
                    className="
                                mt-14 grid grid-cols-1 gap-5
                                sm:grid-cols-2
                                lg:mt-20 lg:grid-cols-2
                            "
                >
                    {members.map((member, index) => {
                        const isActive = activeCard === index

                        return (
                            <motion.div
                                key={member.name}
                                variants={fadeUp}
                                onMouseEnter={() => setActiveCard(index)}
                                onMouseLeave={() => setActiveCard(null)}
                                onClick={() =>
                                    setActiveCard(isActive ? null : index)
                                }
className="
    group relative min-h-[280px]
    cursor-pointer overflow-hidden
    rounded-[1.75rem]
    border border-[#1B120B]/10
    bg-[#FAFAF9]
    transition-all duration-500
    hover:border-[#0E40C7]/20
    sm:min-h-[300px]
    lg:min-h-[340px]
"
                            >
                                {/* Number */}
                                {/* Number */}
<span
    className="
        absolute right-7 top-7 z-30
        text-sm font-medium
        tabular-nums
        text-[#1B120B]/30
    "
>
    0{index + 1}
</span>

{/* Image */}
<motion.div
    className="absolute inset-0 z-10"
    animate={{
        opacity: isActive ? 0 : 1,
        scale: isActive ? 1.04 : 1,
    }}
    transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
    }}
>
<Image
    src={member.image}
    alt={`${member.name} - ${member.position}`}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
className={`object-cover ${member.imageClass || ""}`}/>

    {/* Image Overlay */}
    <div
        className="
            absolute inset-0
            bg-gradient-to-t
            from-black/65
            via-black/10
            to-transparent
        "
    />
</motion.div>

{/* Default Member Info */}
<motion.div
    className="
        absolute bottom-7 left-7 right-7 z-20
    "
    animate={{
        opacity: isActive ? 0 : 1,
        y: isActive ? 15 : 0,
    }}
    transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
    }}
>
    <p
        className="
            mb-2 text-xs font-medium
            uppercase tracking-[0.16em]
            text-white/75
        "
    >
        {member.position}
    </p>

    <h3
        className="
            max-w-[260px]
            text-2xl font-semibold
            leading-[1.15]
            tracking-[-0.035em]
            text-white
        "
    >
        {member.name}
    </h3>
</motion.div>

{/* Hover Description */}
<motion.div
    className="
        absolute inset-0 z-20
        flex items-end
        p-7
    "
    initial={false}
    animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 25,
    }}
    transition={{
        duration: 0.45,
        delay: isActive ? 0.08 : 0,
        ease: [0.16, 1, 0.3, 1],
    }}
>
    <div>
        <p
            className="
                mb-3 text-xs font-medium
                uppercase tracking-[0.16em]
                text-[#0E40C7]
            "
        >
            {member.position}
        </p>

        <h3
            className="
                mb-4
                text-2xl font-semibold
                leading-[1.15]
                tracking-[-0.035em]
                text-[#1B120B]
            "
        >
            {member.name}
        </h3>

        <p
            className="
                max-w-[360px]
                text-sm
                leading-[1.7]
                text-[#1B120B]/65
            "
        >
            {member.description}
        </p>
    </div>
</motion.div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Closing */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="
                        mt-4 max-w-3xl
                        border-t border-[#1B120B]/10
                        pt-4 sm:mt-4
                    "
                >
                    <p className="
                        text-2xl font-medium
                        leading-[1.35]
                        tracking-[-0.025em]
                        sm:text-3xl
                    ">
                        Different perspectives.
                        <br />
                        <span className="text-[#0E40C7]">
                            One shared way of thinking.
                        </span>
                    </p>

                    <p className="
                        mt-5 max-w-2xl
                        text-base leading-[1.8]
                        text-[#1B120B]/65
                    ">
                        The people behind Bonhomiee are united by the belief
                        that thoughtful travel starts with paying attention.
                    </p>
                </motion.div>

            </div>
        </section>
    )
}