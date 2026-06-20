"use client"

import { motion } from "framer-motion"
import { ArrowRight, Globe, Users, Award, MapPin, Sparkles, Shield } from "lucide-react"
import Link from "next/link"

const stats = [
    { value: "12K+", label: "Happy Travellers", icon: Users },
    { value: "85+", label: "Destinations", icon: MapPin },
    { value: "98%", label: "Satisfaction Rate", icon: Award },
    { value: "6+", label: "Years of Trust", icon: Shield },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring" as const,
            stiffness: 200,
            damping: 22,
        },
    },
}
export function AboutUs() {
    return (
        <section className="relative py-20 sm:py-28 overflow-hidden" id="aboutus">
            {/* Background accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.06] rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/[0.06] rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    className="text-center max-w-2xl mx-auto mb-6"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5"
                    >
                        <Sparkles className="h-3 w-3" />
                        Who We Are
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    className="mb-20"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
                            Most travel companies begin with a destination.
                            <br />
                            <span className="text-primary">
                                We begin with a conversation.
                            </span>
                        </h3>

                        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                            <p>
                                At Bonhomiee, we believe the most meaningful journeys
                                aren't defined by where you go, but by why you're going.
                                A celebration, a pause, a reunion, a fresh perspective,
                                or a long-awaited adventure — every trip carries a story
                                before it begins.
                            </p>

                            <p>
                                That's why our first question isn't
                                <span className="font-medium text-foreground">
                                    {" "}
                                    "Where would you like to go?"
                                </span>
                            </p>

                            <p className="text-xl sm:text-2xl font-semibold text-foreground">
                                "Tell us about this trip."
                            </p>

                            <p>
                                From there, we design journeys around who you are, what
                                you love, what you seek, and what you need this
                                experience to become. Every recommendation, every stay,
                                and every experience is chosen with intent — not to fill
                                an itinerary, but to create resonance.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Ascendus */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    className="mb-20"
                >
                    <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                                <Sparkles className="h-4 w-4" />
                                Powered by Ascendus
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                                Intelligence That Learns With Every Journey
                            </h3>

                            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
                                At the heart of how we work is Ascendus, our
                                intelligence layer. It learns from every conversation,
                                every journey, and every moment of feedback, building an
                                understanding of you that compounds over time.
                            </p>

                            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                                The longer you travel with us, the more precisely your
                                journeys become yours. Recommendations become more
                                relevant. Experiences become more aligned. Planning
                                becomes effortless.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {[
                        {
                            icon: Users,
                            title: "Conversation First",
                            text: "Every journey begins by understanding the story behind your trip.",
                        },
                        {
                            icon: Sparkles,
                            title: "Powered by Ascendus",
                            text: "Intelligence that learns from every journey and personalizes the next.",
                        },
                        {
                            icon: Globe,
                            title: "Designed Around You",
                            text: "No templates. No generic packages. Only journeys tailored to you.",
                        },
                        {
                            icon: Shield,
                            title: "Trusted Guidance",
                            text: "Human expertise supported by technology at every step.",
                        },
                    ].map((item) => (
                        <motion.div
                            key={item.title}
                            whileHover={{ y: -4 }}
                            className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <item.icon className="h-5 w-5" />
                            </div>

                            <h4 className="font-semibold mb-2">
                                {item.title}
                            </h4>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div >
        </section >
    )
}
