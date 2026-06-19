/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { api, setAccessToken } from "@/services/api"
import { fetchMe } from "@/services/auth"

export type UserRole = "admin" | "user" | "manager"

/**
 * Fine-grained authorization unit, e.g. "users.delete", "products.read".
 * Backend-provided — the frontend only ever checks membership, never derives
 * permissions from role. Role stays a coarse label for nav/grouping/defaults.
 */
export type Permission = string

export type User = {
  uniqueId: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  permissions: Permission[]
}

type AuthContextValue = {
  isLoading: boolean
  isAuthenticated: boolean
  user: User | null
  login: (accessToken?: string) => Promise<void>
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
          await api.get("/auth/me")
          setUser(await fetchMe())
        } else {
          const { data } = await api.post<{ accessToken: string }>(
            "/auth/refresh"
          )
          setAccessToken(data.accessToken)
          setUser(await fetchMe())
        }
      } catch {
        // No valid session — user stays unauthenticated
      } finally {
        setIsLoading(false)
      }
    }

    void validateSession()
  }, [])

  const login = React.useCallback(async (accessToken?: string) => {
    if (accessToken) setAccessToken(accessToken)
    setUser(await fetchMe())
  }, [])

  const logout = React.useCallback(async () => {
    await api.post("/auth/logout")
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
