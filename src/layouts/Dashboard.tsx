import Sidebar from '@/components/common/Sidebar'
import { useEffect } from 'react'

type DashboardProps = {
  children: React.ReactNode
  title: string
}

export default function Dashboard({ children, title }: DashboardProps) {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className="w-full min-h-screen relative flex text-zinc-600 bg-zinc-100">
      <Sidebar />
      <main className="p-8 flex-1 max-w-screen-xl mx-auto">{children}</main>
    </div>
  )
}
