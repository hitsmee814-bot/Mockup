"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [allowed, setAllowed] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Extract type from URL: /signup/agent → agent
    const type = pathname.split("/")[2]

    if (!type) {
      setOpen(true)
      return
    }

    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith(`verifyToken_${type}=`))
      ?.split("=")[1]

    if (!token) {
      setOpen(true)
      return
    }

    try {
      const decoded = JSON.parse(atob(token))

      if (!decoded?.verified) throw new Error()

      const isExpired = Date.now() - decoded.ts > 10 * 60 * 1000
      if (isExpired) throw new Error()

      setAllowed(true)
    } catch {
      setOpen(true)
    }
  }, [pathname])

  const handleClose = () => {
    setOpen(false)
    router.push("/auth")
  }

  if (!allowed) {
    return (
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Required</DialogTitle>
            <DialogDescription>
              Please verify your credentials before signing up.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={handleClose}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return <>{children}</>
}