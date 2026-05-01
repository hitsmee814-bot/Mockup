"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Loader2 } from "lucide-react"

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled])

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
    if (inputRef.current) inputRef.current.style.height = "auto"
  }

  const hasText = value.trim().length > 0

  return (
    <div className="shrink-0 border-t border-border bg-card px-2 sm:px-3 py-2">
      <motion.div
        className="flex items-end gap-2 rounded-xl border px-2 py-1.5 transition-colors"
        animate={{
          borderColor: focused ? "hsl(var(--primary))" : "hsl(var(--border))",
          boxShadow: focused ? "0 0 0 3px hsl(var(--primary) / 0.1)" : "0 0 0 0px transparent",
        }}
        transition={{ duration: 0.2 }}
      >
        <textarea
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask about your dream trip..."
          rows={1}
          disabled={disabled}
          className="w-full min-w-0 flex-1 resize-none bg-white px-2 py-1.5 text-[13px] text-foreground  focus:outline-none disabled:opacity-50"
          style={{ maxHeight: 80 }}
          onInput={e => {
            const el = e.target as HTMLTextAreaElement
            el.style.height = "auto"
            el.style.height = Math.min(el.scrollHeight, 80) + "px"
          }}
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
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
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
              <motion.div animate={hasText ? { x: [0, 2, 0] } : {}} transition={{ duration: 0.6, repeat: hasText ? Infinity : 0, repeatDelay: 1.5 }}>
                <Send className="size-3.5" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
