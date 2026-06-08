import type { ComponentType } from "react"
import LoadingPage from "@/components/loading-page"
import { useAuth } from "@/context/auth-context"
import AuthLayout from "@/layouts/auth-layout"
import DashboardLayout from "@/layouts/dashboard-layout"
import LandingLayout from "@/layouts/landing-layout"
import Home from "@/pages/guests/home"
import { createBrowserRouter, Navigate } from "react-router"
import { ROUTES } from "./routeConstants"
import ProtectedRoute from "./protected-route"
import PublicOnlyRoute from "./public-only-route"
import RoleRoute from "./role-route"
import RouterErrorBoundary from "./router-error-boundary"
import { fetchUser, fetchUsers } from "@/services/users"

async function lazyPage(importFn: () => Promise<{ default: ComponentType }>) {
  const mod = await importFn()
  return { Component: mod.default }
}

/** Root index: authenticated users skip the landing page and go straight to the app. */
// eslint-disable-next-line react-refresh/only-export-components
function RootIndex() {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <LoadingPage />
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />
  return <Home />
}

export const routes = createBrowserRouter([
  /** Public routes */
  {
    Component: LandingLayout,
    errorElement: <RouterErrorBoundary />,
    children: [{ index: true, Component: RootIndex }],
  },

  /** Auth routes — blocked for authenticated users */
  {
    path: "auth",
    Component: PublicOnlyRoute,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        Component: AuthLayout,
        children: [
          {
            path: ROUTES.LOGIN,
            lazy: () => lazyPage(() => import("@/pages/auth/login")),
          },
          {
            path: ROUTES.REGISTER,
            lazy: () => lazyPage(() => import("@/pages/auth/register")),
          },
          {
            path: ROUTES.FORGOT_PASSWORD,
            lazy: async () => {
              const { default: Component, action } =
                await import("@/pages/auth/forgot-password")
              return { Component, action }
            },
          },
          {
            path: ROUTES.RESET_PASSWORD,
            lazy: async () => {
              const { default: Component, action } =
                await import("@/pages/auth/reset-password")
              return { Component, action }
            },
          },
        ],
      },
    ],
  },

  /** Protected routes (auth required) */
  {
    Component: ProtectedRoute,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        Component: DashboardLayout,
        children: [
          {
            path: ROUTES.DASHBOARD,
            lazy: () => lazyPage(() => import("@/pages/dashboard/dashboard")),
          },
          {
            path: ROUTES.USERS,
            loader: async () => {
              return { users: fetchUsers() }
            },
            lazy: () => lazyPage(() => import("@/pages/dashboard/users/users")),
          },
          {
            path: ROUTES.USER_DETAILS,
            loader: async ({ params }) => {
              return { user: fetchUser(params.uniqueId!) }
            },
            lazy: () =>
              lazyPage(() => import("@/pages/dashboard/users/user-details")),
          },
        ],
      },

      /** Role-restricted routes (admin only) */
      {
        element: <RoleRoute allowedRoles={["admin"]} />,
        children: [
          {
            Component: DashboardLayout,
            children: [
              {
                path: ROUTES.DASHBOARD,
                lazy: () =>
                  lazyPage(() => import("@/pages/dashboard/dashboard")),
              },
            ],
          },
        ],
      },
    ],
  },

  /** Error pages */
  {
    path: ROUTES.NOT_FOUND,
    lazy: () => lazyPage(() => import("@/pages/errors/not-found")),
  },
  {
    path: ROUTES.FORBIDDEN,
    lazy: () => lazyPage(() => import("@/pages/errors/forbidden")),
  },

  /** Catch 404 */
  {
    path: "*",
    element: <Navigate to={ROUTES.NOT_FOUND} replace />,
  },
])
