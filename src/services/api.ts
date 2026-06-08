//   GraphQL Gateway
type GQLError = {
  message: string
  locations?: Array<{ line: number; column: number }>
  path?: string[]
}

type GQLResponse<TData> = {
  data?: TData
  errors?: GQLError[]
}

/**
Thrown when the server returns a 200 with an errors array.
Distinguishes GraphQL validation/resolver errors from network failures.
 */
export class GraphQLRequestError extends Error {
  readonly errors: GQLError[]

  constructor(errors: GQLError[]) {
    super(errors.map((e) => e.message).join("\n"))
    this.name = "GraphQLRequestError"
    this.errors = errors
  }
}

/** AUTH STRATEGY */

const AUTH_STRATEGY = import.meta.env.VITE_AUTH_STRATEGY

// jwt access token
let accessToken: string | null = null

// Called from auth-context after login and silent token refresh .
export function setAccessToken(token: string | null) {
  accessToken = token
}

function getCredentials(): Partial<RequestInit> {
  if (AUTH_STRATEGY === "session") {
    return { credentials: "include" }
  }
  //for jwt auth strategy
  return accessToken
    ? { headers: { Authorization: `Bearer ${accessToken}` } }
    : {}
}

export async function gql<TData, TVariables = Record<string, unknown>>(
  document: string,
  variables?: TVariables
): Promise<TData> {
  const { headers: authHeaders, ...restCredentials } = getCredentials() as {
    headers?: Record<string, string>
    credentials?: RequestCredentials
  }

  const response = await fetch(import.meta.env.VITE_GRAPHQL_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({ query: document, variables }),
    ...restCredentials,
  })

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`)
  }

  const json = (await response.json()) as GQLResponse<TData>

  if (json.errors?.length) {
    throw new GraphQLRequestError(json.errors)
  }

  return json.data as TData
}
