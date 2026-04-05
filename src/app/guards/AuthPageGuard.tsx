"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GlobalLoader } from "../utils/GlobalSpinner"

export default function AuthPageGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()
const pathname = usePathname()

  const [showDialog, setShowDialog] = useState(false)
  const [loggedInType, setLoggedInType] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(isLoggedIn + "path is " + pathname)
    if (isLoggedIn) {
      const type = localStorage.getItem("loggedInType") || "User"
      setLoggedInType(type)
      setShowDialog(true)
    }
  }, [isLoggedIn])

  const handleLogout = () => {
    setShowDialog(false)
    setLoading(true)
  }

  const handleRedirect = () => {
    router.push("/itinerary/packages")
  }

  const handleLoaderComplete = () => {
    logout()
    router.push("/auth")
  }

  if (isLoggedIn) {
    return (
      <>
        <Dialog open={showDialog} onOpenChange={() => {}}>
          <DialogContent className="[&>button]:hidden">
            <DialogHeader>
              <DialogTitle>Already Logged In</DialogTitle>
              <DialogDescription>
                You are already logged in as <strong>{loggedInType}</strong>.
                Do you want to log out and access the login page?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleRedirect}>
                No, i want to stay logged in
              </Button>
              <Button onClick={handleLogout}>
                Yes, log me out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <GlobalLoader
          open={loading}
          duration={2000}
          onComplete={handleLoaderComplete}
          loadingText="Logging you out..."
          successText="Logged out successfully"
        />
      </>
    )
  }

  return <>{children}</>
}