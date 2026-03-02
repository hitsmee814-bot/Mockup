"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "destructive" | "outline" | "ghost"

interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const baseStyles =
  "relative inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold overflow-hidden transition-all duration-300 focus:outline-none"

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#3FB8FF] text-white border border-[#3FB8FF] hover:shadow-lg hover:shadow-[#3FB8FF]/40",

  secondary:
    "bg-[#FBAB18] text-white hover:shadow-lg hover:shadow-[#FBAB18]/40 hover:border-none",

  destructive:
    "bg-[#C7332A] text-white border border-[#C7332A] hover:shadow-lg hover:shadow-[#C7332A]/40",

  outline:
    "bg-transparent text-[#3FB8FF] border border-[#3FB8FF] hover:bg-[#3FB8FF] hover:text-white",

  ghost:
    "bg-transparent text-[#1B120B] hover:bg-[#CAD8FF]/40",
}

export const PremiumButton = React.forwardRef<
  HTMLButtonElement,
  PremiumButtonProps
>(
  (
    {
      className,
      variant = "primary",
      children,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false)

    return (
      <button
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          baseStyles,
          variantStyles[variant],
          "group gap-2",
          className
        )}
        {...props}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: hovered ? 4 : 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
          }}
          className="absolute bottom-0 left-1/2 w-40 h-40 -translate-x-1/2 translate-y-1/2 bg-white rounded-full z-0 pointer-events-none"
        />

        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
          {icon && iconPosition === "left" && (
            <span className="flex items-center">{icon}</span>
          )}

          {children}

          {icon && iconPosition === "right" && (
            <span className="flex items-center">{icon}</span>
          )}
        </span>
      </button>
    )
  }
)

PremiumButton.displayName = "PremiumButton"