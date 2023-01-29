import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks/auth'
import { randomAvatar } from '@/utils/images'
import { getTeachers } from '@/pocketbase/cases/teachers'
import { getSubjectsWithTeacher } from '@/pocketbase/cases/subjects'
import { getAssignmentsStats } from '@/pocketbase/cases/assignments'

import { Link } from 'react-router-dom'
import Dashboard from '@/layouts/Dashboard'

export default function Dash() {
  const user = useAuth()

  return (
    <Dashboard title="UniDash | Dashboard">
      <h1 className="text-4xl font-bold tracking-tighter text-zinc-900">
        Dashboard
      </h1>
      <p className="mb-8 tracking-tight">
        Olá, {user.name}. O que temos pra hoje?
      </p>
      <AssignmentsSection />
      <SubjectsSection />
      <TeachersSection />
    </Dashboard>
  )
}

const AssignmentsSection: React.FC = () => {
  const { data: assignments } = useQuery(
    ['assignmentsStats'],
    getAssignmentsStats,
    {
      initialData: {
        total: 0,
        active: 0,
        completed: 0,
      },
    }
  )

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-3xl font-bold tracking-tighter text-zinc-900">
        Atividades
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl shadow-green-600/25">
          <h3 className="text-2xl font-bold tracking-tighter">Total</h3>
          <p className="tracking-tight text-lg">
            {assignments.total} atividades
          </p>
        </div>
        <div className="p-4 rounded bg-gradient-to-br from-pink-500 to-red-600 text-white shadow-xl shadow-red-600/25">
          <h3 className="text-2xl font-bold tracking-tighter">Ativos</h3>
          <p className="tracking-tight text-lg">
            {assignments.active} atividades
          </p>
        </div>
        <div className="p-4 rounded bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xl shadow-blue-600/25">
          <h3 className="text-2xl font-bold tracking-tighter">Finalizados</h3>
          <p className="tracking-tight text-lg">
            {assignments.completed} ativos
          </p>
        </div>
      </div>
    </section>
  )
}

const TeachersSection: React.FC = () => {
  const { data: teachers } = useQuery(['teachers'], getTeachers, {
    initialData: [],
  })

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold tracking-tighter text-zinc-900">
        Professores
      </h2>
      <p className="mb-4 tracking-tight">Seus professores do semestre.</p>
      <ul className="grid grid-cols-4 gap-4">
        {teachers.map((teacher) => (
          <li
            className="p-4 rounded-lg flex items-start gap-2 bg-white shadow-xl shadow-zinc-600/10"
            key={teacher.id}
          >
            <img
              src={randomAvatar(teacher.name)}
              alt={teacher.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <Link
                to={`/dash/teachers/${teacher.id}`}
                className="text-lg font-bold tracking-tight leading-none mb-1 text-zinc-900"
              >
                {teacher.name}
              </Link>
              <a
                href={`mailto:${teacher.email}`}
                className="text-sm text-zinc-600 hover:text-zinc-900 hover:underline break-all"
              >
                {teacher.email}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

const SubjectsSection: React.FC = () => {
  const { data: subjects } = useQuery(['subjects'], getSubjectsWithTeacher, {
    initialData: [],
  })

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold tracking-tighter text-zinc-900">
        Matérias
      </h2>
      <p className="mb-4 tracking-tight">
        Veja a lista de matérias desse semestre.
      </p>
      <ul className="grid grid-cols-4 gap-4">
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
    </section>
  )
}
