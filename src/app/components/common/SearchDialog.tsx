"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { PremiumButton } from "@/app/utils/PremiumButton"

export function SearchDialog() {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC")

            if (
                (isMac && e.metaKey && e.key === "/") ||
                (!isMac && e.ctrlKey && e.key === "/")
            ) {
                e.preventDefault()
                setOpen(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <PremiumButton
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-white hover:text-white hover:bg-white/10"
                >
                    <Search size={18} className="text-white" />
                    <span className="hidden sm:inline">Search</span>

                    <span className="hidden md:inline text-xs text-white border border-white px-2 py-0.5 rounded-md">
                        ⌘ /
                    </span>
                </PremiumButton>
            </DialogTrigger>

            <DialogContent
                className="
          max-w-xl p-0 border-none bg-transparent shadow-none [&>button]:hidden
        "
            >
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 relative">

                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white"
                    >
                        <X size={20} />
                    </button>

                    <Input
                        autoFocus
                        placeholder="Search anything..."
                        className="
              bg-transparent border-none focus-visible:ring-0
              text-white placeholder:text-white/60 text-lg
            "
                    />

                    <div className="mt-4 text-white/80 text-sm">
                        Start typing to see results...
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}