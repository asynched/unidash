type MaybeProps<T> = {
  when: Maybe<T>
  fallback?: React.ReactNode
  children: (data: T) => React.ReactNode
}

export default function Maybe<T>({ children, when, fallback }: MaybeProps<T>) {
  if (!when) return <>{fallback}</>

  return <>{children(when)}</>
}
