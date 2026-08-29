"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

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

export default function AboutClosing() {
    const router = useRouter()

    return (
        <section className="relative overflow-hidden bg-white py-28 sm:py-36 lg:py-44">

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
                        blur-[110px]
                    "
                />

            </div>


            <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    variants={fadeUp}
                    className="flex justify-center"
                >
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-black/10
                            bg-black/[0.02]
                            px-4
                            py-2
                        "
                    >
                        <Sparkles
                            className="h-3.5 w-3.5 text-[#0E40C7]"
                            strokeWidth={1.7}
                        />

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-black/40
                            "
                        >
                            Your journey starts here
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-80px",
                    }}
                    variants={fadeUp}
                    className="mt-10"
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
                        "
                    >
                        Tell us about
                        <br />
                        <span className="text-[#0E40C7]">
                            your trip.
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-8
                            max-w-xl
                            text-base
                            leading-[1.8]
                            text-black/50
                            sm:text-lg
                        "
                    >
                        Where you want to go is only the beginning.
                        Tell us what this trip means to you,
                        and we&apos;ll take it from there.
                    </p>

                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-60px",
                    }}
                    variants={fadeUp}
                    className="mt-10 flex justify-center"
                >

                    <button
                        onClick={() => router.push("/itinerary/packages")}
                        className="
                            group
                            inline-flex
                            items-center
                            gap-3
                            rounded-full
                            bg-[#0E40C7]
                            px-7
                            py-4
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-[#0E40C7]/20
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:bg-[#0B36A8]
                            hover:shadow-xl
                            hover:shadow-[#0E40C7]/25
                            active:translate-y-0
                        "
                    >
                        <span>
                            Start Your Journey
                        </span>

                        <ArrowRight
                            className="
                                h-4
                                w-4
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </button>

                </motion.div>

                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.25,
                    }}
                    className="
                        mt-8
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-black/25
                    "
                >
                    Travel that knows you.
                </motion.p>

            </div>

        </section>
    )
}