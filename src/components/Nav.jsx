import React from 'react'
import GG from '../assets/images/gg.png'
export const Nav = () => {
  const user = localStorage.getItem('user')
  return (
    <nav className='w-full h-[43px] container'>
      <div className='w-full border-b flex items-center justify-around text-white text-xl h-10 border-white'>
        {user == 'Ahmadjon' ? (
          <p className='relative'>
            {user}{' '}
            <img
              className='absolute w-2.5 top-1.5 -right-3'
              src={GG}
              alt='admin'
            />
          </p>
        ) : (
          <p>{user}</p>
        )}
      </div>
    </nav>
  )
}
