import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { FieldLabel } from "@/components/ui/field"
import {
  fetchNewsletterSubscription,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
} from "@/services/account"

const NotificationsTab = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isToggling, setIsToggling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const sub = await fetchNewsletterSubscription()
        setIsSubscribed(sub !== null)
      } catch {
        setError("Failed to load subscription status")
      } finally {
        setIsLoading(false)
      }
    }
    void load()
  }, [])

  async function handleToggle(checked: boolean) {
    setIsToggling(true)
    setError(null)
    try {
      if (checked) {
        await subscribeToNewsletter()
      } else {
        await unsubscribeFromNewsletter()
      }
      setIsSubscribed(checked)
    } catch {
      setError("Failed to update subscription")
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Manage how you receive updates and communications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <FieldLabel>Newsletter</FieldLabel>
              <p className="text-sm text-muted-foreground">
                Receive product updates, announcements, and tips via email.
              </p>
            </div>
            <Switch
              checked={isSubscribed}
              onCheckedChange={handleToggle}
              disabled={isLoading || isToggling}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <FieldLabel>Email Notifications</FieldLabel>
              <p className="text-sm text-muted-foreground">
                Get notified about account activity and security alerts.
              </p>
            </div>
            <Switch checked={true} disabled />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <FieldLabel>Push Notifications</FieldLabel>
              <p className="text-sm text-muted-foreground">
                Receive real-time notifications in your browser.
              </p>
            </div>
            <Switch checked={false} disabled />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NotificationsTab
