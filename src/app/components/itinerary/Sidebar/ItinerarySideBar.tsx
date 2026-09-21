"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    LayoutDashboard,
    MessageSquare,
    Package,
    Plane,
    Hotel,
    Car,
    Sparkles,
    LogOut,
    ChevronDown,
    User,
} from "lucide-react"
import { useAuth } from "@/app/context/AuthContext"
import { GlobalLoader } from "@/app/utils/GlobalSpinner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const navigation = [
    {
        label: "Overview",
        icon: LayoutDashboard,
        requiresAgent: true,
        items: [
            {
                title: "Dashboard",
                href: "/overview/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Enquiries",
                href: "/overview/enquiries",
                icon: MessageSquare,
            },
        ],
    },
    {
        label: "Itinerary Builder",
        icon: Package,
        items: [
            {
                title: "Flights",
                href: "/itinerary/flights",
                icon: Plane,
            },
            {
                title: "Packages",
                href: "/itinerary/packages",
                icon: Package,
            },
            {
                title: "Hotels",
                href: "/itinerary/hotels",
                icon: Hotel,
            },
            {
                title: "Cabs",
                href: "/itinerary/cabs",
                icon: Car,
            },
            {
                title: "Smart AI",
                href: "/itinerary/ai",
                icon: Sparkles,
            },
        ],
    },
]

export function ItinerarySidebar() {
    const { state } = useSidebar()
    const router = useRouter()
    const pathname = usePathname()
    const { isLoggedIn, logout } = useAuth()

    const [showLoader, setShowLoader] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [isAgent, setIsAgent] = useState(false)
    const [openGroups, setOpenGroups] = useState<string[]>(["Overview"])

    useEffect(() => {
        const loggedInType = localStorage.getItem("loggedInType")
        const loggedIn = localStorage.getItem("isLoggedIn")

        if (loggedInType === "agent" && loggedIn === "true") {
            setIsAgent(true)
        }
    }, [])

    useEffect(() => {
        const activeGroup = navigation.find((group) =>
            group.items.some((item) => pathname.startsWith(item.href))
        )

        if (activeGroup && !openGroups.includes(activeGroup.label)) {
            setOpenGroups((prev) => [...prev, activeGroup.label])
        }
    }, [pathname])

    const toggleGroup = (label: string) => {
        setOpenGroups((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        )
    }

    const isProfileActive = pathname.startsWith("/itinerary/profile")

    const filteredNavigation = navigation.filter((group) => {
        if (group.requiresAgent) return isAgent
        return true
    })

    const isGroupActive = (group: (typeof navigation)[number]) => {
        return group.items.some((item) => pathname.startsWith(item.href))
    }

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
                className="mt-[4rem] h-[calc(100vh-4rem)] overflow-hidden border-r border-slate-200 bg-white"
            >
                <SidebarContent className="overflow-y-auto overflow-x-hidden">
                    {/* EXPANDED MODE */}
                    <div className="flex-1 group-data-[collapsible=icon]:hidden">
                        {filteredNavigation.map((group) => {
                            const GroupIcon = group.icon
                            const isOpen = openGroups.includes(group.label)
                            const isActive = isGroupActive(group)

                            return (
                                <SidebarGroup key={group.label} className="px-2 py-2">
                                    <SidebarGroupLabel
                                        onClick={() => toggleGroup(group.label)}
                                        className={`flex h-10 cursor-pointer items-center justify-between rounded-lg px-3 transition-colors ${
                                            isActive
                                                ? "text-[#0E40C7]"
                                                : "text-slate-600 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7]"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <GroupIcon className="h-5 w-5 shrink-0" />

                                            <span className="text-sm font-medium">
                                                {group.label}
                                            </span>
                                        </div>

                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </SidebarGroupLabel>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <SidebarGroupContent>
                                                    <SidebarMenu className="mt-1 pl-5">
                                                        {group.items.map((item) => {
                                                            const Icon = item.icon
                                                            const isActive =
                                                                pathname.startsWith(item.href)

                                                            return (
                                                                <SidebarMenuItem key={item.title}>
                                                                    <SidebarMenuButton
                                                                        asChild
                                                                        tooltip={item.title}
                                                                    >
                                                                        <button
                                                                            onClick={() =>
                                                                                router.push(item.href)
                                                                            }
                                                                            className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                                                                isActive
                                                                                    ? "bg-[#FBAB18]/10 text-[#0E40C7]"
                                                                                    : "text-slate-500 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7]"
                                                                            }`}
                                                                        >
                                                                            {isActive && (
                                                                                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#FBAB18]" />
                                                                            )}

                                                                            <Icon className="h-4.5 w-4.5 shrink-0" />

                                                                            <span>
                                                                                {item.title}
                                                                            </span>
                                                                        </button>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                            )
                                                        })}
                                                    </SidebarMenu>
                                                </SidebarGroupContent>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </SidebarGroup>
                            )
                        })}
                    </div>

                    {/* COLLAPSED MODE */}
                    <div className="hidden group-data-[collapsible=icon]:block">
                        <div className="flex flex-col gap-1 px-2 py-3">
                            {filteredNavigation.map((group) => {
                                const GroupIcon = group.icon
                                const isActive = isGroupActive(group)

                                return (
                                    <Popover key={group.label}>
                                        <PopoverTrigger asChild>
                                            <button
                                                className={`flex h-11 w-full items-center justify-center rounded-lg transition-colors ${
                                                    isActive
                                                        ? "bg-[#FBAB18]/10 text-[#0E40C7]"
                                                        : "text-slate-500 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7]"
                                                }`}
                                                aria-label={group.label}
                                            >
                                                <GroupIcon className="h-5 w-5" />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent
                                            side="right"
                                            align="start"
                                            sideOffset={8}
                                            className="w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
                                        >
                                            <div className="mb-2 px-2 py-1">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    {group.label}
                                                </p>
                                            </div>

                                            <div className="space-y-1">
                                                {group.items.map((item) => {
                                                    const Icon = item.icon
                                                    const isActive =
                                                        pathname.startsWith(item.href)

                                                    return (
                                                        <button
                                                            key={item.title}
                                                            onClick={() =>
                                                                router.push(item.href)
                                                            }
                                                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                                                                isActive
                                                                    ? "bg-[#FBAB18]/10 text-[#0E40C7]"
                                                                    : "text-slate-600 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7]"
                                                            }`}
                                                        >
                                                            <Icon className="h-4 w-4 shrink-0" />

                                                            <span className="truncate">
                                                                {item.title}
                                                            </span>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )
                            })}
                        </div>
                    </div>
                </SidebarContent>

                <SidebarFooter className="border-t border-slate-200 px-2 py-3">
                    <SidebarMenu>
                        {isLoggedIn && (
                            <>
                                {/* PROFILE */}
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip="Profile"
                                    >
                                        <button
                                            onClick={() =>
                                                router.push("/itinerary/profile")
                                            }
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                                                isProfileActive
                                                    ? "bg-[#FBAB18]/10 text-[#0E40C7]"
                                                    : "text-slate-500 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7]"
                                            }`}
                                        >
                                            <User className="h-5 w-5 shrink-0" />

                                            <span className="group-data-[collapsible=icon]:hidden">
                                                Profile
                                            </span>
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                {/* LOGOUT */}
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip="Logout"
                                    >
                                        <button
                                            onClick={() => setOpenDialog(true)}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                        >
                                            <LogOut className="h-5 w-5 shrink-0" />

                                            <span className="group-data-[collapsible=icon]:hidden">
                                                Logout
                                            </span>
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )}
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            {/* LOGOUT DIALOG */}
            <AlertDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Confirm Logout
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Are you sure you want to log out?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>

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
