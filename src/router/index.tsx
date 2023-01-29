import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { middlewares, publicOnly, authOnly } from '@/router/loaders'

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dash from '@/pages/dash'
import Teachers from '@/pages/dash/teachers'
import Teacher from '@/pages/dash/teachers/[id]'
import Subjects from '@/pages/dash/subjects'
import Subject from '@/pages/dash/subjects/[id]'
import Assignments from '@/pages/assignments'
import NotFound from '@/pages/404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    loader: middlewares(publicOnly),
  },
  {
    path: '/register',
    element: <Register />,
    loader: middlewares(publicOnly),
  },
  {
    path: '/dash',
    element: <Dash />,
    loader: middlewares(authOnly),
  },
  {
    path: '/dash/teachers',
    element: <Teachers />,
    loader: middlewares(authOnly),
  },
  {
    path: '/dash/teachers/:id',
    element: <Teacher />,
    loader: middlewares(authOnly),
  },
  {
    path: '/dash/subjects',
    element: <Subjects />,
    loader: middlewares(authOnly),
  },
  {
    path: '/dash/subjects/:id',
    element: <Subject />,
    loader: middlewares(authOnly),
  },
  {
    path: '/dash/assignments',
    element: <Assignments />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
