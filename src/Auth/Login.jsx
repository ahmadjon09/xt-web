import { Loader } from 'lucide-react'
import React, { useState } from 'react'

export const Login = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [user, setUser] = useState(localStorage.getItem('user') || null)

  const getSecretCodes = () => {
    const envCodes = import.meta.env.VITE_SECRET_CODES || ''
    const codePairs = envCodes.split(',')
    let secretMap = {}
    codePairs.forEach(pair => {
      const [key, value] = pair.split(':')
      if (key && value) {
        secretMap[key] = value
      }
    })
    return secretMap
  }

  const SECRET_CODES = getSecretCodes()

  const handleSubmit = e => {
    e.preventDefault()
    if (SECRET_CODES[code]) {
      setUser(SECRET_CODES[code])
      setTimeout(() => {
        localStorage.setItem('user', SECRET_CODES[code])
      }, 3000)
    } else {
      setError(true)
      setTimeout(() => setError(false), 1500)
    }
  }

  // const handleLogout = () => {
  //   setUser(null)
  //   localStorage.removeItem('user')
  // }

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#241b2a] text-white'>
      <div className='max-w-xs w-full p-6 border-2 border-white text-center'>
        {user ? (
          <>
            <h2 className='text-xl font-bold mb-4'>Welcome, {user} ✅</h2>
            {/* <button
              onClick={handleLogout}
              className='p-2 border-2 border-white bg-[#241b2a] hover:bg-white hover:text-[#241b2a] transition-all duration-300'
            >
              Logout
            </button> */}
            <Loader className='w-full animate-spin' size={30} />
          </>
        ) : (
          <>
            <h2 className='text-xl font-bold mb-4'>Enter Secret Code</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type='password'
                className={`p-2 bg-[#241b2a] text-white border-2 ${
                  error ? 'border-red-500' : 'border-white'
                } focus:outline-none`}
                placeholder='••••••'
                value={code}
                onChange={e => setCode(e.target.value)}
              />
              <button
                type='submit'
                className='p-2 border-2 border-white bg-[#241b2a] hover:bg-white hover:text-[#241b2a] transition-all duration-300'
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
