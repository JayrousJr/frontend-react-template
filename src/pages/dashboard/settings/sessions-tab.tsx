import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MonitorIcon,
  SmartphoneIcon,
  GlobeIcon,
  Trash2Icon,
} from "lucide-react"
import {
  fetchMySessions,
  revokeSession,
  type Session,
} from "@/services/account"
import { formatRelativeTime } from "@/lib/format"

function getDeviceIcon(userAgent: string) {
  const ua = userAgent?.toLowerCase()

  if (
    ua?.includes("mobile") ||
    ua?.includes("android") ||
    ua?.includes("iphone")
  ) {
    return <SmartphoneIcon className="size-5" />
  }
  if (
    ua?.includes("mozilla") ||
    ua?.includes("chrome") ||
    ua?.includes("safari")
  ) {
    return <MonitorIcon className="size-5" />
  }
  return <GlobeIcon className="size-5" />
}

function getBrowserName(userAgent: string): string {
  if (userAgent?.includes("Firefox")) return "Firefox"
  if (userAgent?.includes("Edg")) return "Edge"
  if (userAgent?.includes("Chrome")) return "Chrome"
  if (userAgent?.includes("Safari")) return "Safari"
  if (userAgent?.includes("Opera") || userAgent?.includes("OPR")) return "Opera"
  return "Unknown Browser"
}

const SessionsTab = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [revokingId, setRevokingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  console.log(sessions)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchMySessions()
        setSessions(data)
      } catch {
        setError("Failed to load sessions")
      } finally {
        setIsLoading(false)
      }
    }
    void load()
  }, [])

  async function handleRevoke(uniqueId: string) {
    setRevokingId(uniqueId)
    setError(null)
    try {
      await revokeSession(uniqueId)
      setSessions((prev) => prev.filter((s) => s.uniqueId !== uniqueId))
    } catch {
      setError("Failed to revoke session")
    } finally {
      setRevokingId(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
        <CardDescription>
          Manage your active sessions. Revoke any session you don't recognize.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active sessions.</p>
        ) : (
          <div className="space-y-1">
            {sessions.map((session, index) => (
              <div key={session.uniqueId}>
                {index > 0 && <Separator className="my-4" />}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      {getDeviceIcon(session.userAgent)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {getBrowserName(session.userAgent)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.ipAddress} · Created{" "}
                        {formatRelativeTime(session.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      Expires {formatRelativeTime(session.expiresAt)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevoke(session.uniqueId)}
                      disabled={revokingId === session.uniqueId}
                    >
                      <Trash2Icon className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SessionsTab
