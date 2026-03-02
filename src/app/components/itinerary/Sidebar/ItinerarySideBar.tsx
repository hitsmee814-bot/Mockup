"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeft, PanelLeftClose } from "lucide-react"
import { Package, Plane, Hotel, Car, Sparkles } from "lucide-react"
import logoPrimary from "../../../assets/images/final logo Bonhomiee.png"
import logoSecondary from "../../../assets/images/logoPrimary.png"

const navigation = [
    {
        groupLabel: "",
        items: [
            { title: "Packages", href: "/itinerary/packages/", icon: Package },
            { title: "Flights", href: "/itinerary/flights/", icon: Plane },
            { title: "Hotels", href: "/itinerary/hotels/", icon: Hotel },
            { title: "Cabs", href: "/itinerary/cabs/", icon: Car },
            { title: "AI", href: "/itinerary/ai/", icon: Sparkles },
        ],
    },
]

export function ItinerarySidebar() {
    const pathname = usePathname()
    const { toggleSidebar, state } = useSidebar()
    const router = useRouter()
    return (
        <Sidebar collapsible="icon" className="border-r" style={{ backgroundColor: "#1B120B" }}>

            <SidebarHeader className="p-4">
                <div className="relative flex items-center gap-2 font-semibold text-lg">

                    {state === "expanded" ? (
                        <>
                            <button
                                onClick={toggleSidebar}
                                className="flex items-center justify-center p-1 rounded transition hover:bg-[#3FB8FF]/20"
                            >
                                <PanelLeftClose className="h-5 w-5 text-[#3FB8FF]" />
                            </button>


                            <Link href="/">
                                <Image
                                    src={logoPrimary}
                                    alt="Logo"
                                    width={140}
                                    height={40}
                                    style={{ objectFit: "contain", cursor: "pointer" }}
                                />
                            </Link>
                        </>
                    ) : (
                        <div
                            className="relative flex items-center justify-center w-8 h-8 cursor-pointer"
                            onClick={toggleSidebar}
                        >
                            <Image
                                src={logoSecondary}
                                alt="Collapsed Logo"
                                width={20}
                                height={20}
                                className="object-contain"
                            />
                        </div>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                {navigation.map((group) => (
                    <SidebarGroup key={group.groupLabel}>
                        {group.groupLabel && (
                            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[#FBAB18] uppercase text-xs font-semibold tracking-wide">
                                {group.groupLabel}
                            </SidebarGroupLabel>
                        )}

                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const Icon = item.icon
                                    const isActive = pathname.includes(item.href)

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                                                <button
                                                    onClick={() => {
                                                        if (state === "expanded") {
                                                            toggleSidebar()

                                                            setTimeout(() => {
                                                                router.push(item.href)
                                                            }, 250) // match your sidebar animation duration
                                                        } else {
                                                            router.push(item.href)
                                                        }
                                                    }}
                                                    className={`flex items-center gap-2 p-2 rounded transition
    ${isActive
                                                            ? "bg-[#3FB8FF] text-[#FFFFFF]"
                                                            : "text-black hover:text-white hover:[&>svg]:text-white"
                                                        }`}
                                                >
                                                    <Icon className={`h-4 w-4 ${isActive ? "text-[#FFFFFF]" : "text-[#3FB8FF]"}`} />
                                                    <span className={`group-data-[collapsible=icon]:hidden ${isActive ? "text-white" : ""}`}>
                                                        {item.title}
                                                    </span>
                                                </button>

                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="p-4">
                <div
                    className="text-xs group-data-[collapsible=icon]:hidden"
                    style={{ color: "#000000" }}
                >
                    Smart Travel Builder
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}