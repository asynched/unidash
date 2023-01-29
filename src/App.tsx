import Router from '@/router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Router />
    </QueryClientProvider>
  )
}
