"use client"

import AgentSignup from "@/app/components/signup/AgentSignup"
import { AuthGuard } from "@/app/guards/AuthGuard"
import type { JSX } from "react"

export default function Page(): JSX.Element {
  return (
    <AuthGuard>
      <AgentSignup />
    </AuthGuard>
  )
}