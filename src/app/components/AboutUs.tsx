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
        <section className="relative py-20 sm:py-28 overflow-hidden">
            {/* Background accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.06] rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/[0.06] rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    className="text-center max-w-2xl mx-auto mb-16"
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
                    <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold tracking-tight leading-tight">
                        Crafting Journeys <span className="text-primary">Creating Memories</span>
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-2 max-w-md mx-auto">
                        We&apos;re a passionate team of travel enthusiasts who believe every trip should feel effortless. From curated itineraries to 24/7 support — we handle the details so you can live the experience.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16"
                >
                    {stats.map((s) => (
                        <motion.div
                            key={s.label}
                            variants={fadeUp}
                            whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                            className="relative group rounded-2xl bg-card border border-border p-5 sm:p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <motion.div
                                    className="mx-auto w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3"
                                    whileHover={{ rotate: 12, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <s.icon className="h-5 w-5" />
                                </motion.div>
                                <motion.p
                                    className="text-2xl sm:text-3xl font-bold text-foreground"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                                >
                                    {s.value}
                                </motion.p>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Story + Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    className="mb-16 space-y-6"
                >
                    <div className="max-w-3xl mx-auto text-center space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                            Built by travellers,{" "}
                            <span className="text-primary">for travellers</span>
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            What started as a small team planning trips for friends has grown into a full-service travel platform trusted by thousands. We combine local expertise with cutting-edge technology to deliver seamless, personal travel experiences — every itinerary handcrafted, every hotel personally vetted.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { icon: Globe, text: "Global network of partners" },
                            { icon: Shield, text: "Secure & transparent pricing" },
                            { icon: Sparkles, text: "AI-powered recommendations" },
                            { icon: Users, text: "Dedicated travel concierge" },
                        ].map((v, i) => (
                            <motion.div
                                key={v.text}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.07 }}
                                whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                    <v.icon className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium text-foreground/80">{v.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    className="relative rounded-2xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-secondary/80" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />

                    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 sm:px-12 py-10 sm:py-12">
                        <div className="text-center sm:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to plan your next adventure?</h3>
                            <p className="text-white/60 text-sm mt-1.5">Get in touch with our team — we&apos;ll craft the perfect trip for you.</p>
                        </div>
                        <Link href="/packages">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.25)" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="flex items-center gap-2 px-7 py-3 rounded-full bg-background text-primary font-semibold text-sm shadow-lg shrink-0"
                            >
                                Know More
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
