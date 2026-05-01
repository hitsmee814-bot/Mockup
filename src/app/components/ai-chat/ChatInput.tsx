"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

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
    if (inputRef.current) inputRef.current.style.height = "auto"
  }

  return (
    <div className="shrink-0 border-t border-border bg-card px-2 sm:px-3 py-2">
      <div className="flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
          placeholder="Ask about your dream trip..."
          rows={1}
          disabled={disabled}
          className="w-full min-w-0 flex-1 resize-none rounded-xl border border-border px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50"
          style={{ maxHeight: 80 }}
          onInput={e => {
            const el = e.target as HTMLTextAreaElement
            el.style.height = "auto"
            el.style.height = Math.min(el.scrollHeight, 80) + "px"
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className="shrink-0 size-9 rounded-xl flex items-center justify-center bg-primary text-primary-foreground cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
