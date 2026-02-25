"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { useRef } from "react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating?: number;
}

interface RowProps {
  items: Testimonial[];
  speed: number;
  direction: "left" | "right";
}

function ScrollingRow({ items, speed, direction }: RowProps) {
  const duplicated = [...items, ...items];
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const moveBy = (speed * delta) / 1000;

    if (direction === "left") {
      x.set(x.get() - moveBy);
    } else {
      x.set(x.get() + moveBy);
    }

    const container = containerRef.current;
    if (container) {
      const width = container.scrollWidth / 2;

      if (direction === "left" && Math.abs(x.get()) >= width) {
        x.set(0);
      }

      if (direction === "right" && x.get() >= 0) {
        x.set(-width);
      }
    }
  });

  return (
    <div
      className="w-[1000px] max-w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        paddingBottom: "3px",
      }}
    >
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-6"
      >
        {duplicated.map((item, i) => (
          <div
            key={i}
            className="w-72 p-6 bg-white rounded-2xl shadow-lg flex-shrink-0 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{item.text}</p>

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  className={`w-4 h-4 ${idx < (item.rating ?? 5)
                    ? "text-yellow-400"
                    : "text-gray-300"
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.037 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.958z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsCarousel() {
  const testimonials: Testimonial[] = Array.from(
    { length: 10 },
    (_, i) => ({
      name: `Customer ${i + 1}`,
      role: "Product Manager",
      text:
        "This product completely transformed our workflow and improved team efficiency.",
      rating: Math.floor(Math.random() * 2) + 4,
    })
  );

  return (
    <section id="testimonials">
      <div className="flex flex-col items-center gap-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 mt-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E40C7]"
          >
            Hear From Our Travellers
          </h2>

          <p className="mt-5 text-[#306F7D] max-w-2xl mx-auto text-lg">
            Discover the experiences and stories of our travellers who explored the world with us. Their journeys inspire, delight, and showcase the memories we help create.
          </p>
        </motion.div>

        <ScrollingRow
          items={testimonials}
          speed={80}
          direction="left"
        />

        <ScrollingRow
          items={testimonials}
          speed={80}
          direction="right"
        />
      </div>
    </section>

  );
}