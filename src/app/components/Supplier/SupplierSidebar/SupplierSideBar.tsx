"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"



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
    User,
    BriefcaseBusiness,
    Gavel,
    FileText,
    CreditCard
    
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


const navigation = [
    {
        label: "",
        requiresSupplier: true,
        items: [
            { title: "Dashboard", href: "/Supplier/SupplierDashboard", icon: LayoutDashboard },
      { title: "Enquiries", href: "/Supplier/SupplierEnquiries", icon: MessageSquare },
      { title: "Services and Rates", href: "/Supplier/SupplierServiceRates", icon: BriefcaseBusiness },
      { title: "Demand / Bidding", href: "/Supplier/SupplierDemandBidding", icon: Gavel },
      { title: "Invoices", href: "/Supplier/SupplierInvoices", icon: FileText },
      { title: "Payments", href: "/Supplier/SupplierPayments", icon: CreditCard },
        ],
    },
   
]

export function SupplierSidebar() {
    const { toggleSidebar, state } = useSidebar()
    const router = useRouter()
    const pathname = usePathname()
    const { logout } = useAuth()

    const [showLoader, setShowLoader] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [isSupplier, setIsSupplier] = useState(false)

   

    useEffect(() => {
        const loggedInType = localStorage.getItem("loggedInType")
        
        const isLoggedIn = localStorage.getItem("isLoggedIn")
        
        if (loggedInType === "supplier" && isLoggedIn === "true") {
            setIsSupplier(true)
        }
    }, [])


   

    const isProfileActive = pathname.startsWith("/itinerary/profile")

    const filteredNavigation = navigation.filter(group => {
        if (group.requiresSupplier) return isSupplier
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
                className="bg-white border-r flex flex-col h-full mt-[5rem]"
            >
                <SidebarContent className="flex-1 overflow-x-hidden">

                    {filteredNavigation.map((group) => {
                        
                        

                        return (
                            <SidebarGroup key={group.label}>

                      

                                
                                {/* SUBMENU (FULL WIDTH KEPT) */}
                               
                                            <SidebarGroupContent>
                                                <SidebarMenu className="px-2 space-y-1">

                                                    {group.items.map((item) => {
                                                        const Icon = item.icon
                                                        const isActive = pathname.startsWith(item.href)

                                                        return (
                                                            <SidebarMenuItem key={item.title}>
                                                                <SidebarMenuButton asChild tooltip={item.title}>
                                                                    <button
                                                                        onClick={() => {
                                                                            router.push(item.href)
                                                                           
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