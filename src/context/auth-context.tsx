/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { setAccessToken } from "@/services/api"
import { ROUTES } from "@/routes/routeConstants"

export type UserRole = "admin" | "user" | "manager"

/**
 * Fine-grained authorization unit, e.g. "users:delete", "reports:export".
 * Backend-provided — the frontend only ever checks membership, never derives
 * permissions from role. Role stays a coarse label for nav/grouping/defaults.
 */
export type Permission = string

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
}

type AuthContextValue = {
  isLoading: boolean
  isAuthenticated: boolean
  user: User | null
  login: (user: User, accessToken?: string) => void
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    async function validateSession() {
      try {
        if (import.meta.env.VITE_AUTH_STRATEGY === "session") {
          // session based auth
          const res = await fetch(ROUTES.ME, { credentials: "include" })
          if (res.ok) setUser(await res.json())
        } else {
          // jwt based auth
          const res = await fetch(ROUTES.REFRESH, {
            method: "POST",
            credentials: "include",
          })
          if (res.ok) {
            const { user, accessToken } = await res.json()
            setAccessToken(accessToken)
            setUser(user)
          }
        }
      } catch (error) {
        console.error("Session validation failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    void validateSession()
  }, [])

  const login = React.useCallback((nextUser: User, token?: string) => {
    if (token) setAccessToken(token)
    setUser(nextUser)
  }, [])

  const logout = React.useCallback(async () => {
    await fetch("/auth/logout", { method: "POST", credentials: "include" })
    setAccessToken(null)
    setUser(null)
  }, [])

  const value = React.useMemo(
    () => ({
      isLoading,
      isAuthenticated: user !== null,
      user,
      login,
      logout,
    }),
    [isLoading, user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
