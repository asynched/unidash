import { client } from '@/pocketbase/client'

export const getAssignmentsStats = async () => {
  const [total, active, completed] = await Promise.all([
    getTotalAssignments(),
    getActiveAssignments(),
    getCompletedAssignments(),
  ])

  return {
    total,
    active,
    completed,
  }
}

export const getTotalAssignments = async () => {
  const totalAssignments = await client.collection('assignments').getList(1, 1)
  return totalAssignments.totalItems
}

export const getActiveAssignments = async () => {
  const date = new Date()
  const activeAssignments = await client
    .collection('assignments')
    .getList(1, 1, {
      filter: `dueDate > "${date.toISOString()}"`,
    })

  return activeAssignments.totalItems
}

export const getCompletedAssignments = async () => {
  const date = new Date()
  const completedAssignments = await client
    .collection('assignments')
    .getList(1, 1, {
      filter: `dueDate < "${date.toISOString()}"`,
    })

  return completedAssignments.totalItems
}

type AssignmentWithSubject = Assignment & {
  expand: {
    subject: Subject
  }
}

export const getAssignments = async () => {
  const assignments = await client
    .collection('assignments')
    .getList<AssignmentWithSubject>(1, 30, {
      expand: 'subject',
    })

  return assignments.items.map((assignment) => ({
    collectionId: assignment.collectionId,
    collectionName: assignment.collectionName,
    id: assignment.id,
    title: assignment.title,
    content: assignment.content,
    dueDate: assignment.dueDate,
    subject: assignment.expand.subject,
    created: assignment.created,
    updated: assignment.updated,
  }))
}
