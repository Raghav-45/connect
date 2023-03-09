import React, { useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { FiSearch } from 'react-icons/fi'

export default function ChatList() {
  const [ShowSearchBox, setShowSearchBox] = useState(false)
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
            <input ref={inputRef} placeholder='@username' className='flex-1 w-[0px] h-[18px] outline-none transition-all duration-500'/>
          </div>
        </div>
        <div className='flex-none border border-[#FCFCFD]/50 rounded-full ml-[8px] h-[40px] w-[40px] order-last'>
          <img className='h-full w-full rounded-full' src={currentUser.photoURL} alt=''></img>
        </div>
      </div>
      <div className='flex my-[22px] w-full h-[72px] bg-white rounded-[20px] bg-gradient-to-tr from-[#FCFCFD] to-[#FCFCFD]/80 drop-shadow-[0_0px_64px_rgba(15,15,15,0.10)]'>
        <div className='flex-none rounded-full h-[48px] w-[48px] mx-[16px] my-[12px]'>
          <img className='h-full w-full rounded-full' src={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}></img>
        </div>
        <div className='flex-auto relative py-[18px]'>
          <div className='absolute h-[17px] w-auto rounded-full bg-[#0071FF] -top-[8.5px] left-0 px-[8px] py-[4px] drop-shadow-[0_4px_12px_rgba(30,71,255,0.40)]'>
            <p className='text-[9px] leading-[9px] font-semibold text-white'>CLOSE FRIEND</p>
          </div>
          <div className='flex flex-col h-full justify-between'>
            <p className='font-semibold text-[16px] leading-[16px]'>Raghav</p>
            <div className='flex justify-between'>
              <p className='text-gray-500 text-[14px] leading-[14px]'>Gadi Tera Bhai Chalayega...</p>
              <div className='flex justify-between order-last mr-[16px]'>
                <p className='text-gray-500 text-[14px] leading-[14px]'>5s</p>
                <div className='h-[8px] w-[8px] bg-[#F7508C] ml-[4px] my-auto mb-[2px] rounded-full order-last drop-shadow-[0_0px_3px_rgba(247,80,140,0.56)]'></div>
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}