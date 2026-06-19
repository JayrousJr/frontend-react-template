import axios from "axios"

//  Axios instances

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
})

export const graphql = axios.create({
  baseURL: import.meta.env.VITE_GRAPHQL_URL as string,
  withCredentials: true,
})

//  Auth strategy (JWT token management)

const AUTH_STRATEGY = import.meta.env.VITE_AUTH_STRATEGY

let accessToken: string | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

graphql.interceptors.request.use((config) => {
  if (AUTH_STRATEGY !== "session" && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.request.use((config) => {
  if (AUTH_STRATEGY !== "session" && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

//  Error interceptor: surface backend error messages

api.interceptors.response.use(undefined, (error) => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return Promise.reject(new Error(error.response.data.message))
  }
  return Promise.reject(error)
})

//  GraphQL gateway

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
 * Thrown when the server returns a 200 with a GraphQL errors array.
 * Distinct from a network/HTTP failure.
 */
export class GraphQLRequestError extends Error {
  readonly errors: GQLError[]

  constructor(errors: GQLError[]) {
    super(errors.map((e) => e.message).join("\n"))
    this.name = "GraphQLRequestError"
    this.errors = errors
  }
}

export async function gql<TData, TVariables = Record<string, unknown>>(
  document: string,
  variables?: TVariables
): Promise<TData> {
  const { data: json } = await graphql.post<GQLResponse<TData>>("", {
    query: document,
    variables,
  })

  if (json.errors?.length) {
    throw new GraphQLRequestError(json.errors)
  }

  return json.data as TData
}
