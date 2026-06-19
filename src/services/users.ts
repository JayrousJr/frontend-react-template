import { gql } from "./api"
import { GET_USERS } from "./queries"
import { UPDATE_USER, DELETE_USER } from "./mutations"

// Types

type Role = {
  uniqueId: string
  name: string
  description: string
}

type Permission = {
  uniqueId: string
  name: string
  description: string
}

type Avatar = {
  uniqueId: string
  size: number
  uri: string
}

export type User = {
  uniqueId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  email: string
  firstName: string
  lastName: string
  role: Role
  tenantId: string | null
  permissions: Permission[]
  allPermissions: Permission[]
  preferredLocale: string
  emailVerifiedAt: string | null
  avatar: Avatar | null
}

type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

type PaginationInput = {
  page?: number
  limit?: number
}

type UserFilterInput = {
  uniqueId?: string
  isActive?: boolean
  name?: string
}

type UserOrderInput = {
  field?: string
  direction?: "ASC" | "DESC"
}

// Queries

export async function fetchUsers(
  pagination?: PaginationInput,
  filter?: UserFilterInput,
  orderBy?: UserOrderInput
): Promise<PaginatedResponse<User>> {
  const data = await gql<
    { getUsers: PaginatedResponse<User> },
    { pagination?: PaginationInput; filter?: UserFilterInput; orderBy?: UserOrderInput }
  >(GET_USERS, { pagination, filter, orderBy })
  return data.getUsers
}

export async function fetchUser(uniqueId: string): Promise<User> {
  const data = await gql<
    { getUsers: PaginatedResponse<User> },
    { filter: UserFilterInput }
  >(GET_USERS, { filter: { uniqueId } })
  return data.getUsers.data[0]
}

// Mutations

type UpdateUserInput = {
  uniqueId: string
  firstName?: string
  lastName?: string
  email?: string
  preferredLocale?: string
  avatarUniqueId?: string
}

type UserMutationResponse = {
  message: string
  data: User
}

export async function updateUser(
  input: UpdateUserInput
): Promise<UserMutationResponse> {
  const data = await gql<
    { updateUser: UserMutationResponse },
    { updateUserInput: UpdateUserInput }
  >(UPDATE_USER, { updateUserInput: input })
  return data.updateUser
}

export async function deleteUser(uniqueId: string): Promise<void> {
  await gql<{ deleteUser: boolean }, { uniqueId: string }>(DELETE_USER, {
    uniqueId,
  })
}
