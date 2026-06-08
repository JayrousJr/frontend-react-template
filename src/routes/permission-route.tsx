import LoadingPage from "@/components/loading-page"
import { useAuth, type Permission } from "@/context/auth-context"
import { Navigate, Outlet } from "react-router"
import { ROUTES } from "./routeConstants"

type PermissionRouteProps = {
  requiredPermissions: Permission[]
}

/**
 * Page-level permission gate — redirects to /403 unless the user holds every
 * permission in requiredPermissions. Nest inside ProtectedRoute (and, where
 * relevant, RoleRoute) so auth and role are checked first — same composition
 * pattern, just a finer-grained axis.
 */
const PermissionRoute = ({ requiredPermissions }: PermissionRouteProps) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <LoadingPage />

  if (
    !user ||
    !requiredPermissions.every((permission) =>
      user.permissions.includes(permission)
    )
  ) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />
  }

  return <Outlet />
}

export default PermissionRoute
