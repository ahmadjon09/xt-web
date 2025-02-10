import React, { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './Page/Home'
import { RootLayout } from './Layout/RootLayout'
import { AuthLayout } from './Layout/AuthLayout'
import { Login } from './Auth/Login'
import { Error } from './err/Err'

export const App = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('user'))

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(!!localStorage.getItem('user'))
    }

    window.addEventListener('storage', checkAuth)

    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const router = createBrowserRouter(
    isAuth
      ? [
          {
            path: '/',
            element: <RootLayout />,
            children: [
              { index: true, element: <Home /> },
              { path: '*', element: <Error /> }
            ]
          }
        ]
      : [
          {
            path: '/',
            element: <AuthLayout />,
            children: [
              { index: true, element: <Login /> },
              { path: '*', element: <Error /> }
            ]
          }
        ]
  )

  return <RouterProvider router={router} />
}
