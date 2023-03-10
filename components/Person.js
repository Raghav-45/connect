import React from 'react'

export const Person = ((props) => {
  const Profile = props.Profile
  const Name = props.Name
  const Data = props.Data
  return (
    <div className='flex my-[22px] w-full h-[72px] bg-white rounded-[20px] bg-gradient-to-tr from-[#FCFCFD] to-[#FCFCFD]/80 drop-shadow-[0_0px_64px_rgba(15,15,15,0.10)]'>
      <div className='flex-none rounded-full h-[48px] w-[48px] mx-[16px] my-[12px]'>
        <img className='h-full w-full rounded-full' src={Profile ? Profile : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}></img>
      </div>
      <div className='flex-auto relative py-[18px]'>
        <div className='absolute h-[17px] w-auto rounded-full bg-[#0071FF] -top-[8.5px] left-0 px-[8px] py-[4px] drop-shadow-[0_4px_12px_rgba(30,71,255,0.40)]'>
          <p className='text-[9px] leading-[9px] font-semibold text-white'>CLOSE FRIEND</p>
        </div>
        <div className='flex flex-col h-full justify-between'>
          <p className='font-semibold text-[16px] leading-[16px]'>{Name}</p>
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
  )
})