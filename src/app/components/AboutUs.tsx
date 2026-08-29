"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

const fadeUp: Variants  = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

export function AboutUs() {
    const router = useRouter()

    return (
        <section
            id="aboutus"
            className="
                relative
                overflow-hidden
                bg-none
                py-24
                sm:py-32
                lg:py-40
            "
        >
            {/* Subtle background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[500px]
                        w-[500px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#479EA8]/[0.05]
                        blur-3xl
                    "
                />
            </div>

            <div className="relative mx-auto max-w-5xl px-6 sm:px-8">

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    variants={fadeUp}
                    className="mb-7 flex justify-center"
                >
           <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5"
          >
                        <Sparkles className="h-3.5 w-3.5" />

                        It Starts with a Conversation
                    </motion.div>
                </motion.div>


                <div className="mx-auto max-w-4xl text-center">

                    {/* Heading */}
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-100px",
                        }}
                        variants={fadeUp}
                        className="
                            text-4xl
                            font-bold
                            leading-[1.08]
                            tracking-tight
                            text-[#10213F]
                            sm:text-5xl
                            md:text-5xl
                            lg:text-5xl
                        "
                    >
                        We Don’t Plan.
                        <br />

                        <span className="text-[#0E40C7]">
                            We Listen.
                        </span>
                    </motion.h2>


                    {/* Description */}
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-100px",
                        }}
                        variants={fadeUp}
                        className="
                            mx-auto
                            mt-8
                            max-w-2xl
                            text-base
                            leading-relaxed
                            text-[#536174]
                            sm:text-lg
                            md:text-xl
                        "
                    >
                        End-to-end journeys built entirely around you.
                        <br className="hidden sm:block" />

                        <span className="text-[#10213F]">
                            {" "}Not templates. Not packages.
                        </span>{" "}

                        Real, considered experiences that turn a good
                        trip into an unforgettable one.
                    </motion.p>


                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-100px",
                        }}
                        variants={fadeUp}
                        className="mt-10 flex flex-col items-center justify-center gap-3"
                    >
                        <button
                            onClick={() => router.push("/itinerary/ai")}
                            className="
                                group
                                inline-flex
                                items-center
                                gap-3
                                rounded-full
                                bg-[#0E40C7]
                                px-7
                                py-4
                                text-base
                                font-semibold
                                text-white
                                shadow-lg
                                shadow-[#0E40C7]/20
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-xl
                                hover:shadow-[#0E40C7]/30
                                active:translate-y-0
                                sm:px-8
                                sm:py-4
                                sm:text-lg
                            "
                        >
                            <span>
                                Tailor My Trip
                            </span>

                            <ArrowRight
                                className="
                                    h-5
                                    w-5
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </button>

                        <span
                            className="
                                text-xs
                                font-medium
                                tracking-wide
                                text-[#6B7280]
                            "
                        >
                            Powered by Smart AI
                        </span>
                    </motion.div>

                </div>


                <motion.div
                    initial={{
                        opacity: 0,
                        scaleX: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        scaleX: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        mx-auto
                        mt-20
                        h-px
                        max-w-xs
                        origin-center
                        bg-gradient-to-r
                        from-transparent
                        via-[#0E40C7]/20
                        to-transparent
                    "
                />

            </div>
        </section>
    )
}