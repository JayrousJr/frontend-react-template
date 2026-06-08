import { cn } from "@/lib/utils"
import { Outlet, useNavigation } from "react-router"

const DashboardLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return (
    <div className="min-h-screen">
      {/* Navigation loading progress bar */}
      <div
        className={cn(
          "fixed top-0 right-0 left-0 z-50 h-1 bg-primary transition-all duration-300",
          isLoading ? "opacity-100" : "opacity-0"
        )}
      />
      {/* Replace with your dashboard navigation/sidebar */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
