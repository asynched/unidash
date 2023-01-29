import Dashboard from '@/layouts/Dashboard'
import { getAssignments } from '@/pocketbase/cases/assignments'
import { formatDate } from '@/utils/dates'
import { truncate } from '@/utils/strings'
import { useQuery } from '@tanstack/react-query'

export default function Assignments() {
  const { data: assignments } = useQuery(['assignments'], getAssignments, {
    initialData: [],
  })

  return (
    <Dashboard title="UniDash | Atividades">
      <h1 className="text-4xl font-bold tracking-tighter text-zinc-900">
        Atividades
      </h1>
      <p className="mb-8">Veja as atividades ativas</p>
      <ul className="grid grid-cols-4 gap-4">
        {assignments.map((assignment) => (
          <li
            className="p-4 bg-white rounded shadow-xl shadow-zinc-600/10"
            key={assignment.id}
          >
            <h2 className="mb-1 text-lg font-bold tracking-tight text-zinc-900 leading-none">
              {assignment.title}
            </h2>
            <p className="tracking-tight">{truncate(assignment.content, 32)}</p>
            <p className="tracking-tight text-sm">
              {formatDate(assignment.dueDate)}
            </p>
          </li>
        ))}
      </ul>
    </Dashboard>
  )
}
