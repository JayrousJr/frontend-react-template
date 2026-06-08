import { requestPasswordReset } from "@/services/auth"
import { Form, useActionData, useNavigation, type ActionFunctionArgs } from "react-router"

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const email = formData.get("email") as string

  try {
    await requestPasswordReset(email)
    return { success: true }
  } catch {
    return { success: false, error: "Could not send reset email. Try again." }
  }
}

const ForgotPasswordPage = () => {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  if (actionData?.success) {
    return <div>Check your email for a password reset link.</div>
  }

  return (
    <div>
      <h1>Forgot password</h1>
      <Form method="post">
        <input type="email" name="email" required placeholder="Email" />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset link"}
        </button>
      </Form>
      {actionData?.error && <p>{actionData.error}</p>}
    </div>
  )
}

export default ForgotPasswordPage
