"use client"

import Image from "next/image"
import logoPrimary from "../../assets/images/final logo Bonhomiee white without.png"
import { PremiumButton } from "@/app/utils/PremiumButton"
import { LogIn, Menu, User, User2 } from "lucide-react"
import { HiOutlineBriefcase } from "react-icons/hi"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import { forwardRef } from "react"
import { useAuth } from "@/app/context/AuthContext"

export const SupplierHeader = forwardRef<HTMLElement, {}>((props, ref) => {
    const router = useRouter()
    const { toggleSidebar } = useSidebar()
    const { isLoggedIn, logout } = useAuth()
    return (
        <header
            ref={ref}
            className="fixed top-0 left-0 right-0 h-20 bg-[#3FB8FF] backdrop-blur-md border-b border-slate-200 z-50"
        >

            <button
                onClick={toggleSidebar}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-md hover:bg-white/20 transition"
            >
                <Menu className="h-6 w-6 text-white" />
            </button>

            <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 pl-14">
                <div
                    className="relative w-[160px] h-10 cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    <Image
                        src={logoPrimary}
                        alt="Logo"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>

                    {isLoggedIn}
                <div className="flex items-center gap-2 md:gap-4">
                    {isLoggedIn ? (
                    <PremiumButton
                        size="sm"
                        onClick={()=>router.push('/itinerary/profile')}
                    >
                        Profile
                        <User2 size={18}/>
                    </PremiumButton>
                    ) : (
                    <PremiumButton
                        size="sm"
                        onClick={() => router.push('/auth')}
                    >
                        <LogIn size={18} />
                        <span className="hidden md:inline">Login</span>
                    </PremiumButton>
                    )}

                    <PremiumButton
                        variant="secondary"
                        size="sm"
                    >
                        <HiOutlineBriefcase size={18} />
                        <span className="hidden md:inline">Book Demo</span>
                    </PremiumButton>

                </div>

            </div>
        </header>
    )
})
SupplierHeader.displayName = "SupplierHeader"