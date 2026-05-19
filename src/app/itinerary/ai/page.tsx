"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { SmartAI } from "@/app/components/ai-chat/smart-ai"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

export default function AIPage() {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [isAllowed, setIsAllowed] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (isLoggedIn !== "true") {
      setIsAllowed(false)
      setOpen(true)
    }
  }, [])

  if (!isAllowed) {
    return (
      <AlertDialog open={open}>
        <AlertDialogContent className="max-w-md text-center">
          
          <div className="text-3xl mb-2">✨</div>

          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Unlock Smart AI
            </AlertDialogTitle>

            <AlertDialogDescription>
              Login to access our AI-powered itinerary builder and generate smart travel plans instantly.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => router.push("/auth")}
              className="bg-[#3FB8FF] hover:bg-[#3FB8FF]/90"
            >
              Login to Continue
            </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return <SmartAI />
}