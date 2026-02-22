"use client"

import { useRef } from "react"
import { useScroll } from "framer-motion"
import AnimatedColumn from "./AnimatedColumn"
import TallCard from "./cards/TallCard"
import SquareCard from "./cards/SquareCard"

export default function FloatingCardsSection() {
    const sectionRef = useRef<HTMLElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    return (
        <section
            ref={sectionRef}
            className="w-screen py-32 overflow-hidden relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        >
            <div className="max-w-4xl mx-auto px-6 text-center mb-5">
                <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900">
                    Smart Travel. Seamless Experiences.
                </h2>
                <p className="mt-4 text-base md:text-lg text-neutral-600">
                    From corporate journeys to curated holidays, Bonhomiee blends
                    technology, personalization, and trust to redefine how you travel.
                </p>
            </div>

            <div className="grid grid-cols-6 gap-6 w-[120vw] -ml-[10vw]">
                <AnimatedColumn scrollYProgress={scrollYProgress} range={100}>
                    <TallCard
                        title="Business Travel"
                        description="Streamlined business travel solutions that save time and money while ensuring comfort and efficiency."
                        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" />
                    <SquareCard
                        title="Business Features"
                        items={[
                            "Dedicated account management",
                            "Cost control reporting",
                            "Multi-city itineraries",
                            "Meeting & event planning",
                        ]}
                        image="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80" />
                </AnimatedColumn>

                <AnimatedColumn scrollYProgress={scrollYProgress} range={-100} className="mt-20">
                    <TallCard
                        title="Custom Holidays"
                        description="Personalized travel experiences crafted just for you."
                        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                    />
                </AnimatedColumn>

                <AnimatedColumn scrollYProgress={scrollYProgress} range={85} className="mt-8">
                    <SquareCard
                        title="Holiday Features"
                        items={[
                            "Custom itineraries",
                            "Exclusive deals",
                            "24/7 support",
                            "VIP services",
                        ]}
                        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                    />
                    <TallCard
                        title="Welcome to Bonhomiee"
                        description="India's pioneering digital travel ecosystem."
                        image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
                    />
                </AnimatedColumn>

                <AnimatedColumn scrollYProgress={scrollYProgress} range={-120} className="mt-28">
                    <TallCard
                        title="Our Mission"
                        description="Revolutionizing corporate and leisure travel."
                        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
                    />
                </AnimatedColumn>

                <AnimatedColumn scrollYProgress={scrollYProgress} range={115} className="mt-12">
                    <TallCard
                        title="Our Vision"
                        description="The most trusted modern travel partner."
                        image="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80" />
                    <SquareCard
                        title="Our Story"
                        items={[
                            "Startup agility",
                            "Entrepreneurial spirit",
                            "Corporate & leisure focus",
                            "Tech driven",
                        ]}
                        image="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80"
                    />
                </AnimatedColumn>

                <AnimatedColumn scrollYProgress={scrollYProgress} range={-125} className="mt-36">
                    <TallCard
                        title="Bonhomiee Team"
                        description="A passionate team building meaningful journeys."
                        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                    />
                </AnimatedColumn>
            </div>
        </section>
    )
}