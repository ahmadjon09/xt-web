import React from 'react'
import { Link } from 'react-router-dom'
import Page404 from '../assets/images/404-page.png'
export const Error = () => {
  return (
    <section className='h-screen bg-[#241b2a]'>
      <div className='container h-full flex items-center justify-center flex-col gap-5'>
        <img src={Page404} alt='404' />
        <Link
          to={'/'}
          className='border hover:scale-105 transition-all duration-200 py-2 px-5 font-bold text-white rounded-3xl'
        >
          Go Home
        </Link>
      </div>
    </section>
  )
}
