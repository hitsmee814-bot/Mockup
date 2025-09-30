"use client";
import { motion } from "framer-motion";

export default function HowItWorks() {
    const steps = [
        {
            id: 1,
            title: "Dream (AI)",
            desc: "Input your unique preferences and desired feeling. Our GenAI instantly creates a detailed, day-by-day draft.",
            icon: "💭",
            animation: () => {
                return (
                    <div className="w-64 h-20 flex flex-col justify-center items-start space-y-2">
                        {/* User Message */}
                        <motion.div
                            key="user-msg"
                            className="px-3 py-2 bg-white rounded-lg shadow text-xs text-gray-800"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            I want a relaxing beach trip 🌊
                        </motion.div>

                        {/* AI Response */}
                        <motion.div
                            key="ai-msg"
                            className="px-3 py-2 bg-indigo-100 rounded-lg shadow-sm text-xs text-gray-900 self-end"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: [0, 0, 1, 1, 0], y: [5, 0, 0, 0, -5] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            Great! How about Bali with a mix of culture + beaches?
                        </motion.div>
                    </div>
                );
            },
        },

        {
            id: 2,
            title: "Refine (Expert/Agent)",
            desc: "Your dedicated expert reviews the draft, adding their local knowledge, exclusive access, and real-time prices.",
            icon: "🧑‍💼",
            animation: () => (
                <div className="w-40 space-y-2">
                    {/* Line 1 */}
                    <motion.div
                        className="h-3 bg-white rounded-md"
                        animate={{ x: [-30, 0], opacity: [0, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    />
                    {/* Line 2 */}
                    <motion.div
                        className="h-3 bg-white rounded-md w-3/4"
                        animate={{ x: [-30, 0], opacity: [0, 1] }}
                        transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    />
                    {/* Checkmark */}
                    <motion.div
                        className="flex items-center gap-1 text-sm text-green-600 font-medium"
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                    >
                        ✅ Approved
                    </motion.div>
                </div>
            ),
        },
        {
            id: 3,
            title: "Go (App)",
            desc: "Manage your entire trip, payments, and communicate with your concierge via the Traveller Dashboard App.",
            icon: "📱",
            animation: () => (
                <div className="w-40">
                    {/* Itinerary Card 1 */}
                    <motion.div
                        className="bg-white shadow-sm border rounded-md px-3 py-2 text-xs text-gray-700 mb-2"
                        animate={{ y: [15, 0], opacity: [0, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    >
                        ✈️ NYC → LON
                    </motion.div>
                    {/* Itinerary Card 2 */}
                    <motion.div
                        className="bg-white shadow-sm border rounded-md px-3 py-2 text-xs text-gray-700"
                        animate={{ y: [15, 0], opacity: [0, 1] }}
                        transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    >
                        🏨 Hotel Confirmed
                    </motion.div>
                    {/* Confirmation */}
                    <motion.div
                        className="mt-3 text-green-600 font-medium text-sm flex justify-center"
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                    >
                        ✅ Trip Ready
                    </motion.div>
                </div>
            ),
        },
    ];

    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-center text-gray-900 mb-16"
                >
                    How Our AI + Human Touch Works <br />{" "}
                    <span className="text-indigo-600">(The 3-Step Flow)</span>
                </motion.h2>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center"
                        >
                            {/* Icon */}
                            <div className="text-4xl mb-6">{step.icon}</div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-6">{step.desc}</p>

                            {/* Mini Animation */}
                            <div className="mt-2">{step.animation()}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
