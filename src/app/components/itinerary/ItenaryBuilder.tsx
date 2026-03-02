"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ItinerarySidebar } from "./Sidebar/ItinerarySideBar"
import Packages from "../packages/Packages"
import Flights from "../flights/Flights"
import { useEffect, useRef, useState } from "react"
import { GlobalLoader } from "@/app/utils/GlobalSpinner"

export default function ItenaryBuilder() {
  const pathname = usePathname()

  const normalizedPath = pathname.replace(/\/$/, "")
  let Content: React.ReactNode = null

  if (
    normalizedPath === "/itinerary" ||
    normalizedPath === "/itinerary/packages"
  )
    Content = <Packages />
  else if (normalizedPath === "/itinerary/flights")
    Content = <Flights />

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <ItinerarySidebar />

        <SidebarInset>
          <main className="p-8 bg-gray-50 min-h-screen">
            {Content}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}