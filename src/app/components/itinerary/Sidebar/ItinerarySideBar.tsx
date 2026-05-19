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

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"

import { useSidebar } from "@/components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"

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
import { useState, useEffect } from "react"
import { GlobalLoader } from "@/app/utils/GlobalSpinner"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { motion, AnimatePresence } from "framer-motion"

const navigation = [
    {
        label: "Overview",
        icon: LayoutDashboard,
        requiresAgent: true,
        items: [
            { title: "Dashboard", href: "/overview/dashboard", icon: LayoutDashboard },
            { title: "Enquiries", href: "/overview/enquiries", icon: MessageSquare },
        ],
    },
    {
        label: "Itinerary Builder",
        icon: Package,
        items: [
            { title: "Flights", href: "/itinerary/flights", icon: Plane },
            { title: "Packages", href: "/itinerary/packages", icon: Package },
            { title: "Hotels", href: "/itinerary/hotels", icon: Hotel },
            { title: "Cabs", href: "/itinerary/cabs", icon: Car },
            { title: "Smart AI", href: "/itinerary/ai", icon: Sparkles },
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
    const [isAgent, setIsAgent] = useState(false)

    const [openGroups, setOpenGroups] = useState<string[]>([])

    useEffect(() => {
        const loggedInType = localStorage.getItem("loggedInType")
        const isLoggedIn = localStorage.getItem("isLoggedIn")

        if (loggedInType === "agent" && isLoggedIn === "true") {
            setIsAgent(true)
        }
    }, [])

    useEffect(() => {
        if (state !== "expanded") {
            toggleSidebar()
        }
    }, [])

    useEffect(() => {
        const activeGroup = navigation.find(group =>
            group.items.some(item => pathname.startsWith(item.href))
        )

        if (activeGroup && !openGroups.includes(activeGroup.label)) {
            setOpenGroups(prev => [...prev, activeGroup.label])
        }
    }, [pathname])

    const toggleGroup = (label: string) => {
        setOpenGroups(prev =>
            prev.includes(label)
                ? prev.filter(l => l !== label)
                : [...prev, label]
        )
    }

    const isProfileActive = pathname.startsWith("/itinerary/profile")

    const filteredNavigation = navigation.filter(group => {
        if (group.requiresAgent) return isAgent
        return true
    })

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
                className="bg-white border-r flex flex-col h-full mt-[4rem]"
            >
                <SidebarContent className="flex-1 overflow-x-hidden">

                    {filteredNavigation.map((group) => {
                        const GroupIcon = group.icon
                        const isOpen = openGroups.includes(group.label)

                        return (
                            <SidebarGroup key={group.label}>

                                {/* COLLAPSED MODE */}
                                <div className="hidden group-data-[collapsible=icon]:block">
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button className="flex justify-center p-2 w-full">
                                                        <GroupIcon className="h-5 w-5 text-[#3FB8FF]" />
                                                    </button>
                                                </PopoverTrigger>

                                                <PopoverContent side="right" align="start" className="w-48 p-2">
                                                    <div className="space-y-1">
                                                        {group.items.map((item) => {
                                                            const Icon = item.icon
                                                            const isActive = pathname.startsWith(item.href)

                                                            return (
                                                                <button
                                                                    key={item.title}
                                                                    onClick={() => router.push(item.href)}
                                                                    className={`
                                    flex items-center gap-2 w-full p-2 rounded-md text-sm
                                    ${isActive
                                                                            ? "text-[#FBAB18]"
                                                                            : "hover:bg-[#3FB8FF15]"
                                                                        }
                                  `}
                                                                >
                                                                    <Icon className="h-4 w-4" />
                                                                    {item.title}
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </div>

                                {/* EXPANDED HEADER */}
                                <div className="group-data-[collapsible=icon]:hidden">
                                    <SidebarGroupLabel
                                        onClick={() => toggleGroup(group.label)}
                                        className="flex items-center justify-between cursor-pointer px-2 py-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <GroupIcon className="h-5 w-5 text-[#3FB8FF]" />
                                            <span className="text-sm font-medium text-[#3FB8FF]">
                                                {group.label}
                                            </span>
                                        </div>

                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </SidebarGroupLabel>
                                </div>

                                {/* SUBMENU (FULL WIDTH KEPT) */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <SidebarGroupContent>
                                                <SidebarMenu className="pl-6 ml-3 border-l border-[#3FB8FF20]">

                                                    {group.items.map((item) => {
                                                        const Icon = item.icon
                                                        const isActive = pathname.startsWith(item.href)

                                                        return (
                                                            <SidebarMenuItem key={item.title}>
                                                                <SidebarMenuButton asChild tooltip={item.title}>
                                                                    <button
                                                                        onClick={() => {
                                                                            router.push(item.href)
                                                                            // if (state === "expanded") toggleSidebar()
                                                                        }}
                                                                        className={`
                                      flex items-center gap-3 p-2 rounded-md w-full
                                      ${isActive
                                                                                ? "text-[#FBAB18]"
                                                                                : "text-[#3FB8FF] hover:bg-[#3FB8FF15]"
                                                                            }
                                    `}
                                                                    >
                                                                        <Icon className="h-5 w-5" />

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
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </SidebarGroup>
                        )
                    })}
                </SidebarContent>

                <SidebarFooter className="border-t mb-[5rem]">
                    <SidebarMenu>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Profile">
                                <button
                                    onClick={() => router.push("/itinerary/profile")}
                                    className={`
        flex items-center gap-3 p-2
        ${isProfileActive ? "text-[#FBAB18]" : "text-[#3FB8FF] hover:text-[#3FB8FF]"}
      `}
                                >
                                    <User className={`h-5 w-5 ${isProfileActive ? "text-[#FBAB18]" : "text-[#3FB8FF]"}`} />

                                    <span className="group-data-[collapsible=icon]:hidden">
                                        Profile
                                    </span>
                                </button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Logout">
                                <button
                                    onClick={() => setOpenDialog(true)}
                                    className="flex items-center gap-3 p-2 text-red-500"
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

            {/* LOGOUT DIALOG */}
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
                            className="bg-red-500"
                        >
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}