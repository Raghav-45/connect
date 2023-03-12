import React, { useState, useRef } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { AvatarIcon } from './Avatar'

export const TopBar = ((props) => {
  const [ShowSearchBox, setShowSearchBox] = useState(false)
  const [SearchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null)

  const { currentUser } = useAuth()
  return (
    <div className='flex justify-items-end'>
      <div className='flex-auto align-bottom my-auto mr-[8px] w-auto'>
        <h1 className='text-[28px] font-semibold'>Chat</h1>
      </div>
      <div onMouseLeave={(e) => setShowSearchBox(false)} onMouseEnter={(e) => setShowSearchBox(true)} style={{width: ShowSearchBox && '100%', flexGrow: ShowSearchBox && '1'}} className='flex border border-[#FCFCFD]/60 rounded-full h-[40px] w-[40px] bg-[#FCFCFD] transition-all duration-200'>
        <div className='flex flex-row w-full text-[#130F26] m-auto ml-[11px] mr-[11px] text-left'>
          <FiSearch onClick={() => {inputRef.current.focus()}} className='flex-none h-[18px] w-[18px] mr-[8px]'/>
          <input ref={inputRef} value={SearchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='@username' className='flex-1 w-[0px] h-[18px] outline-none transition-all duration-500'/>
        </div>
      </div>
      <AvatarIcon Image={'currentUser?.photoURL'}/>
    </div>
  )
})