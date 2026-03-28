"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { motion } from "framer-motion"

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled])

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-gray-100 bg-white px-4 py-3">
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <textarea
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me about your dream trip..."
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3FB8FF33] focus:border-[#3FB8FF] transition-all disabled:opacity-50"
          style={{ maxHeight: 120 }}
          onInput={e => {
            const el = e.target as HTMLTextAreaElement
            el.style.height = "auto"
            el.style.height = Math.min(el.scrollHeight, 120) + "px"
          }}
        />
        <motion.button
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className="shrink-0 size-10 rounded-xl flex items-center justify-center text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          style={{ background: "#3FB8FF" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send className="size-4" />
        </motion.button>
      </div>
    </div>
  )
}
