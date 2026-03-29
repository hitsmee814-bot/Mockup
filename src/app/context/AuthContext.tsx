"use client"

import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(stored)
  }, [])

  const login = () => {
    sessionStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true)
  }

  const logout = () => {
    sessionStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}