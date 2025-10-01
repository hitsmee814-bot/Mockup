"use client";

import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Blob 1 */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{ top: "-100px", left: "-100px" }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute w-[28rem] h-[28rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 80, -100, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{ bottom: "-120px", right: "-120px" }}
      />

      {/* Blob 3 */}
      <motion.div
        className="absolute w-[22rem] h-[22rem] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{ top: "40%", left: "20%" }}
      />
    </div>
  );
}
