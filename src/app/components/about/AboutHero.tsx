"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowDown, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

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

export default function AboutHero() {
    const router = useRouter()

    return (
        <section className="relative min-h-screen overflow-hidden bg-white text-[#1B120B]">

            {/* Back */}
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => router.back()}
                className="
                    absolute left-6 top-7 z-20
                    flex items-center gap-2
                    text-sm font-medium text-[#1B120B]/50
                    transition-colors hover:text-[#0E40C7]
                    sm:left-10 lg:left-14
                "
            >
                <ArrowLeft size={16} strokeWidth={1.6} />
                <span>Back</span>
            </motion.button>

            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

                <div className="
                    grid min-h-screen items-center
                    gap-14 py-28
                    lg:grid-cols-[1.05fr_0.95fr]
                    lg:gap-20 lg:py-20
                ">

                    {/* Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="max-w-2xl"
                    >

                        {/* Label */}
                        {/* About Intro */}
                        <motion.div
                            variants={fadeUp}
                            className="relative mb-10"
                        >
                            <p
                                className="
                                    relative
                                    text-sm font-semibold
                                    uppercase tracking-[0.18em]
                                    text-[#0E40C7]
                                    sm:text-base
                                "
                            >
                                About Bonhomiee
                            </p>

                            <div className="mt-5 h-[2px] w-20 bg-[#FBAB18]" />
                        </motion.div>

                        {/* Heading */}
                        <h1 className="
                            text-5xl font-semibold
                            leading-[0.94] tracking-[-0.05em]
                            text-[#1B120B]
                            sm:text-6xl
                            lg:text-7xl
                            xl:text-[78px]
                        ">
                            We begin with
                            <br />
                            <span className="relative inline-block">
                                a conversation.

                                <span className="
                                    absolute -bottom-3 left-0
                                    h-1 w-2/3 rounded-full
                                    bg-[#0E40C7]
                                    sm:-bottom-4
                                " />
                            </span>
                        </h1>

                        {/* Intro */}
                        <div className="
                            mt-10 space-y-6
                            text-base leading-[1.8]
                            text-[#1B120B]/65
                            sm:text-lg
                        ">
                            <p className="font-medium text-[#1B120B]/80">
                                Most travel companies begin with a destination.
                                <br className="hidden sm:block" />
                                We don&apos;t.
                            </p>

                            <p>
                                Every trip carries a reason before it carries a
                                route — a celebration, a pause, a reunion, a
                                long-promised adventure.
                            </p>

                            <p>
                                So our first question is never &quot;where.&quot;
                                It&apos;s &quot;tell us about this trip.&quot;
                            </p>
                        </div>

                        {/* Closing */}
                        <motion.div
                            variants={fadeUp}
                            className="
                                mt-10 border-l-2 border-[#0E40C7]
                                pl-5 sm:pl-6
                            "
                        >
                            <p className="
                                text-base font-medium leading-[1.75]
                                text-[#1B120B]/70 sm:text-lg
                            ">
                                From there, we build the journey around who you
                                are and what you need this one to become.
                            </p>
                        </motion.div>

                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 35,
                            scale: 0.98,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.15,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="
                            relative h-[55vh] min-h-[430px]
                            overflow-hidden rounded-[2rem]
                            lg:h-[70vh]
                        "
                    >
                        <img
                            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
                            alt="A journey beginning"
                            className="
                                absolute inset-0
                                h-full w-full
                                object-cover
                                transition-transform duration-1000
                                hover:scale-[1.025]
                            "
                        />

                        {/* Minimal image detail */}
                        <div className="
                            absolute bottom-0 left-0 right-0
                            h-32
                            bg-gradient-to-t
                            from-black/30 to-transparent
                        " />

                        <p className="
                            absolute bottom-7 left-7
                            max-w-xs text-sm font-medium
                            leading-relaxed text-white/90
                            sm:left-8 sm:bottom-8
                        ">
                            Every trip carries a reason
                            before it carries a route.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}