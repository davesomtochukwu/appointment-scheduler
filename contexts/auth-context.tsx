"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { AuthService, type AuthUser } from "@/lib/auth"

interface AuthContextType {
  user: AuthUser | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string, role: "Provider" | "Client") => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const user = await AuthService.login(username, password)
    setUser(user)
  }

  const register = async (username: string, email: string, password: string, role: "Provider" | "Client") => {
    const user = await AuthService.register(username, email, password, role)
    setUser(user)
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
  }

  const resetPassword = async (email: string) => {
    await AuthService.resetPassword(email)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        resetPassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
