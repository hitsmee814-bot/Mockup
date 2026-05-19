"use client";

import { useState, useEffect } from "react";
import { X, MapPin, Calendar, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  destinations: string[];
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  destination: string | null;
  maxPrice: number;
  minDays: number;
  maxDays: number;
}

export const DEFAULT_FILTERS: FilterState = {
  destination: null,
  maxPrice: 200000,
  minDays: 1,
  maxDays: 30,
};

const DAYS_OPTIONS = ["1-3", "4-6", "7-9", "10+"];

const pill = (active: boolean) =>
  active
    ? { background: "#3FB8FF", color: "#fff", borderColor: "#3FB8FF" }
    : { background: "#f9fafb", color: "#6b7280", borderColor: "#e5e7eb" };

export function FilterDrawer({ open, onClose, destinations, onApply, currentFilters }: FilterDrawerProps) {
  const [dest, setDest] = useState<string | null>(currentFilters.destination);
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice);
  const [daysRange, setDaysRange] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setDest(currentFilters.destination);
      setMaxPrice(currentFilters.maxPrice);
      setDaysRange(null);
    }
  }, [open, currentFilters]);

  function parseDaysRange(range: string): { min: number; max: number } {
    if (range === "1-3") return { min: 1, max: 3 };
    if (range === "4-6") return { min: 4, max: 6 };
    if (range === "7-9") return { min: 7, max: 9 };
    return { min: 10, max: 30 };
  }

  function apply() {
    const days = daysRange ? parseDaysRange(daysRange) : { min: 1, max: 30 };
    onApply({ destination: dest, maxPrice, minDays: days.min, maxDays: days.max });
    onClose();
  }

  function reset() {
    onApply(DEFAULT_FILTERS);
    onClose();
  }

  const labelClass = "flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3";
  const pillClass = "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white border-l border-gray-100 z-50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <h2 className="font-extrabold text-base text-gray-800">Filters</h2>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-500">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-7">
              {/* Destination */}
              <div>
                <label className={labelClass}><MapPin className="size-3.5" style={{ color: "#3FB8FF" }} /> Destination</label>
                <div className="flex flex-wrap gap-2">
                  {destinations.map((d) => (
                    <button key={d} onClick={() => setDest((prev) => (prev === d ? null : d))} className={pillClass} style={pill(dest === d)}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className={labelClass}><DollarSign className="size-3.5" style={{ color: "#3FB8FF" }} /> Max Price (INR)</label>
                <input
                  type="range"
                  min={5000}
                  max={200000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: "#3FB8FF" }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹5,000</span>
                  <span className="font-bold" style={{ color: "#3FB8FF" }}>₹{maxPrice.toLocaleString()}</span>
                  <span>₹2,00,000</span>
                </div>
              </div>

              {/* Days */}
              <div>
                <label className={labelClass}><Calendar className="size-3.5" style={{ color: "#3FB8FF" }} /> Duration (Days)</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OPTIONS.map((d) => (
                    <button key={d} onClick={() => setDaysRange((prev) => (prev === d ? null : d))} className={pillClass} style={pill(daysRange === d)}>
                      {d} days
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 flex gap-3 shrink-0">
              <button onClick={reset} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                Reset All
              </button>
              <button onClick={apply} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer" style={{ background: "#3FB8FF" }}>
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
