"use client"

import { motion } from "framer-motion"
import {
    BrainCircuit,
    MessageCircle,
    Route,
    Sparkles,
    ArrowUpRight,
} from "lucide-react"

const learningPoints = [
    {
        icon: MessageCircle,
        title: "Every conversation",
        text: "What you tell us becomes part of a deeper understanding of how you travel.",
    },
    {
        icon: Route,
        title: "Every journey",
        text: "The places you choose, the experiences you love, and the moments that matter all add context.",
    },
    {
        icon: Sparkles,
        title: "Every piece of feedback",
        text: "What worked and what didn't helps shape what comes next.",
    },
]

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

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export default function AscendusSection() {
    return (
        <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40">


            <div className="pointer-events-none absolute inset-0">

                <div
                    className="
                        absolute
                        left-[15%]
                        top-[20%]
                        h-[350px]
                        w-[350px]
                        rounded-full
                        bg-[#479EA8]/[0.06]
                        blur-[110px]
                    "
                />

                <div
                    className="
                        absolute
                        right-[10%]
                        bottom-[10%]
                        h-[300px]
                        w-[300px]
                        rounded-full
                        bg-[#0E40C7]/[0.05]
                        blur-[100px]
                    "
                />

            </div>


            <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">


                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    variants={fadeUp}
                    className="max-w-4xl"
                >


                    <div
                        className="
                            mb-8
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#0E40C7]/10
                            bg-[#0E40C7]/[0.04]
                            px-4
                            py-2
                        "
                    >
                        <BrainCircuit
                            className="h-4 w-4 text-[#0E40C7]"
                            strokeWidth={1.6}
                        />

                        <span
                            className="
                                text-xs
                                font-medium
                                uppercase
                                tracking-[0.2em]
                                text-[#0E40C7]/60
                            "
                        >
                            The intelligence layer
                        </span>
                    </div>



                    <h2
                        className="
                            max-w-4xl
                            text-4xl
                            font-medium
                            leading-[1]
                            tracking-[-0.045em]
                            text-black
                            sm:text-5xl
                            lg:text-7xl
                        "
                    >
                        The more you travel with us,
                        <br />
                        <span className="text-black/25">
                            the better we understand you.
                        </span>
                    </h2>



                    <p
                        className="
                            mt-8
                            max-w-2xl
                            text-base
                            leading-[1.8]
                            text-black/55
                            sm:text-lg
                        "
                    >
                        That&apos;s Ascendus — our intelligence layer.
                        It learns from every conversation, every journey,
                        and every piece of feedback, building an understanding
                        of you that compounds over time.
                    </p>

                </motion.div>


                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-80px",
                    }}
                    variants={stagger}
                    className="
                        mt-16
                        grid
                        grid-cols-1
                        gap-4
                        md:grid-cols-3
                        lg:mt-24
                    "
                >

                    {learningPoints.map((point, index) => {
                        const Icon = point.icon

                        return (
                            <motion.div
                                key={point.title}
                                variants={fadeUp}
                                className="
                                    group
                                    relative
                                    min-h-[250px]
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-black/[0.07]
                                    bg-white
                                    p-7
                                    shadow-sm
                                    transition-all
                                    duration-500
                                    hover:-translate-y-1
                                    hover:border-[#479EA8]/30
                                    hover:shadow-lg
                                    hover:shadow-[#479EA8]/[0.08]
                                    sm:p-9
                                "
                            >

                                {/* Number */}

                                <span
                                    className="
                                        absolute
                                        right-7
                                        top-7
                                        text-xs
                                        tabular-nums
                                        text-black/20
                                    "
                                >
                                    0{index + 1}
                                </span>


                                {/* Icon */}

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#0E40C7]/[0.06]
                                        text-[#0E40C7]
                                        transition-all
                                        duration-500
                                        group-hover:bg-[#0E40C7]
                                        group-hover:text-white
                                    "
                                >
                                    <Icon
                                        className="h-5 w-5"
                                        strokeWidth={1.5}
                                    />
                                </div>


                                <div className="mt-16">

                                    <h3
                                        className="
                                            text-xl
                                            font-medium
                                            tracking-tight
                                            text-black
                                        "
                                    >
                                        {point.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-4
                                            text-sm
                                            leading-[1.7]
                                            text-black/45
                                            sm:text-base
                                        "
                                    >
                                        {point.text}
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
                        gap-12
                        lg:mt-24
                        lg:grid-cols-2
                        lg:gap-24
                    "
                >

                    {/* Left statement */}

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-80px",
                        }}
                        variants={fadeUp}
                    >

                        <p
                            className="
                                text-2xl
                                font-medium
                                leading-[1.2]
                                tracking-tight
                                text-black
                                sm:text-3xl
                                lg:text-4xl
                            "
                        >
                            The technology gets smarter.
                            <br />
                            <span className="text-black/25">
                                The experience gets simpler.
                            </span>
                        </p>

                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-80px",
                        }}
                        variants={fadeUp}
                        className="
                            border-l
                            border-[#0E40C7]/15
                            pl-6
                            sm:pl-8
                        "
                    >

                        <p
                            className="
                                text-base
                                leading-[1.85]
                                text-black/50
                                sm:text-lg
                            "
                        >
                            You don&apos;t need to learn how Ascendus works.
                            You just notice that the recommendations become
                            more relevant, the experiences more aligned,
                            and planning more effortless.
                        </p>

                        <p
                            className="
                                mt-6
                                text-base
                                font-medium
                                leading-relaxed
                                text-black
                                sm:text-lg
                            "
                        >
                            That&apos;s exactly how it should be.
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
                        delay: 0.1,
                    }}
                    className="
                        mt-20
                        flex
                        flex-col
                        gap-5
                        border-t
                        border-black/10
                        pt-8
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                text-[#0E40C7]/50
                            "
                        >
                            Ascendus
                        </p>

                        <p
                            className="
                                mt-2
                                max-w-md
                                text-lg
                                font-medium
                                leading-relaxed
                                text-black
                            "
                        >
                            Intelligence that learns with every journey.
                        </p>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-black/30
                        "
                    >
                        <span>
                            Built beneath the experience
                        </span>

                        <ArrowUpRight className="h-4 w-4" />
                    </div>

                </motion.div>

            </div>

        </section>
    )
}