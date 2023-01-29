import { useQuery } from '@tanstack/react-query'

import Dashboard from '@/layouts/Dashboard'
import { getSubjectsWithTeacher } from '@/pocketbase/cases/subjects'
import Show from '@/components/util/Show'
import { Link } from 'react-router-dom'
import { randomAvatar } from '@/utils/images'

export default function Subjects() {
  const { data: subjects } = useQuery(['subjects'], getSubjectsWithTeacher, {
    initialData: [],
  })

  return (
    <Dashboard title="Hello!">
      <h1 className="text-4xl font-bold tracking-tighter text-zinc-900">
        Matérias
      </h1>
      <p className="mb-8">Veja a lista de matérias desse semestre</p>
      <Show when={subjects.length > 0}>
        <ul className="grid gap-4 grid-cols-4">
          {subjects.map((subject) => (
            <li
              className="p-4 rounded-lg flex items-start gap-2 bg-white shadow-xl shadow-zinc-600/10"
              key={subject.id}
            >
              <img
                src={randomAvatar(subject.teacher.name)}
                alt={subject.teacher.name}
                className="rounded-full w-12 h-12"
              />
              <div className="flex flex-col">
                <Link
                  to={`/dash/subjects/${subject.id}`}
                  className="text-lg font-bold tracking-tight leading-none mb-1 text-zinc-900"
                >
                  {subject.name}
                </Link>
                <Link
                  to={`/dash/teachers/${subject.teacher.id}`}
                  className="text-sm"
                >
                  {subject.teacher.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Show>
    </Dashboard>
  )
}
