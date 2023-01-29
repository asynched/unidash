import { createObservable } from '@/hooks/common'
import { client, User } from '@/pocketbase/client'

export const authStore = createObservable({
  user: null as Maybe<User>,
})

client.authStore.onChange((_, user) => {
  authStore.update({
    user,
  })
}, true)
