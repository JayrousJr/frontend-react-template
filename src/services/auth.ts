// Auth operations go through direct fetch — not the GraphQL gateway.

export async function requestPasswordReset(email: string): Promise<void> {
  const res = await fetch("/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) throw new Error("Failed to send reset email")
}

export async function resetPassword(
  token: string,
  password: string
): Promise<void> {
  const res = await fetch("/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  })
  if (!res.ok) throw new Error("Failed to reset password")
}
