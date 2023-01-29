import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { randomAvatar } from '@/utils/images'
import { getTeacherWithSubjects } from '@/pocketbase/cases/teachers'

import Dashboard from '@/layouts/Dashboard'
import Maybe from '@/components/util/Maybe'
import Show from '@/components/util/Show'
import React, { useEffect } from 'react'

type TeacherParams = {
  id: string
}

export default function Teacher() {
  const params = useParams() as TeacherParams
  const { data: teacher } = useQuery(['teachers', params.id], () =>
    getTeacherWithSubjects(params.id)
  )

  return (
    <Dashboard title="UniDash | Professores">
      <Maybe when={teacher}>
        {(teacher) => (
          <div className="flex gap-4">
            <img
              src={randomAvatar(teacher.name)}
              alt={teacher.name}
              className="w-48 h-48 rounded-full"
            />
            <div className="flex-1">
              <h1 className="mb-2 text-4xl font-bold tracking-tighter text-zinc-900">
                {teacher.name}
              </h1>
              <p className="tracking-tight">
                E-mail:{' '}
                <a
                  href={`mailto:${teacher.email}`}
                  className="text-zinc-900 hover:underline"
                >
                  {teacher.email}
                </a>
              </p>
              <p className="mb-8 tracking-tight">
                Website:{' '}
                <Show when={!!teacher.website} fallback={'Não possui'}>
                  <a href={teacher.website!}>{teacher.website}</a>
                </Show>
              </p>
              <SubjectsSection teacher={teacher} />
            </div>
          </div>
        )}
      </Maybe>
    </Dashboard>
  )
}

type ResourcesSectionProps = {
  teacher: Teacher & {
    subjects: Subject[]
  }
}

const SubjectsSection: React.FC<ResourcesSectionProps> = ({ teacher }) => {
  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tighter text-zinc-900">
        Disciplinas
      </h2>
      <p className="mb-4 tracking-tight">Lista de disciplinas do professor</p>
      <Show
        when={teacher.subjects.length > 0}
        fallback={
          <div className="border-2 border-dashed py-4 px-8 text-center">
            Nenhuma matéria atribuída
          </div>
        }
      >
        <ul className="grid grid-cols-2 gap-4">
          {teacher.subjects.map((subject) => (
            <li
              key={subject.id}
              className="p-4 bg-white rounded shadow-xl shadow-zinc-600/10"
            >
              <Link
                to={`/dash/subjects/${subject.id}`}
                className="text-lg font-bold tracking-tight text-zinc-900"
              >
                {subject.name}
              </Link>
              <p className="text-sm tracking-tight">{teacher.name}</p>
            </li>
          ))}
        </ul>
      </Show>
    </section>
  )
}
