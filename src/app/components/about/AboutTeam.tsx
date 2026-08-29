"use client"

import { motion } from "framer-motion"
import {
    Compass,
    Heart,
    Lightbulb,
    Sparkles,
    Users,
} from "lucide-react"
import { useState } from "react"

const roles = [
    {
        title: "The Listener",
        icon: Heart,
        description:
            "Starts with questions, not assumptions. Understands the story, the occasion, the people, and what the traveller actually wants from the journey.",
    },
    {
        title: "The Curator",
        icon: Compass,
        description:
            "Looks beyond the obvious. Finds the stays, places, experiences, and details that make a journey feel considered rather than assembled.",
    },
    {
        title: "The Operator",
        icon: Users,
        description:
            "Makes the complexity disappear. Coordinates the moving parts behind the journey so the traveller can focus on experiencing it.",
    },
    {
        title: "The Technologist",
        icon: Lightbulb,
        description:
            "Builds systems that make better personalisation possible without taking the human thinking out of travel.",
    },
    {
        title: "The Caregiver",
        icon: Sparkles,
        description:
            "Stays close to the journey. Anticipates what might matter, responds when plans change, and makes sure the traveller never feels left alone.",
    },
]

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const cardAnimation = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

export default function AboutTeam() {
    const [activeCard, setActiveCard] = useState<number | null>(null)

    return (
        <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40">

            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">


                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    variants={cardAnimation}
                    className="max-w-3xl"
                >
                    <p
                        className="
                            mb-6
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            text-[#0E40C7]
                        "
                    >
                        How we work
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-semibold
                            leading-[1]
                            tracking-[-0.045em]
                            text-black
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        A small team.
                        <br />
                        <span className="text-black/35">
                            Deeply involved.
                        </span>
                    </h2>

                    <p
                        className="
                            mt-7
                            max-w-2xl
                            text-base
                            leading-[1.8]
                            text-black/50
                            sm:text-lg
                        "
                    >
                        We don&apos;t organise ourselves around departments.
                        We organise around the work a great journey demands.
                        Different perspectives, one shared responsibility:
                        making the experience feel unmistakably yours.
                    </p>
                </motion.div>


                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-80px",
                    }}
                    variants={container}
                    className="
                        mt-14
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                        lg:mt-20
                        lg:grid-cols-5
                    "
                >

                    {roles.map((role, index) => {
                        const Icon = role.icon
                        const isActive = activeCard === index

                        return (
                            <motion.div
                                key={role.title}
                                variants={cardAnimation}
                                onMouseEnter={() => setActiveCard(index)}
                                onMouseLeave={() => setActiveCard(null)}
                                onClick={() =>
                                    setActiveCard(
                                        isActive ? null : index
                                    )
                                }
                                className={`
                                    group
                                    relative
                                    min-h-[230px]
                                    cursor-pointer
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    p-6
                                    transition-all
                                    duration-500
                                    sm:min-h-[260px]
                                    ${
                                        isActive
                                            ? "border-[#0E40C7]/20 bg-[#F5F8FF]"
                                            : "border-black/[0.07] bg-[#FAFAF9] hover:border-black/10"
                                    }
                                `}
                            >

                                {/* Number */}

                                <span
                                    className="
                                        absolute
                                        right-5
                                        top-5
                                        text-xs
                                        font-medium
                                        tabular-nums
                                        text-black/20
                                    "
                                >
                                    0{index + 1}
                                </span>


                                {/* Icon */}

                                <div
                                    className={`
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        transition-all
                                        duration-500
                                        ${
                                            isActive
                                                ? "bg-[#0E40C7] text-white"
                                                : "bg-black/[0.04] text-black/45"
                                        }
                                    `}
                                >
                                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                                </div>


                                {/* Role */}

                                <div className="absolute bottom-6 left-6 right-6">

                                    <h3
                                        className="
                                            text-xl
                                            font-medium
                                            tracking-tight
                                            text-black
                                        "
                                    >
                                        {role.title}
                                    </h3>


                                    {/* Description */}

                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: isActive ? "auto" : 0,
                                            opacity: isActive ? 1 : 0,
                                            marginTop: isActive ? 12 : 0,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <p
                                            className="
                                                text-sm
                                                leading-[1.65]
                                                text-black/50
                                            "
                                        >
                                            {role.description}
                                        </p>
                                    </motion.div>

                                </div>

                            </motion.div>
                        )
                    })}

                </motion.div>


                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        margin: "-80px",
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        mt-16
                        max-w-2xl
                        border-t
                        border-black/10
                        pt-8
                        lg:mt-20
                    "
                >

                    <p
                        className="
                            text-xl
                            font-medium
                            leading-relaxed
                            tracking-tight
                            text-black
                            sm:text-2xl
                        "
                    >
                        Different roles.
                        <br />
                        One way of thinking.
                    </p>

                    <p
                        className="
                            mt-4
                            text-sm
                            leading-relaxed
                            text-black/40
                            sm:text-base
                        "
                    >
                        The people behind Bonhomiee are united by the belief
                        that thoughtful travel starts with paying attention.
                    </p>

                </motion.div>

            </div>

        </section>
    )
}