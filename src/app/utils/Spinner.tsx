"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center h-full w-full", className)}>
      <Loader2 className="animate-spin h-6 w-6 text-[#3FB8FF]" />
    </div>
  )
}