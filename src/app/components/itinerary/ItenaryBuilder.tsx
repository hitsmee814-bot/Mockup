"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ItinerarySidebar } from "./Sidebar/ItinerarySideBar"

import { useRef, useState, useEffect } from "react"
import { Header } from "./Header"

export default function ItenaryBuilder({
    children,
}: {
    children: React.ReactNode
}) {

    //   const headerRef = useRef<HTMLElement | null>(null)
    //   const [headerHeight, setHeaderHeight] = useState(0)

    //   useEffect(() => {
    //     if (headerRef.current) {
    //       setHeaderHeight(headerRef.current.offsetHeight)
    //     }
    //   }, [])

    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex flex-col h-screen w-full">

                {/* HEADER */}
                <Header />

                {/* BODY */}
                <div className="flex flex-1 overflow-hidden">
                    <ItinerarySidebar />

                    <SidebarInset className="flex flex-col flex-1">
                        <main className="flex-1 overflow-y-auto bg-gray-50 p-[2rem]">
                            {children}
                        </main>
                    </SidebarInset>

                </div>
            </div>
        </SidebarProvider>
    )
}