import { client } from '@/pocketbase/client'

type SubjectWithTeacher = Subject & {
  expand: {
    teacher: Teacher
  }
}

export const getSubjectsWithTeacher = async () => {
  const subjects = await client
    .collection('subjects')
    .getList<SubjectWithTeacher>(1, 30, {
      expand: 'teacher',
    })

  return subjects.items.map((subject) => ({
    collectionName: subject.collectionName,
    collectionId: subject.collectionId,
    id: subject.id,
    name: subject.name,
    teacher: subject.expand.teacher,
    created: subject.created,
    updated: subject.updated,
  }))
}

type SubjectWithTeacherResourcesAndAssignments = Subject & {
  expand: {
    teacher: Teacher
    'resources(subject)': Resource[] | undefined
    'assignments(subject)': Assignment[] | undefined
  }
}

export const getSubjectWithTeacherAndResources = async (id: string) => {
  const subject = await client
    .collection('subjects')
    .getOne<SubjectWithTeacherResourcesAndAssignments>(id, {
      expand: 'teacher,resources(subject),assignments(subject)',
    })

  return {
    collectionName: subject.collectionName,
    collectionId: subject.collectionId,
    id: subject.id,
    name: subject.name,
    teacher: subject.expand.teacher,
    resources: subject.expand['resources(subject)'] || [],
    assignments: subject.expand['assignments(subject)'] || [],
    created: subject.created,
    updated: subject.updated,
  }
}
