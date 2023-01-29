import { useRef } from 'react'
import { preventDefault } from '@/utils/ui'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '@/pocketbase/cases/auth'

import Title from '@/components/util/Title'

export default function Login() {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSignUp = () => {
    const data = new FormData(formRef.current!)

    signIn({
      email: data.get('email') as string,
      password: data.get('password') as string,
    }).then(() => navigate('/dash'))
  }

  return (
    <>
      <Title>UniDash | Login</Title>
      <div className="w-full h-screen grid place-items-center bg-zinc-100 text-zinc-600">
        <main className="px-12 py-20 rounded-lg bg-white shadow-xl">
          <h1 className="mb-2 text-4xl font-bold tracking-tighter text-center text-zinc-900">
            Login
          </h1>
          <p className="mb-8 text-center tracking-tight">
            Entre ou cadastre-se para ter acesso
          </p>
          <form
            className="mb-8 flex flex-col gap-4"
            ref={formRef}
            onSubmit={preventDefault(handleSignUp)}
          >
            <input
              className="py-2 px-4 border rounded outline-none transition ease-in-out focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              type="text"
              name="email"
              placeholder="você@mail.com"
            />
            <input
              className="py-2 px-4 border rounded outline-none transition ease-in-out focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              type="password"
              name="password"
              placeholder="********"
            />
            <button
              className="py-2 bg-zinc-900 text-white rounded transition ease-in-out hover:bg-zinc-800"
              type="submit"
            >
              Entrar
            </button>
          </form>
          <div className="text-center tracking-tight">
            <p>Ainda não possui uma conta?</p>
            <Link className="text-zinc-900 hover:underline" to="/register">
              Cadastre-se
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
