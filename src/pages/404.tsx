import Title from '@/components/util/Title'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PREVIOUS_PAGE = -1

export default function NotFound() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([] as string[])

  useEffect(() => {
    const interval = setInterval(() => {
      const TERMINAL_MESSAGES = [
        '$ ls',
        'Você acessou uma página não mapeada! :(',
        '$ cd ..',
        'Você ainda pode voltar para a página anterior!',
        'É só clicar no botão vermelho!',
      ]

      if (messages.length === TERMINAL_MESSAGES.length) {
        clearInterval(interval)
        return
      }

      setMessages((messages) => TERMINAL_MESSAGES.slice(0, messages.length + 1))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Title>404 | Temos um problema aqui!</Title>
      <div className="bg-zinc-100 w-full h-screen grid place-items-center">
        <div className="p-4 rounded bg-white relative shadow-xl w-full max-w-md">
          <div className="mb-2 grid grid-cols-3 items-center">
            <div className="flex gap-1">
              <div className="relative">
                <div className="absolute rounded-full w-3 h-3 bg-red-600 animate-ping"></div>
                <button
                  onClick={() => navigate(PREVIOUS_PAGE)}
                  className="relative z-10 block rounded-full w-3 h-3 bg-red-600"
                ></button>
              </div>
              <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
              <div className="rounded-full w-3 h-3 bg-green-600"></div>
            </div>
            <p className="tracking-tight text-sm text-zinc-600">
              Não encontrado!
            </p>
          </div>
          <div className="h-32 p-4 w-full bg-zinc-900 font-mono rounded text-xs text-zinc-300">
            <ul className="grid gap-1">
              {messages.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
