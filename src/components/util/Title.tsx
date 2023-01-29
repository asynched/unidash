import { useEffect } from 'react'

type TitleProps = {
  children: string | string[]
}

export default function Title({ children }: TitleProps) {
  useEffect(() => {
    document.title = Array.isArray(children) ? children.join(' ') : children
  }, [children])

  return null
}
