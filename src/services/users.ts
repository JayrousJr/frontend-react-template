import { gql } from "./api"

// Types

type User = {
  id: string
  name: string
  email: string
  role: string
}

// Queries

const GET_USERS = `
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`

const GET_USER = `
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      role
    }
  }
`

export async function fetchUsers(): Promise<User[]> {
  const data = await gql<{ users: User[] }>(GET_USERS)
  return data.users
}

export async function fetchUser(id: string): Promise<User> {
  const data = await gql<{ user: User }, { id: string }>(GET_USER, { id })
  return data.user
}

//  Mutations

const UPDATE_USER = `
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      role
    }
  }
`

const DELETE_USER = `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

type UpdateUserInput = Partial<Pick<User, "name" | "email">>

export async function updateUser(
  id: string,
  input: UpdateUserInput
): Promise<User> {
  const data = await gql<
    { updateUser: User },
    { id: string; input: UpdateUserInput }
  >(UPDATE_USER, { id, input })
  return data.updateUser
}

export async function deleteUser(id: string): Promise<void> {
  await gql<{ deleteUser: { id: string } }, { id: string }>(DELETE_USER, {
    id,
  })
}
