"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 28,
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

export default function AboutHero() {
    return (
        <section className="relative min-h-[100svh] overflow-hidden bg-white">

            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

                <div
                    className="
                        grid
                        min-h-[100svh]
                        grid-cols-1
                        items-center
                        gap-12
                        py-28
                        lg:grid-cols-[1.05fr_0.95fr]
                        lg:gap-20
                        lg:py-20
                    "
                >

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="max-w-2xl"
                    >
                        <p
                            className="
                                mb-6
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.24em]
                                text-[#0E40C7]
                            "
                        >
                            About Bonhomiee
                        </p>



                        <h1
                            className="
                                text-5xl
                                font-semibold
                                leading-[0.96]
                                tracking-[-0.045em]
                                text-black
                                sm:text-6xl
                                lg:text-7xl
                                xl:text-[82px]
                            "
                        >
                            We begin with
                            <br />
                            a conversation.
                        </h1>


                        {/* Opening copy */}

                        <div
                            className="
                                mt-9
                                space-y-5
                                text-base
                                leading-[1.8]
                                text-black/55
                                sm:text-lg
                            "
                        >

                            <p>
                                Most travel companies begin with a destination.
                                We don&apos;t.
                            </p>

                            <p>
                                The most meaningful journeys aren&apos;t defined
                                by where you go, but by why you&apos;re going —
                                a celebration, a pause, a reunion, a fresh start,
                                a long-promised adventure.
                            </p>

                            <p>
                                Every trip carries a story before it begins.
                            </p>

                        </div>
                        <motion.div
                            variants={fadeUp}
                            className="
                                mt-9
                                border-l-2
                                border-[#0E40C7]
                                pl-5
                                sm:pl-6
                            "
                        >

                            <p
                                className="
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-[0.18em]
                                    text-black/35
                                "
                            >
                                So our first question is never
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-base
                                    text-black/45
                                    line-through
                                    decoration-black/20
                                    sm:text-lg
                                "
                            >
                                &quot;Where would you like to go?&quot;
                            </p>

                            <p
                                className="
                                    mt-4
                                    text-2xl
                                    font-medium
                                    tracking-tight
                                    text-black
                                    sm:text-3xl
                                "
                            >
                                &quot;Tell us about this trip.&quot;
                            </p>

                        </motion.div>

                        <p
                            className="
                                mt-8
                                max-w-xl
                                text-sm
                                leading-relaxed
                                text-black/45
                                sm:text-base
                            "
                        >
                            From there we design a journey around who you are,
                            what you love, and what you need this experience to
                            become — every stay, every recommendation, every
                            detail chosen with intent.
                        </p>

                    </motion.div>


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
                            relative
                            h-[55vh]
                            min-h-[430px]
                            overflow-hidden
                            rounded-[2rem]
                            lg:h-[72vh]
                        "
                    >

                        <img
                            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
                            alt="A journey beginning"
                            className="
                                absolute
                                inset-0
                                h-full
                                w-full
                                object-cover
                            "
                        />


                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/20
                                via-transparent
                                to-transparent
                            "
                        />


                        <div
                            className="
                                absolute
                                bottom-6
                                left-6
                                right-6
                                sm:bottom-8
                                sm:left-8
                                sm:right-8
                            "
                        >
                            <p
                                className="
                                    max-w-xs
                                    text-sm
                                    leading-relaxed
                                    text-white/80
                                "
                            >
                                Every trip carries a story
                                before it begins.
                            </p>
                        </div>

                    </motion.div>

                </div>

            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="
                    absolute
                    bottom-7
                    left-1/2
                    flex
                    -translate-x-1/2
                    flex-col
                    items-center
                    gap-2
                    text-black/30
                "
            >

                <span
                    className="
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                    "
                >
                    Discover
                </span>

                <motion.div
                    animate={{
                        y: [0, 5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ArrowDown className="h-4 w-4" />
                </motion.div>

            </motion.div>

        </section>
    )
}