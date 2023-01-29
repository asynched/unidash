import { signUp } from '@/pocketbase/cases/auth'
import { preventDefault } from '@/utils/ui'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  const handleSignUp = () => {
    const data = new FormData(formRef.current!)

    signUp({
      name: data.get('name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    }).then(() => navigate('/'))
  }

  return (
    <div className="w-full h-screen grid place-items-center bg-zinc-100 text-zinc-600">
      <div className="px-12 py-16 bg-white rounded-lg shadow-xl">
        <h1 className="mb-2 text-4xl font-bold tracking-tighter text-zinc-900 text-center">
          Cadastro
        </h1>
        <p className="text-center mb-8">Cadastre-se para ter acesso</p>
        <form
          className="grid gap-4 mb-8"
          onSubmit={preventDefault(handleSignUp)}
          ref={formRef}
        >
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Fulano de tal..."
            className="py-2 px-4 border rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="fulano@mail.com"
            className="py-2 px-4 border rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            className="py-2 px-4 border rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
          />
          <button
            type="submit"
            className="py-2 px-4 rounded bg-zinc-900 text-white transition ease-in-out hover:bg-zinc-800"
          >
            Enviar
          </button>
        </form>
        <p className="text-center">
          Já é cadastrado?
          <br />
          <Link className="text-zinc-900 hover:underline" to="/">
            Faça seu login aqui
          </Link>
        </p>
      </div>
    </div>
  )
}
