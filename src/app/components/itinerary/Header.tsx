"use client"

import Image from "next/image"
import logoPrimary from "../../assets/images/final logo Bonhomiee white without.png"
import { PremiumButton } from "@/app/utils/PremiumButton"
import { LogIn, Menu, User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import { forwardRef } from "react"
import { useAuth } from "@/app/context/AuthContext"

export const Header = forwardRef<HTMLElement>((props, ref) => {
    const router = useRouter()
    const { toggleSidebar } = useSidebar()
    const { isLoggedIn } = useAuth()

    return (
        <header
            ref={ref}
            className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-slate-200 bg-[#0E40C7] backdrop-blur-md"
        >
            {/* MENU */}
            <button
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
                className="
                    absolute left-3 top-1/2 z-20
                    flex h-9 w-9 -translate-y-1/2
                    items-center justify-center
                    rounded-md
                    transition
                    hover:bg-white/15
                    sm:left-4
                "
            >
                <Menu className="h-6 w-6 text-white" />
            </button>

            <div
                className="
                    mx-auto flex h-full max-w-7xl
                    items-center justify-between
                    px-4
                    pl-14
                    sm:px-6
                    sm:pl-16
                "
            >
                {/* LOGO */}
                <div
                    className="
                        relative h-9 w-[135px]
                        shrink-0 cursor-pointer
                        sm:h-10 sm:w-[160px]
                    "
                    onClick={() => router.push("/")}
                >
                    <Image
                        src={logoPrimary}
                        alt="Bonhomiee"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>

                {/* RIGHT ACTION */}
                <div className="flex shrink-0 items-center gap-2 md:gap-4">
                    {isLoggedIn ? (
                        <PremiumButton
                            size="sm"
                            onClick={() =>
                                router.push("/itinerary/profile")
                            }
                        >
                            <span className="hidden sm:inline">
                                Profile
                            </span>
                            <User2 size={18} />
                        </PremiumButton>
                    ) : (
                        <PremiumButton
                            size="sm"
                            onClick={() => router.push("/auth")}
                        >
                            <LogIn size={18} />
                            <span className="hidden md:inline">
                                Login
                            </span>
                        </PremiumButton>
                    )}
                </div>
            </div>
        </header>
    )
})