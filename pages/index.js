import React, { useState, useRef } from 'react'
import { AvatarIcon } from '../components/Avatar'
import { useAuth } from '../contexts/AuthContext'
import { FiSearch } from 'react-icons/fi'
import { Person } from '@/components/Person';
import { Person_SearchResult } from '@/components/Person_SearchResult';

export default function Home() {
  const [ShowSearchBox, setShowSearchBox] = useState(false)
  const [SearchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null);
  const r = Array.from(Array(10).keys())

  function getBgColor() {
    const c = ['80C271','5AACCF','b6e3f4','c0aede','d1d4f9']
    return c[Math.floor(Math.random()*c.length)]
  }

  function randomBaseColor() {
    const c = ['0071FF','2CB539','FA4083','FFB60A']
    return c[Math.floor(Math.random()*c.length)]
  }
  
  const { currentUser } = useAuth()

  if (!currentUser?.uid.length) {
    return (<p>loading...</p>)
  }

  return (
    <div className='h-screen pt-[24px] px-[20px] bg-gradient-to-tr from-[#26292F06] to-[#353D4C12]'>
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
        {/* <div className='flex-none border border-[#FCFCFD]/50 rounded-full ml-[8px] h-[40px] w-[40px] order-last'>
          <img className='h-full w-full rounded-full' src={currentUser.photoURL} alt=''></img>
        </div> */}
        <AvatarIcon Image={currentUser.photoURL}/>
      </div>

      <Person_SearchResult SearchQuery={SearchQuery}/>

      <Person Name={'Raghav'} Profile={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} />
      <Person Name={'Test'} Profile={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
    </div>
  )
}