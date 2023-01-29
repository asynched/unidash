import { LoaderFunction, redirect } from 'react-router-dom'
import { authStore } from '@/stores/auth'

type Middleware = (next: () => void) => unknown

export const publicOnly: Middleware = (next) => {
  const { user } = authStore.get()

  if (user) {
    return redirect('/dash')
  }

  return next()
}

export const authOnly: Middleware = (next) => {
  const { user } = authStore.get()

  if (!user) {
    return redirect('/')
  }

  if (!user.verified) {
    return redirect('/')
  }

  return next()
}

export const middlewares = (
  ...middlewares: Array<Middleware>
): LoaderFunction => {
  return async () => {
    let output = null as unknown

    for (const middleware of middlewares) {
      let stop = true

      const next = () => {
        stop = false
        return null
      }

      output = await middleware(next)

      if (stop) {
        return output
      }
    }

    return output
  }
}
