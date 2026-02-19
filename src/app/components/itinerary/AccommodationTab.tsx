import { motion } from "framer-motion";

export default function AccommodationTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-600">
      <div className="text-5xl mb-2">🏨</div>
      Explore curated stays tailored to your itinerary and budget.
    </motion.div>
  );
}
