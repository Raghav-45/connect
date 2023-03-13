import React from 'react'
import Link from 'next/link'
import { TopBar } from './TopBar'

import { AiFillHome } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { BsFillPersonBadgeFill } from 'react-icons/bs'

import { useRouter } from 'next/router'

export default function Layout({ children, title = 'Connect' }) {
  const router = useRouter()
  // console.log(router.pathname)
  return (
    <div className='h-full bg-center'>

      {/* <TopBar /> */}

      {children}

      {router.pathname != '/chat/[username]' &&
        <footer className='bg-gradient-to-t from-black/10 to-black/5 backdrop-blur-lg text-black fixed inset-x-0 bottom-0'>
          <div className='grid grid-cols-3 gap-0 h-14 mx-5 text-xl text-center'>
            <Link href='/' className='flex h-full w-full align-middle' replace><AiFillHome className='m-auto'/></Link>
            <Link href='/search' className='flex h-full w-full align-middle' replace><FiSearch className='m-auto'/></Link>
            <Link href='/Profile' className='flex h-full w-full align-middle' replace><BsFillPersonBadgeFill className='m-auto'/></Link>
          </div>
        </footer>
      }
    </div>
  )
}