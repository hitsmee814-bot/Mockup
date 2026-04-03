"use client"

import { ChatWindow } from "./ChatWindow"


export function SmartAI() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <ChatWindow />
      </div>
    </div>
  )
}
