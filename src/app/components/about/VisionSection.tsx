"use client"

import { motion } from "framer-motion"
import {
    ArrowRight,
    Globe2,
    Sparkles,
} from "lucide-react"

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

export default function VisionSection() {
    return (
        <section className="relative overflow-hidden bg-white py-28 sm:py-36 lg:py-48">

            <div className="pointer-events-none absolute inset-0">

                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[420px]
                        w-[420px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#479EA8]/[0.06]
                        blur-[100px]
                    "
                />

                <div
                    className="
                        absolute
                        right-[10%]
                        top-[15%]
                        h-32
                        w-32
                        rounded-full
                        bg-[#0E40C7]/[0.04]
                        blur-3xl
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
                    className="flex items-center gap-3"
                >
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-[#0E40C7]/[0.07]
                            text-[#0E40C7]
                        "
                    >
                        <Globe2
                            className="h-5 w-5"
                            strokeWidth={1.5}
                        />
                    </div>

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            text-black/40
                        "
                    >
                        Our vision
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
                    className="mt-12 max-w-6xl sm:mt-16"
                >

                    <h2
                        className="
                            text-5xl
                            font-medium
                            leading-[0.98]
                            tracking-[-0.055em]
                            text-black
                            sm:text-6xl
                            lg:text-8xl
                            xl:text-[7.5rem]
                        "
                    >
                        A world where
                        <br />
                        <span className="text-black/30">
                            every traveller
                        </span>
                        <br />
                        feels understood.
                    </h2>

                </motion.div>

                <div
                    className="
                        mt-16
                        grid
                        grid-cols-1
                        gap-12
                        border-t
                        border-black/10
                        pt-10
                        lg:mt-24
                        lg:grid-cols-[0.8fr_1.2fr]
                        lg:gap-24
                        lg:pt-12
                    "
                >


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
                                max-w-sm
                                text-xl
                                font-medium
                                leading-[1.35]
                                tracking-tight
                                text-black
                                sm:text-2xl
                            "
                        >
                            We believe travel can be
                            more personal without
                            becoming more complicated.
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
                        className="max-w-2xl"
                    >

                        <div
                            className="
                                space-y-6
                                text-base
                                leading-[1.9]
                                text-black/55
                                sm:text-lg
                            "
                        >

                            <p>
                                Today, the best travel experiences are often
                                reserved for people who have the time,
                                knowledge, or access to find them.
                            </p>

                            <p>
                                We want to change that.
                            </p>

                            <p>
                                We imagine a world where personal travel
                                planning is not a luxury, where technology
                                doesn't replace human judgement but makes
                                thoughtful attention available to more people.
                            </p>

                            <p>
                                Where the more you travel, the better your
                                journeys become — because the people helping
                                you actually know you.
                            </p>

                        </div>

                    </motion.div>

                </div>


                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-80px",
                    }}
                    variants={fadeUp}
                    className="
                        mt-20
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-3
                        lg:mt-28
                    "
                >


                    <div
                        className="
                            rounded-2xl
                            border
                            border-black/[0.07]
                            bg-[#FAFAF9]
                            p-7
                            sm:p-8
                        "
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
                            01
                        </p>

                        <h3
                            className="
                                mt-12
                                text-xl
                                font-medium
                                tracking-tight
                                text-black
                                sm:text-2xl
                            "
                        >
                            Personal by default
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
                            Not an upgrade. Not an add-on.
                            The journey begins with knowing
                            the person taking it.
                        </p>
                    </div>



                    <div
                        className="
                            rounded-2xl
                            border
                            border-black/[0.07]
                            bg-[#FAFAF9]
                            p-7
                            sm:p-8
                        "
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
                            02
                        </p>

                        <h3
                            className="
                                mt-12
                                text-xl
                                font-medium
                                tracking-tight
                                text-black
                                sm:text-2xl
                            "
                        >
                            Technology in service
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
                            Intelligence should remove friction
                            and create space for better human
                            decisions — never replace them.
                        </p>
                    </div>



                    <div
                        className="
                            rounded-2xl
                            border
                            border-black/[0.07]
                            bg-[#FAFAF9]
                            p-7
                            sm:p-8
                        "
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
                            03
                        </p>

                        <h3
                            className="
                                mt-12
                                text-xl
                                font-medium
                                tracking-tight
                                text-black
                                sm:text-2xl
                            "
                        >
                            Better with time
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
                            Every journey should make the next
                            one more relevant, more effortless,
                            and more yours.
                        </p>
                    </div>

                </motion.div>

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.97,
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                        margin: "-80px",
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        mt-20
                        overflow-hidden
                        rounded-[2rem]
                        bg-[#0E40C7]
                        px-7
                        py-14
                        sm:px-12
                        sm:py-20
                        lg:mt-28
                        lg:px-20
                        lg:py-24
                    "
                >

                    <Sparkles
                        className="
                            h-6
                            w-6
                            text-white/50
                        "
                        strokeWidth={1.5}
                    />

                    <p
                        className="
                            mt-8
                            max-w-4xl
                            text-3xl
                            font-medium
                            leading-[1.1]
                            tracking-[-0.03em]
                            text-white
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        Because the future of travel
                        shouldn&apos;t be about finding more.
                        It should be about finding what&apos;s right.
                    </p>

                    <div
                        className="
                            mt-10
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-white/60
                        "
                    >
                        <span>That&apos;s the future we&apos;re building.</span>

                        <ArrowRight className="h-4 w-4" />
                    </div>

                </motion.div>

            </div>

        </section>
    )
}