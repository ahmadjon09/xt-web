import React from 'react'
import GG from '../assets/images/gg.png'
import { LogOut } from 'lucide-react'
export const Nav = () => {
  const user = localStorage.getItem('user')
  const handleLogout = () => {
    window.location = '/'
    localStorage.removeItem('user')
  }

  return (
    <nav className='w-full h-[43px] container'>
      <div className='w-full border-b flex items-center justify-center text-white text-xl h-10 border-white'>
        <div className='relative w-full flex items-center justify-center'>
          <div className='relative'>
            {user}
            <img
              className='absolute w-2.5 z-10 top-1.5 -right-3'
              src={GG}
              alt='admin'
            />
          </div>
          <button onClick={handleLogout} className='absolute top-1.5 right-2'>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}
