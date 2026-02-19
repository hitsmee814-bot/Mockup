"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineChat,
  HiOutlineHome,
  HiOutlinePaperAirplane,
  HiOutlineTruck,
  HiArrowLeft,
} from "react-icons/hi";
import ItenaryChatTab from "./ItenaryChatTab";
import AccommodationTab from "./AccommodationTab";
import FlightsTab from "./FlightsTab";
import TransfersTab from "./TransfersTab";


export default function ItenaryBuilder({ onBack }: { onBack?: () => void }) {
  const [activeTab, setActiveTab] = useState("itenary");

  const tabs = [
    { key: "itenary", label: "Build Itinerary", icon: HiOutlineChat },
    { key: "accommodation", label: "Accommodations", icon: HiOutlineHome },
    { key: "flights", label: "Flights", icon: HiOutlinePaperAirplane },
    { key: "transfers", label: "Transfers", icon: HiOutlineTruck },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-2 py-10">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-[#00AFEF]"
        >
          <HiArrowLeft size={18} />
          Changed your mind?
        </button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-white rounded-xl border shadow-sm overflow-hidden"
      >
        <div className="flex border-b bg-gray-50">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium
                ${
                  activeTab === key
                    ? "text-[#00AFEF] border-b-2 border-[#00AFEF] bg-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === "itenary" && <ItenaryChatTab />}
            {activeTab === "accommodation" && <AccommodationTab />}
            {activeTab === "flights" && <FlightsTab />}
            {activeTab === "transfers" && <TransfersTab />}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
