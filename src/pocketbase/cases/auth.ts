import { client } from '@/pocketbase/client'

type SignInDto = {
  email: string
  password: string
}

type SignUpDto = {
  email: string
  password: string
  name: string
}

export const signIn = async ({ email, password }: SignInDto) => {
  return await client.collection('users').authWithPassword(email, password)
}

export const signUp = async ({ email, password, name }: SignUpDto) => {
  return await client.collection('users').create({
    email,
    password,
    passwordConfirm: password,
    name,
  })
}

export const signOff = () => {
  client.authStore.clear()
}
