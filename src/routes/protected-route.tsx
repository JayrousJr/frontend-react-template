import LoadingPage from "@/components/loading-page"
import { useAuth } from "@/context/auth-context"
import { Navigate, Outlet, useLocation } from "react-router"
import { ROUTES } from "./routeConstants"
import { toast } from "sonner"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <LoadingPage />

  if (!isAuthenticated) {
    toast.success("You are logged Out successiful")
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
