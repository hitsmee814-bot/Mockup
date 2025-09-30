"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FlightAnim() {
  const query = "NYC → Paris · 15 Nov";
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Typing effect + trigger results
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(query.slice(0, i));
      i++;
      if (i > query.length) {
        clearInterval(interval);
        setTimeout(() => setShowResults(true), 500); // small pause
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const flights = [
    { airline: "Air France", time: "10:40 AM - 2:30 PM", price: "$450" },
    { airline: "Delta", time: "1:20 PM - 5:10 PM", price: "$480" },
    { airline: "Lufthansa", time: "3:15 PM - 7:05 PM", price: "$495" },
  ];

  return (
    <div className="w-[80%] space-y-5">
      {/* Search bar with typing */}
      <div className="h-12 rounded-md bg-gray-100 flex items-center px-4 text-sm text-gray-700 font-medium">
        ✈️ {typed}
        {typed.length < query.length && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="ml-1"
          >
            |
          </motion.span>
        )}
      </div>

      {/* Results container with fixed space */}
      <div className="min-h-[200px] space-y-3">
        {/* Shimmer while waiting */}
        {!showResults && typed.length === query.length && (
          <motion.div
            className="h-2 w-28 bg-gray-200 rounded-full mt-4"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {/* Results appear staggered */}
        {showResults && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.3 } },
            }}
            className="space-y-3"
          >
            {flights.map((f) => (
              <motion.div
                key={f.airline}
                className="h-16 rounded-md bg-gray-50 border flex items-center justify-between px-4 text-sm shadow-sm"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{f.airline}</span>
                  <span className="text-xs text-gray-600">{f.time}</span>
                </div>
                <div className="font-semibold text-indigo-600">{f.price}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
