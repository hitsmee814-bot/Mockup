"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type GlobalLoaderProps = {
  open: boolean
  onComplete?: () => void

  duration?: number

  interval?: number

  showProgress?: boolean

  loadingText?: string

  successText?: string

  successIcon?: React.ReactNode

  className?: string
}

export function GlobalLoader({
  open,
  onComplete,
  duration = 3000,
  interval = 16,
  showProgress = true,
  loadingText = "Please wait...",
  successText = "Completed successfully.",
  successIcon,
  className,
}: GlobalLoaderProps) {
  const [progress, setProgress] = React.useState(0)
  const [success, setSuccess] = React.useState(false)

  React.useEffect(() => {
    if (!open) {
      setProgress(0)
      setSuccess(false)
      return
    }

    const start = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const percentage = Math.min((elapsed / duration) * 100, 100)

      setProgress(percentage)

      if (percentage >= 100) {
        clearInterval(timer)
        setSuccess(true)

        setTimeout(() => {
          onComplete?.()
        }, 800)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [open, duration, interval, onComplete])

  if (!open) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm",
        className
      )}
    >
      {!success && (
        <>
          {showProgress && (
            <Progress value={progress} max={100} className="w-72 h-2" />
          )}

          {!showProgress && (
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
          )}

          <p className="text-lg font-medium text-foreground">
            {loadingText}
          </p>
        </>
      )}

      {success && (
        <>
          {successIcon ?? (
            <Check className="h-10 w-10 text-green-500" />
          )}
          <p className="text-lg font-medium text-foreground">
            {successText}
          </p>
        </>
      )}
    </div>
  )
}