"use client"

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
} from "@/components/ui/sidebar"

import { useSidebar } from "@/components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"

import { Package, Plane, Hotel, Car, Sparkles, CalendarCheck, CreditCard, User } from "lucide-react"

const navigation = [
  {
    groupLabel: "",
    items: [
      { title: "Packages", key: "packages", icon: Package },
      { title: "Flights", key: "flights", icon: Plane },
      { title: "Hotels", key: "hotels", icon: Hotel },
      { title: "Cabs", key: "cabs", icon: Car },
      { title: "AI", key: "ai", icon: Sparkles },
      { title: "Bookings", key: "bookings", icon: CalendarCheck },
      { title: "Payments", key: "payments", icon: CreditCard },
      { title: "Profile", key: "profile", icon: User },      
    ],
  },
]

export function ItinerarySidebar() {
  const { toggleSidebar, state } = useSidebar()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      className="bg-white border-r top-20 bottom-0"
    >
      <SidebarContent className="bg-white">
        {navigation.map((group) => (
          <SidebarGroup key={group.groupLabel}>
            {group.groupLabel && (
              <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden uppercase text-xs font-semibold tracking-wide text-[#3FB8FF]">
                {group.groupLabel}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon

                  const isActive = pathname.startsWith(`/itinerary/${item.key}`)

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <button
                          onClick={() => {
                            router.push(`/itinerary/${item.key}`)

                            if (state === "expanded") {
                                toggleSidebar()
                            }
                          }}
                          className={`
flex items-center gap-3 p-2 rounded-md transition

${
  isActive
    ? "bg-[#FBAB18] text-white"
    : "text-[#3FB8FF] hover:bg-[#3FB8FF15]"
}
`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              isActive
                                ? "text-white"
                                : "text-[#3FB8FF]"
                            }`}
                          />

                          <span className="group-data-[collapsible=icon]:hidden">
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

      <SidebarFooter className="p-4 h-16 lg:h-[8rem] border-t border-[#3FB8FF20] bg-white">
        <div className="text-xs text-[#3FB8FF] group-data-[collapsible=icon]:hidden">
          Smart Travel Builder
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}