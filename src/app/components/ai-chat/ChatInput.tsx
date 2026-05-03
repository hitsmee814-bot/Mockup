"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled])

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
  }

  const hasText = value.trim().length > 0

  return (
    <div className="shrink-0 border-t border-border bg-card px-2 sm:px-3 py-2">
      <motion.div
        className="flex items-center gap-2 px-2 py-1.5 transition-colors"
        animate={{
          borderColor: focused ? "hsl(var(--primary))" : "hsl(var(--border))",
          boxShadow: focused
            ? "0 0 0 3px hsl(var(--primary) / 0.1)"
            : "0 0 0 0px transparent",
        }}
        transition={{ duration: 0.2 }}
      >
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSubmit()
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask about your dream trip..."
          disabled={disabled}
          className="flex-1 text-[13px]"
        />

        <AnimatePresence mode="wait">
          {disabled ? (
            <motion.div
              key="loading"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              className="shrink-0 size-8 rounded-lg flex items-center justify-center bg-primary/20 text-primary"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="size-3.5" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.button
              key="send"
              onClick={handleSubmit}
              disabled={!hasText}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={hasText ? { scale: 1.1 } : {}}
              whileTap={hasText ? { scale: 0.85 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="shrink-0 size-8 rounded-lg flex items-center justify-center bg-primary text-primary-foreground cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-sm disabled:shadow-none"
            >
              <motion.div
                animate={hasText ? { x: [0, 2, 0] } : {}}
                transition={{
                  duration: 0.6,
                  repeat: hasText ? Infinity : 0,
                  repeatDelay: 1.5,
                }}
              >
                <Send className="size-3.5" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}