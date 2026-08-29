"use client"

import { motion } from "framer-motion"
import {
    MessageCircle,
    Compass,
    PenLine,
    HeartHandshake,
} from "lucide-react"

const steps = [
    {
        number: "01",
        title: "Listen",
        icon: MessageCircle,
        text: "We ask too many questions before we suggest anything. We'd rather know why you're going than where.",
    },
    {
        number: "02",
        title: "Curate",
        icon: Compass,
        text: "We look beyond the obvious to find the places, stays, and experiences that fit the person behind the trip.",
    },
    {
        number: "03",
        title: "Craft",
        icon: PenLine,
        text: "The itinerary is the last thing we write, not the first. Every detail has a reason to be there.",
    },
    {
        number: "04",
        title: "Care",
        icon: HeartHandshake,
        text: "When something changes, we're already on it. The work nobody notices when it's done well is the work we care about most.",
    },
]

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemAnimation = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

export default function AboutCraft() {
    return (
        <section className="relative overflow-hidden bg-[#F7F7F5] py-24 sm:py-32 lg:py-40">

            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">


                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    variants={itemAnimation}
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
                        The craft
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
                        What a traveller
                        <br />
                        <span className="text-black/35">
                            actually feels.
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
                        A great journey doesn&apos;t happen because an
                        itinerary has been filled. It happens because every
                        decision behind it has been considered.
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
                        mt-16
                        grid
                        grid-cols-1
                        gap-px
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-black/[0.08]
                        bg-black/[0.08]
                        sm:grid-cols-2
                        lg:mt-24
                        lg:grid-cols-4
                    "
                >

                    {steps.map((step) => {
                        const Icon = step.icon

                        return (
                            <motion.div
                                key={step.number}
                                variants={itemAnimation}
                                className="
                                    group
                                    relative
                                    min-h-[300px]
                                    bg-[#F7F7F5]
                                    p-7
                                    transition-colors
                                    duration-500
                                    hover:bg-white
                                    sm:p-8
                                    lg:min-h-[340px]
                                "
                            >

                                {/* Number */}

                                <span
                                    className="
                                        absolute
                                        right-7
                                        top-7
                                        text-xs
                                        font-medium
                                        tabular-nums
                                        text-black/20
                                    "
                                >
                                    {step.number}
                                </span>


                                {/* Icon */}

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-black/10
                                        bg-white
                                        text-black/50
                                        transition-all
                                        duration-500
                                        group-hover:border-[#0E40C7]/20
                                        group-hover:bg-[#0E40C7]
                                        group-hover:text-white
                                    "
                                >
                                    <Icon
                                        className="h-5 w-5"
                                        strokeWidth={1.6}
                                    />
                                </div>


                                {/* Content */}

                                <div className="absolute bottom-7 left-7 right-7 sm:bottom-8 sm:left-8 sm:right-8">

                                    <h3
                                        className="
                                            text-2xl
                                            font-medium
                                            tracking-tight
                                            text-black
                                        "
                                    >
                                        {step.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-4
                                            text-sm
                                            leading-[1.7]
                                            text-black/50
                                            sm:text-base
                                        "
                                    >
                                        {step.text}
                                    </p>

                                </div>

                            </motion.div>
                        )
                    })}

                </motion.div>


                <div
                    className="
                        mt-16
                        grid
                        grid-cols-1
                        gap-10
                        lg:mt-20
                        lg:grid-cols-2
                        lg:gap-20
                    "
                >

                    {/* Trip Design */}

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-80px",
                        }}
                        variants={itemAnimation}
                    >
                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-black/30
                            "
                        >
                            Trip Design
                        </p>

                        <h3
                            className="
                                mt-4
                                text-2xl
                                font-medium
                                tracking-tight
                                text-black
                                sm:text-3xl
                            "
                        >
                            The people who actually
                            design your journey.
                        </h3>

                        <p
                            className="
                                mt-5
                                max-w-xl
                                text-base
                                leading-[1.8]
                                text-black/50
                            "
                        >
                            We ask too many questions before we suggest
                            anything — we&apos;d rather know why you&apos;re
                            going than where. The itinerary is the last thing
                            we write, not the first.
                        </p>
                    </motion.div>


                    {/* Care */}

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-80px",
                        }}
                        variants={itemAnimation}
                    >
                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-black/30
                            "
                        >
                            Care
                        </p>

                        <h3
                            className="
                                mt-4
                                text-2xl
                                font-medium
                                tracking-tight
                                text-black
                                sm:text-3xl
                            "
                        >
                            The reason a hard moment
                            becomes a call you don&apos;t have to make.
                        </h3>

                        <p
                            className="
                                mt-5
                                max-w-xl
                                text-base
                                leading-[1.8]
                                text-black/50
                            "
                        >
                            When a connection slips at 11pm, we&apos;re already
                            on it. The work nobody notices when it&apos;s done
                            well is the work we care about most.
                        </p>
                    </motion.div>

                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    className="mt-20 border-t border-black/10 pt-8"
                >

                    <p
                        className="
                            max-w-2xl
                            text-xl
                            font-medium
                            leading-relaxed
                            tracking-tight
                            text-black
                            sm:text-2xl
                        "
                    >
                        The details are where the difference lives.
                    </p>

                </motion.div>

            </div>

        </section>
    )
}