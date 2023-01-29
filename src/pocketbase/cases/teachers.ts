import { client } from '@/pocketbase/client'

type TeacherWithSubjects = Teacher & {
  expand: {
    subjects: Subject[]
  }
}

export const getTeachersWithSubjects = async () => {
  const teachers = await client
    .collection('teachers')
    .getList<TeacherWithSubjects>(1, 30, {
      expand: 'subjects',
    })

  return teachers.items.map((teacher) => ({
    collectionId: teacher.collectionId,
    collectionName: teacher.collectionName,
    id: teacher.id,
    name: teacher.name,
    email: teacher.email,
    image: teacher.image,
    website: teacher.website,
    subjects: teacher.expand.subjects,
    created: teacher.created,
    updated: teacher.updated,
  }))
}

export const getTeachers = async () => {
  const teachers = await client.collection('teachers').getList<Teacher>(1, 30)

  return teachers.items
}

type SingleTeacherWithSubjects = Teacher & {
  expand: {
    'subjects(teacher)': Subject[] | undefined
  }
}

export const getTeacherWithSubjects = async (id: string) => {
  const teacher = await client
    .collection('teachers')
    .getOne<SingleTeacherWithSubjects>(id, {
      expand: 'subjects(teacher)',
    })

  return {
    collectionId: teacher.collectionId,
    collectionName: teacher.collectionName,
    id: teacher.id,
    name: teacher.name,
    email: teacher.email,
    image: teacher.image,
    website: teacher.website,
    subjects: teacher.expand['subjects(teacher)'] || [],
    created: teacher.created,
    updated: teacher.updated,
  }
}
