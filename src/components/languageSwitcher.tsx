import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { fetchSupportedLocales, updateProfile } from "@/services/account"
import { useAuth, type User } from "@/context/auth-context"
import { languageLogos } from "@/config/languageLogos"
import { fetchMe } from "@/services/auth"
import { toast } from "sonner"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [locales, setLocale] = useState<string[]>([])
  const { refreshUser, user } = useAuth()

  // 1. Fetch available backend locales on mount
  useEffect(() => {
    async function load() {
      try {
        const localeData = await fetchSupportedLocales()
        setLocale(localeData)
      } catch (error) {
        console.error("Failed to load locales", error)
      }
    }
    void load()
  }, [])

  // 2. Sync client i18n instance whenever the user profile's locale loads or changes
  useEffect(() => {
    if (user?.preferredLocale) {
      i18n.changeLanguage(user.preferredLocale)
    }
  }, [user?.preferredLocale, i18n])

  // Get the current active icon
  const activeLocale = user?.preferredLocale || i18n.resolvedLanguage || "en"
  const currentLogo = languageLogos[activeLocale]

  async function handleLanguageChange(language: string) {
    await i18n.changeLanguage(language)

    if (!user) return

    try {
      const res = await updateProfile({
        uniqueId: user.uniqueId,
        preferredLocale: language,
      })
      await refreshUser()
      toast.success(res.updateUser.message)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <img
            src={currentLogo}
            alt={`${activeLocale} flag`}
            className="h-6 w-6 rounded-sm object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuGroup>
          {locales.map((language) => {
            const languageUrl = languageLogos[language]
            return (
              <DropdownMenuItem
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={`my-0.5 flex cursor-pointer items-center gap-2 ${
                  activeLocale === language ? "bg-accent font-semibold" : ""
                }`}
              >
                <img
                  src={languageUrl}
                  alt=""
                  className="h-5 w-5 rounded-xs object-cover"
                />
                <span className="text-sm uppercase">{language}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher
