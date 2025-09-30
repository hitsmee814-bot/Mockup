"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineBriefcase, HiOutlinePaperAirplane } from "react-icons/hi";
import MobileDemo from "./MobileDemo";

export default function Hero() {
  const [mode, setMode] = useState<"leisure" | "corporate">("leisure");

  const textVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -40, opacity: 0 },
  };

  return (
    <section className="relative h-screen bg-white text-gray-900 flex items-center overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full items-center w-full max-w-6xl mx-auto px-8 gap-8">
        <div className="flex flex-col justify-center space-y-6">
          <AnimatePresence mode="wait">
            {mode === "leisure" ? (
              <motion.div
                key="leisure-text"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeInOut" }}
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }} // 👈 re-trigger on scroll
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Design Your Dream Trip
                </h1>
                <p className="text-gray-600 mb-6 max-w-md">
                  Powered by AI and guided by experts, craft journeys that are
                  truly one-of-a-kind.
                </p>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium text-sm hover:bg-indigo-700 transition mb-4 flex items-center gap-2">
                  <HiOutlinePaperAirplane size={18} />
                  Start Itinerary
                </button>
                <p
                  onClick={() => setMode("corporate")}
                  className="text-sm text-indigo-600 cursor-pointer hover:underline"
                >
                  Looking for corporate travel?
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="corporate-text"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeInOut" }}
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Smarter Corporate Travel
                </h1>
                <p className="text-gray-600 mb-6 max-w-md">
                  Book flights, hotels, and packages instantly while staying
                  compliant and saving on every trip.
                </p>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium text-sm hover:bg-indigo-700 transition mb-4 flex items-center gap-2">
                  <HiOutlineBriefcase size={18} />
                  Request Demo
                </button>
                <p
                  onClick={() => setMode("leisure")}
                  className="text-sm text-indigo-600 cursor-pointer hover:underline"
                >
                  Looking for leisure travel?
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="flex justify-center items-center relative"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.4 }}
        >
          <MobileDemo />
        </motion.div>
      </div>
    </section>
  );
}
