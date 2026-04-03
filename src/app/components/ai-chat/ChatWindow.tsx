"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChatMessage as ChatMessageType, Suggestion, QuickReply } from "./types"
import { welcomeMessage, findResponse, fallbackResponse } from "./data"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { ContextPanel } from "./ContextPanel"
import { MiniSuggestions } from "./MiniSuggestions"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, RotateCcw, Compass, PanelRightClose, X, Cloud, Calendar, Wallet, MapPin, Plane, Heart, Mountain, Utensils } from "lucide-react"

const quickLinks = [
  { label: "Weather", value: "What's the best weather for travel?", icon: Cloud, color: "#3FB8FF" },
  { label: "Best Time", value: "When is the best time to travel?", icon: Calendar, color: "#8b5cf6" },
  { label: "Budget", value: "set budget", icon: Wallet, color: "#FBAB18" },
  { label: "Locations", value: "suggest destination", icon: MapPin, color: "#22c55e" },
  { label: "Flights", value: "international trip", icon: Plane, color: "#ef4444" },
  { label: "Honeymoon", value: "honeymoon", icon: Heart, color: "#ec4899" },
  { label: "Adventure", value: "mountain trip", icon: Mountain, color: "#f97316" },
  { label: "Food & Stay", value: "What about food and hotels?", icon: Utensils, color: "#14b8a6" },
]

let msgCounter = 1
function nextId() { return `msg-${Date.now()}-${msgCounter++}` }

export interface SuggestionGroup {
  id: string
  label: string
  query: string
  suggestions: Suggestion[]
}

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([welcomeMessage])
  const [isTyping, setIsTyping] = useState(false)
  const [groups, setGroups] = useState<SuggestionGroup[]>([])
  const [activeReplies, setActiveReplies] = useState<QuickReply[]>(welcomeMessage.quickReplies ?? [])
  // Desktop: side panel open by default
  const [desktopPanel, setDesktopPanel] = useState(true)
  // Mobile: bottom sheet closed by default
  const [mobileSheet, setMobileSheet] = useState(false)
  const [miniDismissed, setMiniDismissed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, isTyping, scrollToBottom])
  useEffect(() => { setMiniDismissed(false) }, [groups.length])

  const latestGroup = groups.length > 0 ? groups[groups.length - 1] : null

  function addBotResponse(input: string) {
    setIsTyping(true)
    setMessages(prev => [...prev, { id: "typing", role: "bot", text: "", timestamp: new Date(), typing: true }])
    setTimeout(() => {
      const flow = findResponse(input)
      const text = flow?.response ?? fallbackResponse.response
      const replies = flow?.quickReplies ?? fallbackResponse.quickReplies ?? []
      setMessages(prev => [...prev.filter(m => m.id !== "typing"), { id: nextId(), role: "bot", text, timestamp: new Date() }])
      setActiveReplies(replies)
      setIsTyping(false)
      if (flow?.suggestions?.length) {
        const groupLabel = flow.suggestions[0].type === "package" ? "Recommended Packages"
          : flow.suggestions[0].type === "location" ? "Trending Destinations"
          : flow.suggestions[0].type === "date" ? "Best Travel Windows" : "Budget Options"
        setGroups(prev => [...prev, { id: nextId(), label: groupLabel, query: input, suggestions: flow.suggestions! }])
      }
    }, 500 + Math.random() * 700)
  }

  function handleSend(text: string) {
    setMessages(prev => [...prev, { id: nextId(), role: "user", text, timestamp: new Date() }])
    setActiveReplies([])
    addBotResponse(text)
  }

  function handleSuggestionSelect(s: Suggestion) { handleSend(`Tell me more about ${s.title}`) }

  function handleReset() {
    const fresh = { ...welcomeMessage, id: nextId(), timestamp: new Date() }
    setMessages([fresh]); setGroups([]); setActiveReplies(fresh.quickReplies ?? [])
    setIsTyping(false); setMiniDismissed(false)
  }

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* ─── CHAT ─── */}
      <div className="flex flex-col w-full min-w-0 bg-card">
        {/* Header */}
        <div className="shrink-0 border-b border-border px-3 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="size-7 sm:size-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-primary to-chart-3">
              <Sparkles className="size-3 sm:size-3.5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-foreground truncate">AI Travel Planner</p>
              <div className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-green-400" />
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={handleReset} className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-muted-foreground hover:text-primary cursor-pointer px-2 py-1 rounded-lg hover:bg-muted transition-colors">
              <RotateCcw className="size-3" />
              <span className="hidden sm:inline">New</span>
            </button>
            {/* Desktop: toggle side panel */}
            <button
              onClick={() => setDesktopPanel(o => !o)}
              className="hidden lg:flex p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted cursor-pointer transition-colors"
            >
              {desktopPanel ? <PanelRightClose className="size-4" /> : <Compass className="size-4" />}
            </button>
            {/* Mobile: open bottom sheet */}
            <button
              onClick={() => setMobileSheet(true)}
              className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted cursor-pointer transition-colors"
            >
              <Compass className="size-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {!isTyping && activeReplies.length > 0 && (
            <div className="flex flex-wrap gap-1 pl-7 sm:pl-8">
              {activeReplies.map((r) => (
                <button
                  key={r.value}
                  onClick={() => handleSend(r.value)}
                  className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:py-1 rounded-full border border-primary/20 bg-primary/5 text-primary cursor-pointer hover:bg-primary/10 transition-colors"
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile only: inline mini suggestions */}
        <div className="lg:hidden">
          {!miniDismissed && (
            <MiniSuggestions
              group={latestGroup}
              onSelect={handleSuggestionSelect}
              onExpand={() => setMobileSheet(true)}
              onDismiss={() => setMiniDismissed(true)}
            />
          )}
        </div>

        {/* Quick explore strip */}
        <div className="shrink-0 border-t border-border px-2 py-1.5 overflow-x-auto no-scrollbar">
          <div className="flex gap-1">
            {quickLinks.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.label}
                  onClick={() => handleSend(t.value)}
                  className="shrink-0 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold px-2 py-1 rounded-full border cursor-pointer transition-all hover:shadow-sm"
                  style={{ background: t.color + "0A", color: t.color, borderColor: t.color + "25" }}
                >
                  <Icon className="size-2.5" />
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>

      {/* ─── DESKTOP: Side panel (lg+ only, CSS hidden below) ─── */}
      <div className={`hidden lg:block shrink-0 border-l border-border transition-all duration-300 overflow-hidden ${desktopPanel ? "w-[420px]" : "w-0"}`}>
        <div className="w-[420px] h-full">
          <ContextPanel
            groups={groups}
            activeReplies={activeReplies}
            onTopicSelect={handleSend}
            onQuickReply={handleSend}
            onSuggestionSelect={handleSuggestionSelect}
          />
        </div>
      </div>

      {/* ─── MOBILE: Bottom sheet overlay (below lg only) ─── */}
      <AnimatePresence>
        {mobileSheet && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col">
            <div className="flex-1 bg-black/40" onClick={() => setMobileSheet(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="h-[80vh] rounded-t-2xl overflow-hidden bg-background"
            >
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
                <p className="text-sm font-bold text-foreground">Explore & Discover</p>
                <button onClick={() => setMobileSheet(false)} className="p-1 rounded-lg hover:bg-muted cursor-pointer text-muted-foreground">
                  <X className="size-4" />
                </button>
              </div>
              <div className="h-[calc(80vh-48px)] overflow-hidden">
                <ContextPanel
                  groups={groups}
                  activeReplies={activeReplies}
                  onTopicSelect={(v) => { handleSend(v); setMobileSheet(false) }}
                  onQuickReply={(v) => { handleSend(v); setMobileSheet(false) }}
                  onSuggestionSelect={(s) => { handleSuggestionSelect(s); setMobileSheet(false) }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
