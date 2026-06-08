import { useAuth, type UserRole } from "@/context/auth-context"
import type { ComponentType } from "react"

/**
 * Renders the component only if the current user has one of the allowed roles.
 * Returns null otherwise — no redirect, no error, just hidden.
 *
 * Use this for inline UI elements (buttons, menu items, sections).
 * For page-level access control use RoleRoute in the router instead.
 *
 * @example
 * const AdminButton = withPermission(["admin"])(Button)
 * const ManagerAction = withPermission(["admin", "manager"])(DropdownItem)
 */
export function withPermission<TProps extends object>(
  allowedRoles: UserRole[]
) {
  return function (Component: ComponentType<TProps>) {
    const WithPermission = (props: TProps) => {
      const { user } = useAuth()

      if (!user || !allowedRoles.includes(user.role)) {
        return null
      }

      return <Component {...props} />
    }

    WithPermission.displayName = `withPermission(${Component.displayName ?? Component.name})`

    return WithPermission
  }
}
