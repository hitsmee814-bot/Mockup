// "use client"

// import * as React from "react"
// import { motion } from "framer-motion"
// import { cn } from "@/lib/utils"

// type Variant = "primary" | "secondary" | "destructive" | "outline" | "ghost"

// interface PremiumButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: Variant
//   icon?: React.ReactNode
//   iconPosition?: "left" | "right"
// }

// const baseStyles =
//   "relative inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold overflow-hidden transition-all duration-300 focus:outline-none"

// const variantStyles: Record<Variant, string> = {
//   primary:
//     "bg-[#3FB8FF] text-white border border-[#3FB8FF] hover:shadow-lg hover:shadow-[#3FB8FF]/40",

//   secondary:
//     "bg-[#FBAB18] text-white hover:shadow-lg hover:shadow-[#FBAB18]/40 hover:border-none",

//   destructive:
//     "bg-[#C7332A] text-white border border-[#C7332A] hover:shadow-lg hover:shadow-[#C7332A]/40",

//   outline:
//     "bg-transparent text-[#3FB8FF] border border-[#3FB8FF] hover:bg-[#3FB8FF] hover:text-white",

//   ghost:
//     "bg-transparent text-[#1B120B] hover:bg-[#CAD8FF]/40",
// }

// export const PremiumButton = React.forwardRef<
//   HTMLButtonElement,
//   PremiumButtonProps
// >(
//   (
//     {
//       className,
//       variant = "primary",
//       children,
//       icon,
//       iconPosition = "left",
//       disabled,
//       ...props
//     },
//     ref
//   ) => {
//     const [hovered, setHovered] = React.useState(false)

//     return (
//       <button
//         ref={ref}
//         disabled={disabled}
//         onMouseEnter={() => !disabled && setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         className={cn(
//           baseStyles,
//           variantStyles[variant],
//           "group gap-2",
//           disabled &&
//             "opacity-50 cursor-not-allowed hover:shadow-none pointer-events-none",
//           className
//         )}
//         {...props}
//       >
//         {!disabled && (
//           <motion.span
//             initial={{ scale: 0 }}
//             animate={{ scale: hovered ? 4 : 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 120,
//               damping: 20,
//               mass: 0.8,
//             }}
//             className="absolute bottom-0 left-1/2 w-40 h-40 -translate-x-1/2 translate-y-1/2 bg-white rounded-full z-0 pointer-events-none"
//           />
//         )}

//         <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
//           {icon && iconPosition === "left" && (
//             <span className="flex items-center">{icon}</span>
//           )}

//           {children}

//           {icon && iconPosition === "right" && (
//             <span className="flex items-center">{icon}</span>
//           )}
//         </span>
//       </button>
//     )
//   }
// )

// PremiumButton.displayName = "PremiumButton"

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Variant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "info"
  | "teal"
  | "success"
  | "accent"
  | "pink"
  | "warning"
  
interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const baseStyles =
  "relative inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold overflow-hidden transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2"

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#3FB8FF] text-white hover:shadow-lg hover:-translate-y-[1px] hover:shadow-[#3FB8FF]/30 focus:ring-[#3FB8FF]/40",

  secondary:
    "bg-[#FBAB18] text-white hover:shadow-lg hover:-translate-y-[1px] hover:shadow-[#FBAB18]/30 focus:ring-[#FBAB18]/40",

  destructive:
    "bg-[#C7332A] text-white hover:shadow-lg hover:-translate-y-[1px] hover:shadow-[#C7332A]/30 focus:ring-[#C7332A]/40",

  outline:
    "bg-transparent text-[#3769F1] hover:bg-[#3769F1] hover:text-white hover:-translate-y-[1px] focus:ring-[#3769F1]/40",

  ghost:
    "bg-transparent text-white hover:bg-[#CAD8FF]/40 hover:-translate-y-[1px] focus:ring-[#CAD8FF]/40",


  info:
    "bg-[#3769F1] text-white hover:bg-[#0E40C7] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#3769F1]/30 focus:ring-[#3769F1]/40",


  teal:
    "bg-[#59C3C4] text-white hover:bg-[#479EA8] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#59C3C4]/30 focus:ring-[#59C3C4]/40",


  success:
    "bg-[#6DC872] text-white hover:bg-[#4EA45A] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#6DC872]/30 focus:ring-[#6DC872]/40",


  accent:
    "bg-[#6060E9] text-white hover:bg-[#453DBF] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#6060E9]/30 focus:ring-[#6060E9]/40",


  pink:
    "bg-[#EB6190] text-white hover:bg-[#A73775] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#EB6190]/30 focus:ring-[#EB6190]/40",


  warning:
    "bg-[#F6AF45] text-white hover:bg-[#E97B37] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#F6AF45]/30 focus:ring-[#F6AF45]/40",
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
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          "group gap-2",
          disabled &&
            "opacity-50 cursor-not-allowed hover:shadow-none hover:translate-y-0",
          className
        )}
        {...props}
      >
        {!disabled && (
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/20 blur-lg opacity-0 transition-all duration-500 group-hover:translate-x-[250%] group-hover:opacity-100" />
          </span>
        )}

        <span className="relative z-10 flex items-center gap-2">
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