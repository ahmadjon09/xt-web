import React from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../components/Nav'
export const RootLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}
