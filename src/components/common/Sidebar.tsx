import { Link, useNavigate } from 'react-router-dom'
import { signOff } from '@/pocketbase/cases/auth'
import {
  HomeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const navigate = useNavigate()

  const handleSignOff = () => {
    signOff()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 w-48 bg-zinc-900 border-zinc-800 text-zinc-300 px-4 pt-8 pb-4 flex flex-col h-screen">
      <Link to="/dash" className="mb-8 relative mx-auto">
        <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-pink-600 rounded absolute top-0"></div>
        <h1 className="relative text-4xl font-bold tracking-tighter text-white">
          UniDash
        </h1>
      </Link>
      <ul className="grid gap-2">
        <li>
          <Link
            to="/dash"
            className="py-2 px-3 rounded border border-transparent transition ease-in-out hover:border-zinc-700 hover:bg-zinc-800 flex gap-2 items-center"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Página inicial</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dash/subjects"
            className="py-2 px-3 rounded border border-transparent transition ease-in-out hover:border-zinc-700 hover:bg-zinc-800 flex gap-2 items-center"
          >
            <AcademicCapIcon className="w-5 h-5" />
            <span>Matérias</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dash/teachers"
            className="py-2 px-3 rounded border border-transparent transition ease-in-out hover:border-zinc-700 hover:bg-zinc-800 flex gap-2 items-center"
          >
            <UserGroupIcon className="w-5 h-5" />
            <span>Professores</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dash/assignments"
            className="py-2 px-3 rounded border border-transparent transition ease-in-out hover:border-zinc-700 hover:bg-zinc-800 flex gap-2 items-center"
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Atividades</span>
          </Link>
        </li>
      </ul>
      <button
        onClick={handleSignOff}
        className="mt-auto flex text-center bg-zinc-800 py-2 px-4 rounded justify-center items-center gap-1 transition ease-in-out border border-transparent hover:bg-zinc-800 hover:border-zinc-700"
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
        <span>Sair</span>
      </button>
    </nav>
  )
}
