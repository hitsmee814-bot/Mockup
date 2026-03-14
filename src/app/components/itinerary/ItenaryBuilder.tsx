"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ItinerarySidebar } from "./Sidebar/ItinerarySideBar"

import { Suspense, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

import Hotels from "../hotels/hotels"
import Cabs from "../cabs/Cabs"
import AISmartBot from "../ai-smart-bot/AISmartBot"
import { Flight } from "../flight-booking/flight"
import { Header } from "./Header"
import { Packages } from "../packages/Packages"

export default function ItenaryBuilder() {

    const pathname = usePathname()

    const [activeTab, setActiveTab] = useState("packages")

    // ✅ sync tab with route
    useEffect(() => {
        if (pathname.includes("/packages")) setActiveTab("packages")
        else if (pathname.includes("/flights")) setActiveTab("flights")
        else if (pathname.includes("/hotels")) setActiveTab("hotels")
        else if (pathname.includes("/cabs")) setActiveTab("cabs")
        else if (pathname.includes("/ai")) setActiveTab("ai")
    }, [pathname])

    const headerRef = useRef<HTMLElement | null>(null)
    const [headerHeight, setHeaderHeight] = useState(0)

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight)
        }
    }, [])

    const tabs: any = {
        packages: <Packages />,
        flights: (
            <Suspense fallback={<div className="p-8">Loading flights...</div>}>
                <Flight />
            </Suspense>
        ),
        hotels: <Hotels />,
        cabs: <Cabs />,
        ai: <AISmartBot />
    }

    const Content = tabs[activeTab] ?? <Packages />

    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex flex-col h-screen w-full">

                <Header ref={headerRef} />

                <div
                    className="flex flex-1 overflow-hidden"
                    style={{ marginTop: headerHeight }}
                >
                    <ItinerarySidebar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <SidebarInset className="flex flex-col flex-1">
                        <main className="flex-1 overflow-y-auto bg-gray-50">
                            {Content}
                        </main>
                    </SidebarInset>

                </div>
            </div>
        </SidebarProvider>
    )
}