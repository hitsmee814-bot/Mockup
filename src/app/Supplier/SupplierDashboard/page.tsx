"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SupplierSummaryCards, SupplierPerformanceChart } from "@/app/components/Supplier/SupplierDashboard"
import { SupplierBidSuccessRate } from "@/app/components/Supplier/SupplierDashboard"
export default function SupplierDashboardPage() {
  const router = useRouter()
  const { logout } = useAuth()
  const sessionHandled = useRef(false)
  const [checkingSession, setCheckingSession] = useState(true)

 useEffect(() => {
const handleSessionExpired = () => {
  if (sessionHandled.current) {
    return
  }

  sessionHandled.current = true

  logout()

  toast.error("Your session has expired. Please log in again.", {
    position: "top-right",
    duration: 3000,
  })

  router.replace("/auth")
}
  const token = localStorage.getItem("access_token")
  

if (!token) {
  handleSessionExpired()
  return
}
setCheckingSession(false)
  window.addEventListener("session-expired", handleSessionExpired)

  return () => {
    window.removeEventListener("session-expired", handleSessionExpired)
  }
},  [router, logout])
if (checkingSession) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Checking your session...
      </p>
    </div>
  )
}
  return (
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Welcome back — here&apos;s your overview for today.</p>
      </motion.div>

      <SupplierSummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
  <div className="xl:col-span-2">
    <SupplierPerformanceChart />
  </div>

  <SupplierBidSuccessRate />
</div>      
      
    </div>
  )
}
