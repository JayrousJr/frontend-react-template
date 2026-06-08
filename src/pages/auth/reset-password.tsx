import { resetPassword } from "@/services/auth"
import { ROUTES } from "@/routes/routeConstants"
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
  type ActionFunctionArgs,
} from "react-router"

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const token = formData.get("token") as string
  const password = formData.get("password") as string

  try {
    await resetPassword(token, password)
    return redirect(ROUTES.LOGIN)
  } catch {
    return { error: "Invalid or expired reset link. Request a new one." }
  }
}

const ResetPasswordPage = () => {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const [searchParams] = useSearchParams()

  const token = searchParams.get("token")
  const isSubmitting = navigation.state === "submitting"

  if (!token) {
    return <div>Invalid reset link. Please request a new one.</div>
  }

  return (
    <div>
      <h1>Set new password</h1>
      <Form method="post">
        <input type="hidden" name="token" value={token} />
        <input
          type="password"
          name="password"
          required
          placeholder="New password"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Reset password"}
        </button>
      </Form>
      {actionData?.error && <p>{actionData.error}</p>}
    </div>
  )
}

export default ResetPasswordPage
