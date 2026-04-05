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

import { Package, Plane, Hotel, Car, Sparkles, CalendarCheck, CreditCard, User, LogOut } from "lucide-react"
import { useAuth } from "@/app/context/AuthContext"
import { useState } from "react"
import { GlobalLoader } from "@/app/utils/GlobalSpinner"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

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
    const { logout } = useAuth()
    const [showLoader, setShowLoader] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    return (
        <>

            <GlobalLoader
                open={showLoader}
                duration={2000}
                loadingText="Logging you out..."
                successText="Logged out successfully"
                onComplete={() => {
                    logout()
                    router.replace("/")
                }}
            />
            <Sidebar
                collapsible="icon"
                className="bg-white border-r top-20 bottom-0 flex flex-col h-[calc(100vh-5rem)]"
            >
                <SidebarContent className="bg-white flex-1 overflow-y-auto">        {navigation.map((group) => (
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

${isActive
                                                            ? "bg-[#FBAB18] text-white"
                                                            : "text-[#3FB8FF] hover:bg-[#3FB8FF15]"
                                                        }
`}
                                                >
                                                    <Icon
                                                        className={`h-5 w-5 ${isActive
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

                <SidebarFooter className="border-t border-[#3FB8FF20] bg-white">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Logout">
                                <button
                                    onClick={() => setOpenDialog(true)}
                                    className="flex items-center gap-3 p-2 rounded-md transition text-red-500 hover:bg-red-500/10 w-full"
                                >
                                    <LogOut className="h-5 w-5" />

                                    <span className="group-data-[collapsible=icon]:hidden">
                                        Logout
                                    </span>
                                </button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to log out?
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>

      <AlertDialogAction
        onClick={() => {
          setOpenDialog(false)
          setShowLoader(true)
        }}
        className="bg-red-500 hover:bg-red-600"
      >
        Logout
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        </>
    )
}