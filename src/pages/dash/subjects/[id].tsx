import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { randomAvatar } from '@/utils/images'
import { getSubjectWithTeacherAndResources } from '@/pocketbase/cases/subjects'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Dashboard from '@/layouts/Dashboard'
import Maybe from '@/components/util/Maybe'
import Show from '@/components/util/Show'
import React from 'react'
import { formatDate } from '@/utils/dates'
import { POCKETBASE_URL } from '@/config/env'

type SubjectParams = {
  id: string
}

export default function Subject() {
  const params = useParams() as SubjectParams
  const { data: subject } = useQuery(['subject', params.id], () =>
    getSubjectWithTeacherAndResources(params.id)
  )

  return (
    <Dashboard title="UniDash | Matérias">
      <Maybe when={subject}>
        {(subject) => (
          <div className="flex gap-4">
            <img
              src={randomAvatar(subject.teacher.name)}
              alt={subject.name}
              className="w-48 h-48 rounded-full"
            />
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-bold tracking-tighter text-zinc-900">
                {subject.name}
              </h1>
              <Link
                to={`/dash/teachers/${subject.teacher.id}`}
                className="mb-2 text-3xl tracking-tighter font-bold text-zinc-900 flex items-start gap-1"
              >
                {subject.teacher.name}
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </Link>
              <p className="tracking-tight">
                E-mail:&nbsp;
                <a
                  className="text-zinc-900 hover:underline"
                  href={`mailto:${subject.teacher.email}`}
                >
                  {subject.teacher.email}
                </a>
              </p>
              <p className="mb-8 tracking-tight">
                Website:&nbsp;
                <Show when={!!subject.teacher.website} fallback={'Não possui'}>
                  <a href={subject.teacher.website!}>
                    {subject.teacher.website}
                  </a>
                </Show>
              </p>
              <ResourcesSection subject={subject} />
              <section>
                <h2 className="text-3xl font-bold tracking-tighter text-zinc-900">
                  Atividades
                </h2>
                <p className="mb-4">Lista de atividades pendentes</p>
                <Show
                  when={subject.assignments.length > 0}
                  fallback={
                    <div className="border-2 border-dashed p-4 rounded text-center">
                      Nenhuma atividade pendente
                    </div>
                  }
                >
                  <ul className="grid grid-cols-2">
                    {subject.assignments
                      .filter((a) => new Date(a.dueDate) > new Date())
                      .map((assignment) => (
                        <li
                          key={assignment.id}
                          className="p-4 bg-white rounded shadow-xl shadow-zinc-600/10"
                        >
                          <Link
                            className="block text-lg font-bold tracking-tight text-zinc-900"
                            to={`/dash/assignments/${assignment.id}`}
                          >
                            {assignment.title}
                          </Link>
                          <p className="text-sm tracking-tight">
                            Entrega: {formatDate(assignment.dueDate)}
                          </p>
                        </li>
                      ))}
                  </ul>
                </Show>
              </section>
            </div>
          </div>
        )}
      </Maybe>
    </Dashboard>
  )
}

type ResourcesSectionProps = {
  subject: Omit<Subject, 'teacher'> & {
    resources: Resource[]
    teacher: Teacher
  }
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  subject: subject,
}) => {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-3xl font-bold tracking-tighter text-zinc-900">
        Materiais
      </h2>
      <Show
        when={subject.resources.length > 0}
        fallback={
          <div className="border-2 w-full border-dashed p-4 text-center rounded">
            Nenhum material disponibilizado
          </div>
        }
      >
        <ul className="grid grid-cols-2 gap-4">
          {subject.resources.map((resource) => (
            <li
              className="p-4 rounded bg-white shadow-xl shadow-zinc-600/10"
              key={resource.id}
            >
              <a
                href={`${POCKETBASE_URL}/api/files/${resource.collectionId}/${resource.id}/${resource.file}`}
                className="text-zinc-900 text-lg font-bold tracking-tight"
              >
                {resource.name}
              </a>
              <p className="text-sm tracking-tight">
                Por: {subject.teacher.name}
              </p>
            </li>
          ))}
        </ul>
      </Show>
    </section>
  )
}
