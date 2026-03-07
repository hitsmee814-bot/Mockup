"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ItinerarySidebar } from "./Sidebar/ItinerarySideBar"
import Packages from "../packages/Packages"
import Flights from "../flights/Flights"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { RightSideLoader } from "@/app/utils/RightSideSpinner"
import Hotels from "../hotels/hotels"
import Cabs from "../cabs/Cabs"
import AISmartBot from "../ai-smart-bot/AISmartBot"

export default function ItenaryBuilder() {

  const pathname = usePathname()

  const getTabFromUrl = () => {
    const tab = pathname.split("/")[2]
    return tab || "packages"
  }

  const [activeTab, setActiveTab] = useState(getTabFromUrl())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setActiveTab(getTabFromUrl())
  }, [pathname])

  const changeTab = (tab: string) => {
    setLoading(true)

    setTimeout(() => {
      setActiveTab(tab)
      setLoading(false)
    }, 400)
  }

  let Content: React.ReactNode = null

  if (activeTab === "packages") Content = <Packages />
  if (activeTab === "flights") Content = <Flights />
  if (activeTab === "hotels") Content = <Hotels />
  if (activeTab === "cabs") Content = <Cabs />
  if (activeTab === "ai") Content = <AISmartBot />

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <ItinerarySidebar activeTab={activeTab} changeTab={changeTab} />

        <SidebarInset>
          <main className="relative p-8 bg-gray-50 min-h-screen">
            <RightSideLoader loading={loading} />
            {Content}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}