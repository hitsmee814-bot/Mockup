"use client"

import { motion } from "framer-motion"

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

const fadeImage = {
    hidden: {
        opacity: 0,
        scale: 0.97,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

export default function WhyDifferent() {
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
                    variants={fadeUp}
                    className="mb-16 max-w-3xl sm:mb-20 lg:mb-24"
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
                        Why we&apos;re different
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
                            xl:text-7xl
                        "
                    >
                        Most travel companies sell you a place.
                        <br />
                        <span className="text-black/35">
                            We start by understanding a person.
                        </span>
                    </h2>
                </motion.div>


                {/* =====================================================
                    MAIN CONTENT
                ===================================================== */}

                <div
                    className="
                        grid
                        grid-cols-1
                        items-start
                        gap-14
                        lg:grid-cols-[0.9fr_1.1fr]
                        lg:gap-24
                    "
                >

                    {/* =================================================
                        LEFT — IMAGE
                    ================================================= */}

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-100px",
                        }}
                        variants={fadeImage}
                        className="
                            relative
                            overflow-hidden
                            rounded-[2rem]
                            bg-[#F4F4F2]
                            lg:sticky
                            lg:top-24
                        "
                    >
                        <img
                            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=85"
                            alt="A meaningful journey"
                            className="
                                aspect-[4/5]
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
                                from-black/15
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
                                A journey should feel like it
                                could only have been yours.
                            </p>
                        </div>
                    </motion.div>



                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: "-100px",
                        }}
                        variants={fadeUp}
                        className="
                            max-w-2xl
                            lg:pt-4
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
                            That sounds like a small distinction.
                            It&apos;s the whole company.
                        </p>



                        <div
                            className="
                                mt-8
                                space-y-6
                                text-base
                                leading-[1.85]
                                text-black/55
                                sm:text-lg
                            "
                        >

                            <p>
                                A booking platform optimises for the
                                transaction — the fastest path from
                                search to payment.
                            </p>

                            <p>
                                We optimise for the thing that happens
                                after you come home: the sense that the
                                trip was designed for you specifically.
                            </p>

                            <p>
                                Not for someone with your budget, or your
                                dates, but for you — at this point in your
                                life, with everything you&apos;re carrying
                                into it.
                            </p>

                        </div>

                        <div
                            className="
                                my-12
                                border-y
                                border-black/10
                                py-10
                                sm:my-16
                                sm:py-12
                            "
                        >

                            <p
                                className="
                                    text-3xl
                                    font-medium
                                    leading-[1.1]
                                    tracking-[-0.03em]
                                    text-black
                                    sm:text-4xl
                                    lg:text-5xl
                                "
                            >
                                We don&apos;t think being understood
                                should be a privilege.
                            </p>

                            <p
                                className="
                                    mt-5
                                    text-base
                                    leading-relaxed
                                    text-black/50
                                    sm:text-lg
                                "
                            >
                                We think it should be the baseline —
                                for every traveller, on every trip.
                            </p>

                        </div>

                        <div
                            className="
                                border-l-2
                                border-[#0E40C7]
                                pl-5
                                sm:pl-6
                            "
                        >

                            <p
                                className="
                                    text-base
                                    leading-[1.8]
                                    text-black/55
                                    sm:text-lg
                                "
                            >
                                And behind the conversation is{" "}
                                <span className="font-medium text-black">
                                    Ascendus
                                </span>
                                , our intelligence layer. It learns from
                                every journey, so a small team can deliver
                                the kind of attention that used to need a
                                large one.
                            </p>

                            <p
                                className="
                                    mt-5
                                    text-base
                                    font-medium
                                    leading-relaxed
                                    text-black
                                    sm:text-lg
                                "
                            >
                                It isn&apos;t the thing we sell.
                                <br />
                                It&apos;s the thing that lets us keep
                                our promise.
                            </p>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>
    )
}