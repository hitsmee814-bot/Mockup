"use client";

import { TourPackage } from "./types";
import { Star, Clock, MapPin, ArrowUpRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TourImageView } from "./TourImageView";

interface PackageCardProps {
  pkg: TourPackage;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const router = useRouter();
  const { tour, availability, images } = pkg;
  const coverImage = images.find((i) => i.is_cover) || images[0];
  const availableSlots = availability.reduce((sum, a) => sum + a.available_slots, 0);
  const duration = `${tour.duration_nights}N/${tour.duration_days}D`;

  return (
    <motion.div
      onClick={() => router.push(`/itinerary/packages/${tour.id}`)}
      className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.06)" }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -8px rgba(63,184,255,0.18), 0 8px 16px -4px rgba(0,0,0,0.06)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative h-40 sm:h-52 bg-gray-100 overflow-hidden">
        <TourImageView
          imageUrl={coverImage?.image_url}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          fallbackSeed={`tour-${tour.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Slots badge */}
        {availableSlots > 0 && (
          <span className="absolute top-3 left-3 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-lg text-white" style={{ background: "#FBAB18" }}>
            {availableSlots} slots left
          </span>
        )}

        {/* Rating badge */}
        {tour.avg_rating > 0 && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            <Star className="size-3" style={{ fill: "#FBAB18", color: "#FBAB18" }} />
            {tour.avg_rating}
          </span>
        )}

        {/* Duration */}
        <span className="absolute bottom-3 left-3 flex items-center gap-1 text-white/90 text-[11px] font-medium">
          <Clock className="size-3" /> {duration}
        </span>

        {/* Hover arrow */}
        <div className="absolute bottom-3 right-3 size-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-lg" style={{ background: "#3FB8FF" }}>
          <ArrowUpRight className="size-3.5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-2.5">
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">{tour.destination}</span>
          <span className="text-gray-300 mx-1">•</span>
          <span className="truncate">From {tour.origin_city}</span>
        </div>
        <h3 className="font-bold text-sm leading-snug line-clamp-1 text-gray-800">{tour.title}</h3>
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <span className="flex items-center gap-1"><Users className="size-3" /> Max {tour.max_guests}</span>
          <span className="text-gray-300">•</span>
          <span>{new Date(tour.start_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-extrabold leading-tight" style={{ color: "#3FB8FF" }}>
              ₹{tour.base_price.toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400">per person</p>
          </div>
          <div className="text-right">
            {tour.total_reviews > 0 && (
              <p className="text-[10px] text-gray-400">{tour.total_reviews} reviews</p>
            )}
            {tour.avg_rating > 0 && (
              <div className="flex items-center gap-0.5 justify-end">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-2.5" style={{ fill: i < Math.round(tour.avg_rating) ? "#FBAB18" : "#e5e7eb", color: i < Math.round(tour.avg_rating) ? "#FBAB18" : "#e5e7eb" }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
