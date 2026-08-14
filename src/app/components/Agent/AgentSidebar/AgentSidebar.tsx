"use client";

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
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Plane,
  Hotel,
  Car,
  Eye,
  CreditCard,
  FileText,
  Percent,
  LogOut,
  ChevronDown,
  User,
  Wallet,
  Users,
  Compass,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import { GlobalLoader } from "@/app/utils/GlobalSpinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  {
    label: "MAIN",
    icon: Compass,
    requiresAgent: true,
    items: [
      { title: "Dashboard", href: "/Agent/dashboard", icon: LayoutDashboard },
      { title: "Enquiries", href: "/Agent/enquiries", icon: MessageSquare },
      { title: "Customers", href: "/Agent/customers", icon: Users },
    ],
  },
  {
    label: "BOOKINGS",
    icon: Calendar,
    requiresAgent: true,
    items: [
      { title: "Packages", href: "/Agent/bookings/packages", icon: Calendar },
      { title: "Flights", href: "/Agent/bookings/flights", icon: Plane },
      { title: "Hotels", href: "/Agent/bookings/hotels", icon: Hotel },
      { title: "Transfers", href: "/Agent/bookings/transfers", icon: Car },
      { title: "Sightseeing", href: "/Agent/bookings/sightseeing", icon: Eye },
    ],
  },
  {
    label: "FINANCE",
    icon: CreditCard,
    requiresAgent: true,
    items: [
      { title: "Payments", href: "/Agent/payments", icon: CreditCard },
      { title: "Invoices", href: "/Agent/invoices", icon: FileText },
      { title: "Commissions", href: "/Agent/commissions", icon: Percent },
      { title: "Wallet", href: "/Agent/wallet", icon: Wallet },
    ],
  },
  {
    label: "MANAGEMENT",
    icon: Users,
    requiresAgent: true,
    items: [{ title: "Sub-Agents", href: "/Agent/sub-agents", icon: Users }],
  },
];

export function AgentSidebar() {
  const { toggleSidebar, state } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const [showLoader, setShowLoader] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(["MAIN"]);

  useEffect(() => {
    const loggedInType = localStorage.getItem("loggedInType");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (loggedInType === "agent" && isLoggedIn === "true") {
      setIsAgent(true);
    }
  }, []);

  useEffect(() => {
    const activeGroup = navigation.find((group) =>
      group.items.some((item) => pathname?.startsWith(item.href))
    );

    if (activeGroup && !openGroups.includes(activeGroup.label)) {
      setOpenGroups((prev) => [...prev, activeGroup.label]);
    }
  }, [pathname]);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isProfileActive = pathname?.startsWith("/Agent/profile");

  const filteredNavigation = navigation.filter((group) => {
    if (group.requiresAgent) return isAgent;
    return true;
  });

  const isGroupActive = (group: typeof navigation[0]) => {
    return group.items.some((item) => pathname?.startsWith(item.href));
  };

  return (
    <>
      <GlobalLoader
        open={showLoader}
        duration={2000}
        loadingText="Logging you out..."
        successText="Logged out successfully"
        onComplete={() => {
          logout();
          router.replace("/");
        }}
      />

      <Sidebar
        collapsible="icon"
        className="bg-white border-r flex flex-col h-full mt-[5rem] overflow-x-hidden"
      >
        <SidebarContent className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col h-full">
            {/* Expanded mode - normal layout */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden group-data-[collapsible=icon]:hidden">
              {filteredNavigation.map((group) => {
                const GroupIcon = group.icon;
                const isOpen = openGroups.includes(group.label);
                const isActive = isGroupActive(group);

                return (
                  <SidebarGroup key={group.label} className="py-1">
                    <SidebarGroupLabel
                      onClick={() => toggleGroup(group.label)}
                      className={`flex items-center justify-between cursor-pointer px-2 py-1.5 transition-colors ${
                        isActive ? "text-[#FBAB18]" : "text-[#3FB8FF]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <GroupIcon
                          className={`h-5 w-5 ${
                            isActive ? "text-[#FBAB18]" : "text-[#3FB8FF]"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isActive ? "text-[#FBAB18]" : "text-[#3FB8FF]"
                          }`}
                        >
                          {group.label}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        } ${isActive ? "text-[#FBAB18]" : "text-[#3FB8FF]"}`}
                      />
                    </SidebarGroupLabel>

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
                                const Icon = item.icon;
                                const isItemActive = pathname?.startsWith(
                                  item.href
                                );

                                return (
                                  <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                      asChild
                                      tooltip={item.title}
                                    >
                                      <button
                                        onClick={() => {
                                          router.push(item.href);
                                          if (state === "expanded")
                                            toggleSidebar();
                                        }}
                                        className={`
                                          flex items-center gap-3 p-2 rounded-md w-full transition-colors
                                          ${
                                            isItemActive
                                              ? "text-[#FBAB18] bg-[#FBAB18]/10"
                                              : "text-[#3FB8FF] hover:bg-[#3FB8FF15]"
                                          }
                                        `}
                                      >
                                        <Icon
                                          className={`h-5 w-5 ${
                                            isItemActive
                                              ? "text-[#FBAB18]"
                                              : ""
                                          }`}
                                        />
                                        <span
                                          className={`group-data-[collapsible=icon]:hidden ${
                                            isItemActive
                                              ? "text-[#FBAB18]"
                                              : "text-[#3FB8FF]"
                                          }`}
                                        >
                                          {item.title}
                                        </span>
                                      </button>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                );
                              })}
                            </SidebarMenu>
                          </SidebarGroupContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SidebarGroup>
                );
              })}
            </div>

            {/* Collapsed mode - ONLY ICONS at TOP with equal spacing */}
            <div className="hidden group-data-[collapsible=icon]:flex flex-col overflow-x-hidden">
              <div className="flex flex-col gap-1 py-2">
                {filteredNavigation.map((group) => {
                  const isActive = isGroupActive(group);
                  const GroupIcon = group.icon;

                  return (
                    <Popover key={group.label}>
                      <PopoverTrigger asChild>
                        <button
                          className={`flex justify-center p-2 w-full transition-colors ${
                            isActive ? "text-[#FBAB18]" : "text-[#3FB8FF]"
                          }`}
                        >
                          <GroupIcon
                            className={`h-5 w-5 ${
                              isActive ? "text-[#FBAB18]" : "text-[#3FB8FF]"
                            }`}
                          />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent side="right" align="start" className="w-48 p-2">
                        <div className="space-y-1">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            const isItemActive = pathname?.startsWith(item.href);

                            return (
                              <button
                                key={item.title}
                                onClick={() => router.push(item.href)}
                                className={`
                                  flex items-center gap-2 w-full p-2 rounded-md text-sm
                                  ${
                                    isItemActive
                                      ? "text-[#FBAB18] bg-[#FBAB18]/10"
                                      : "hover:bg-[#3FB8FF15] text-[#3FB8FF]"
                                  }
                                `}
                              >
                                <Icon
                                  className={`h-4 w-4 ${
                                    isItemActive ? "text-[#FBAB18]" : ""
                                  }`}
                                />
                                {item.title}
                              </button>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                })}
              </div>
            </div>
          </div>
        </SidebarContent>

        <SidebarFooter className="border-t mb-[5rem]">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <button
                  onClick={() => router.push("/Agent/profile")}
                  className={`
                    flex items-center gap-3 p-2 transition-colors
                    ${
                      isProfileActive
                        ? "text-[#FBAB18]"
                        : "text-[#3FB8FF] hover:text-[#3FB8FF]"
                    }
                  `}
                >
                  <User
                    className={`h-5 w-5 ${
                      isProfileActive ? "text-[#FBAB18]" : "text-[#3FB8FF]"
                    }`}
                  />
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
                setOpenDialog(false);
                setShowLoader(true);
              }}
              className="bg-red-500"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}