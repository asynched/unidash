import { authStore } from '@/stores/auth'
import { useObservable } from '@/hooks/common'

export function useAuth() {
  const { user } = useObservable(authStore)

  return user!
}
