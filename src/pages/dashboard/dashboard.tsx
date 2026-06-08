import { useState } from "react"
import {
  withRole,
  withPermission,
  withLoading,
  withErrorBoundary,
} from "@/hocs"
import type { UserRole } from "@/context/auth-context"

//  card
type StatsCardProps = {
  label: string
  value: string
}

function StatsCardSkeleton() {
  return <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
}

function StatsCardFallback({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-destructive p-4">
      <p className="text-sm text-destructive">Failed to load</p>
      <button onClick={reset} className="mt-1 text-xs underline">
        Retry
      </button>
    </div>
  )
}

function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  )
}

// withLoading — shows skeleton while data is being fetched
// withErrorBoundary — isolates crashes so one card doesn't break the page
const SafeStatsCard = withErrorBoundary(StatsCardFallback)(
  withLoading(StatsCardSkeleton)(StatsCard)
)

// Admin panel

function AdminPanel() {
  return (
    <div className="rounded-lg border border-dashed p-4">
      <p className="text-sm font-medium">Admin panel</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Visible only to admins.
      </p>
    </div>
  )
}

// withRole — renders null for non-admin users, no redirect
const AdminOnlyPanel = withRole(["admin"] as UserRole[])(AdminPanel)

// Delete users button — gated on a specific permission rather than a role.
// Two admins can have different permission sets; checking the capability
// directly is what actually determines whether the action is safe to show.

function DeleteUsersButton() {
  return (
    <button className="rounded-md border border-destructive px-3 py-1.5 text-sm text-destructive">
      Delete selected users
    </button>
  )
}

const DeleteUsersAction = withPermission(["users:delete"])(DeleteUsersButton)

// Page

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button
          className="text-sm underline"
          onClick={() => setIsLoading((v) => !v)}
        >
          Toggle loading ({isLoading ? "on" : "off"})
        </button>
      </div>

      {/* withLoading + withErrorBoundary */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <SafeStatsCard loading={isLoading} label="Total users" value="1,240" />
        <SafeStatsCard loading={isLoading} label="Revenue" value="$48,200" />
        <SafeStatsCard loading={isLoading} label="Open tickets" value="13" />
      </div>

      {/* withRole — only admins see this */}
      <AdminOnlyPanel />

      {/* withPermission — only users holding "users:delete" see this */}
      <div className="mt-6">
        <DeleteUsersAction />
      </div>
    </div>
  )
}

export default DashboardPage
