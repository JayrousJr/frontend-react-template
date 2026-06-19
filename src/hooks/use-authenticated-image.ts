import { useEffect, useState } from "react"
import { api } from "@/services/api"

export function useAuthenticatedImage(url: string | null | undefined) {
  const [src, setSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!url) {
      setSrc(undefined)
      return
    }

    let revoke: string | undefined
    const controller = new AbortController()

    api
      .get(url, { responseType: "blob", signal: controller.signal })
      .then(({ data }) => {
        const objectUrl = URL.createObjectURL(data)
        revoke = objectUrl
        setSrc(objectUrl)
      })
      .catch(() => {
        setSrc(undefined)
      })

    return () => {
      controller.abort()
      if (revoke) URL.revokeObjectURL(revoke)
    }
  }, [url])

  return src
}
