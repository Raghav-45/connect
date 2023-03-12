import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'

export const AvatarIcon = ((props) => {
  const [ShowDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()
  return (
    <div className='flex-none relative z-10 border border-[#FCFCFD]/50 rounded-full ml-[8px] h-[40px] w-[40px] order-last'>
      <button onClick={() => setShowDropdown(!ShowDropdown)} className='flex focus:outline-none rounded-full h-full w-full items-center'>
        <img className='h-full w-full rounded-full' src={props.Image} alt=''></img>
      </button>

      {ShowDropdown && 
        <div onClick={() => setShowDropdown(false)} className="absolute bg-gray-100 dark:bg-light w-20 rounded mt-1 right-0">
          <button onClick={() => setShowDropdown(false)} className='focus:outline-none w-full text-sm py-2 hover text-gray-900 dark:text-white opacity-75 hover:opacity-100'>Account</button>
          <button onClick={async (e) => {setShowDropdown(false); e.preventDefault(); await logout().then(router.replace('/')); }} className='focus:outline-none w-full text-sm py-2 hover text-gray-900 dark:text-white opacity-75 hover:opacity-100'>Log Out</button>
        </div>
      }
    </div>
  )
})