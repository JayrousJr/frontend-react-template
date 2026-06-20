import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"
import { useAuthenticatedImage } from "@/hooks/use-authenticated-image"
import {
  fetchMyProfile,
  fetchSupportedLocales,
  updateProfile,
  uploadAvatar,
  type Profile,
} from "@/services/account"
import { UploadIcon } from "lucide-react"
import { fetchMe } from "@/services/auth"

const ProfileTab = () => {
  const { user, refreshUser } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [locales, setLocales] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [preferredLocale, setPreferredLocale] = useState("")

  const avatarSrc = useAuthenticatedImage(user?.avatar)

  useEffect(() => {
    async function load() {
      try {
        const [profileData, localeData] = await Promise.all([
          fetchMyProfile(),
          fetchSupportedLocales(),
        ])
        setProfile(profileData.me)
        setLocales(localeData)
        setFirstName(profileData.me.firstName)
        setLastName(profileData.me.lastName)
        setEmail(profileData.me.email)
        setPreferredLocale(profileData.me.preferredLocale)
      } catch {
        setError("Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }
    void load()
  }, [])

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !profile) return

    try {
      const { uniqueId: avatarUniqueId } = await uploadAvatar(file)
      await updateProfile({
        uniqueId: profile.uniqueId,
        avatarUniqueId,
      })
      const updatedUser = await fetchMe()
      await refreshUser()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      setError("Failed to upload avatar")
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return

    setError(null)
    setSuccess(false)
    setIsSaving(true)

    try {
      await updateProfile({
        uniqueId: profile.uniqueId,
        firstName,
        lastName,
        email,
        preferredLocale,
      })
      const updatedUser = await fetchMe()
      await refreshUser()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes")
    } finally {
      setIsSaving(false)
    }
  }

  function handleCancel() {
    if (!profile) return
    setFirstName(profile.firstName)
    setLastName(profile.lastName)
    setEmail(profile.email)
    setPreferredLocale(profile.preferredLocale)
    setError(null)
    setSuccess(false)
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading profile...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : ""

  return (
    <form onSubmit={handleSave}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personal Info</CardTitle>
            <CardDescription>
              Update your photo and personal details here.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && (
              <p className="text-sm text-green-600">
                Profile updated successfully.
              </p>
            )}

            <Separator />

            <div className="grid grid-cols-[200px_1fr] items-center gap-x-8 gap-y-6">
              <FieldLabel>Name</FieldLabel>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                />
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  required
                />
              </div>

              <Separator className="col-span-2" />

              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Separator className="col-span-2" />

              <div>
                <FieldLabel>Your Photo</FieldLabel>
                <p className="text-xs text-muted-foreground">
                  This will be displayed on your profile.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={avatarSrc}
                    alt={`${firstName} ${lastName}`}
                  />
                  <AvatarFallback className="text-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <label className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border border-dashed px-6 py-4 text-sm text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground">
                  <UploadIcon className="size-5" />
                  <span>Click to upload</span>
                  <span className="text-xs">
                    SVG, PNG or JPG (max. 800x400px)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>

              <Separator className="col-span-2" />

              <FieldLabel>Role</FieldLabel>
              <Input
                value={profile?.role.name ?? ""}
                disabled
                className="bg-muted"
              />

              <Separator className="col-span-2" />

              <FieldLabel>Preferred Locale</FieldLabel>
              <Field>
                <Select
                  value={preferredLocale}
                  onValueChange={setPreferredLocale}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a locale" />
                  </SelectTrigger>
                  <SelectContent>
                    {locales.map((locale) => (
                      <SelectItem key={locale} value={locale}>
                        {locale}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
    </form>
  )
}

export default ProfileTab
