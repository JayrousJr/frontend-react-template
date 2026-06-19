import { useAuth, type Permission } from "@/context/auth-context"
import type { ComponentType } from "react"

/**
 * Renders the component only if the current user holds every permission in
 * requiredPermissions. Returns null otherwise — no redirect, no error, just
 * hidden. The finer-grained sibling of withRole: use this when visibility
 * depends on a specific capability (e.g. "users:delete") rather than a role.
 *
 * Use this for inline UI elements (buttons, menu items, sections).
 * For page-level access control use PermissionRoute in the router instead.
 *
 * @example
 * const DeleteButton = withPermission(["users.delete"])(Button)
 * const ExportAction = withPermission(["analytics.read"])(MenuItem)
 */
export function withPermission<TProps extends object>(
  requiredPermissions: Permission[]
) {
  return function (Component: ComponentType<TProps>) {
    const WithPermission = (props: TProps) => {
      const { user } = useAuth()

      if (
        !user ||
        !requiredPermissions.every((permission) =>
          user.permissions.includes(permission)
        )
      ) {
        return null
      }

      return <Component {...props} />
    }

    WithPermission.displayName = `withPermission(${Component.displayName ?? Component.name})`

    return WithPermission
  }
}
