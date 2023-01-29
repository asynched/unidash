import { useQuery } from '@tanstack/react-query'
import { randomAvatar } from '@/utils/images'
import { getTeachers } from '@/pocketbase/cases/teachers'

import { Link } from 'react-router-dom'
import Dashboard from '@/layouts/Dashboard'

export default function Teachers() {
  const { data: teachers } = useQuery(['teachers'], getTeachers, {
    initialData: [],
  })

  return (
    <Dashboard title="UniDash | Professores">
      <h1 className="text-4xl font-bold tracking-tighter text-zinc-900">
        Professores
      </h1>
      <p className="mb-8 tracking-tight">Lista de professores do semestre</p>
      <ul className="grid grid-cols-4 gap-4">
        {teachers.map((teacher) => (
          <li
            className="p-4 shadow-xl shadow-zinc-600/10 bg-white rounded flex gap-2"
            key={teacher.id}
          >
            <img
              src={randomAvatar(teacher.name)}
              alt={teacher.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <Link
                className="text-lg font-bold tracking-tight text-zinc-900"
                to={`/dash/teachers/${teacher.id}`}
              >
                {teacher.name}
              </Link>
              <a
                className="break-all text-sm tracking-tight"
                href={`mailto:${teacher.email}`}
              >
                {teacher.email}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </Dashboard>
  )
}
