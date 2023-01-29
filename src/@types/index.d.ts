declare type Maybe<T> = T | null | undefined

declare type Subject = {
  collectionId: string
  collectionName: string
  id: string
  name: string
  teacher: string
  created: string
  updated: string
}

declare type Teacher = {
  collectionId: string
  collectionName: string
  id: string
  name: string
  email: string
  website: Maybe<string>
  image: Maybe<string>
  created: string
  updated: string
}

declare type Resource = {
  collectionId: string
  collectionName: string
  id: string
  file: string
  name: string
  subject: string
  created: string
  updated: string
}

declare type Assignment = {
  collectionId: string
  collectionName: string
  id: string
  title: string
  dueDate: string
  content: string
  subject: string
  created: string
  updated: string
}

declare type AssignmentResource = {
  collectionId: string
  collectionName: string
  id: string
  assignment: string
  resource: string
  created: string
  updated: string
}
