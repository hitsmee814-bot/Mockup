"use client"

import Image from "next/image"
import logoPrimary from "../../assets/images/final logo Bonhomiee white without.png"
import { PremiumButton } from "@/app/utils/PremiumButton"
import { LogIn, Menu } from "lucide-react"
import { HiOutlineBriefcase } from "react-icons/hi"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import { forwardRef } from "react"

export const Header = forwardRef<HTMLElement>((props, ref) => {
    const router = useRouter()
    const { toggleSidebar } = useSidebar()

    return (
        <header ref={ref}
            className="fixed top-0 left-0 right-0 h-20 bg-[#3FB8FF] backdrop-blur-md border-b border-slate-200 z-50">

            <button
                onClick={toggleSidebar}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-md hover:bg-white/20 transition"
            >
                <Menu className="h-6 w-6 text-white" />
            </button>

            <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">

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

                <div className="hidden md:flex items-center gap-4">
                    <PremiumButton className="mb-0 flex items-center w-fit">
                        Login
                        <LogIn size={18} />
                    </PremiumButton>

                    <PremiumButton
                        variant="secondary"
                        className="mb-0 flex items-center w-fit"
                    >
                        Book Demo
                        <HiOutlineBriefcase size={18} />
                    </PremiumButton>
                </div>

            </div>
        </header>
    )
})