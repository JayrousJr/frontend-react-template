export const ROUTES = {
  // Authentication (full paths for navigation / API)
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",

  // Dashboards
  HOME: "/",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  USER_DETAILS: "/users/:uniqueId",
  REPORTS: "/reports",
  SETTINGS: "/settings",

  // Error
  NOT_FOUND: "/404",
  FORBIDDEN: "/403",
}

/**
 * Relative segments used inside the nested `path: "auth"` route group.
 * React Router resolves these relative to the parent — "login" under
 * path: "auth" becomes /auth/login.
 */
export const AUTH_ROUTES = {
  LOGIN: "login",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",
  RESET_PASSWORD: "reset-password",
}
