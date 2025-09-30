"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const reviews = [
    {
        name: "Sarah, NYC",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        quote:
            "This platform made planning my family trip effortless — everything was seamless and stress-free.",
    },
    {
        name: "Jason, LA",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
        quote:
            "I loved the personalized suggestions. It felt like a travel concierge in my pocket.",
    },
    {
        name: "Priya, London",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
        quote:
            "A beautifully designed app that actually understands how I want to travel.",
    },
    {
        name: "Leo, Berlin",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        rating: 4,
        quote: "Easy, fast, and intuitive. I booked an entire trip in minutes.",
    },
    {
        name: "Mei, Singapore",
        avatar: "https://randomuser.me/api/portraits/women/21.jpg",
        rating: 5,
        quote:
            "The AI recommendations were spot-on. I discovered places I would've never thought of.",
    },
    {
        name: "Mei, Singapore",
        avatar: "https://randomuser.me/api/portraits/women/21.jpg",
        rating: 5,
        quote:
            "The AI recommendations were spot-on. I discovered places I would've never thought of.",
    },
];

const letterVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
        opacity: 1,
        transition: {
            delay: i * 0.01,
        },
    }),
};

type TypedTextProps = {
    text: string;
    isActive: boolean;
};


function TypedText({ text, isActive }: TypedTextProps) {
    const letters = text.split("");
    return (
        <p className="italic text-sm text-gray-700 leading-relaxed">
            <AnimatePresence mode="wait">
                {isActive ? (
                    <motion.span
                        key="typed"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {letters.map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.span>
                ) : (
                    <span>{text}</span>
                )}
            </AnimatePresence>
        </p>
    );
}

export default function TestimonialsCleanGrid() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="max-w-7xl mx-auto px-6 py-24">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-16">
                What Travelers Are Saying
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <motion.div
                        key={index}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.08)",
                        }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        className="relative bg-white border border-gray-100 rounded-2xl p-6 transition-transform duration-300 ease-out overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 pointer-events-none"
                            whileHover={{ opacity: 1, x: ["-100%", "100%"] }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                        <div className="flex items-center space-x-4 mb-4">
                            <motion.div
                                animate={
                                    hoveredIndex === index
                                        ? { scale: [1, 1.1, 1] }
                                        : { scale: 1 }
                                }
                                transition={{ duration: 0.4 }}
                            >
                                <Image
                                    src={review.avatar}
                                    alt={review.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                            </motion.div>
                            <p className="font-medium text-gray-900 text-sm">{review.name}</p>
                        </div>

                        <TypedText
                            text={`“${review.quote}”`}
                            isActive={hoveredIndex === index}
                        />

                        <div className="mt-4 text-yellow-400 text-xs flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 1, scale: 1 }}
                                    animate={
                                        hoveredIndex === index
                                            ? {
                                                opacity: i < review.rating ? 1 : 0.3,
                                                scale: [0, 1.3, 1],
                                            }
                                            : { opacity: i < review.rating ? 1 : 0.3, scale: 1 }
                                    }
                                    transition={{
                                        delay: hoveredIndex === index ? 0.3 + i * 0.15 : 0,
                                        duration: 0.4,
                                    }}
                                >
                                    ★
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
