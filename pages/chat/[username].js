import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import { HiArrowSmLeft } from 'react-icons/hi'
import { IoSend } from 'react-icons/io5'
import { Message } from '@/components/Message'
import { supabase } from '@/lib/supabaseClient'

export default function Chat() {
  const router = useRouter()
  const { username } = router.query
  // const { currentUser } = useAuth()
  const [currentUser, setCurrentUser] = useState()
  const date = new Date()

  const [messageInput, setMessageInput] = useState()
  const [chats, setChats] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [chattingWith, setChattingWith] = useState()

  function SortByTime(a) {
    // a.sort(function(a, b){return a.created_at - b.created_at})
    // a.sort(function(a, b){return (new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime()})
    a.sort(function(a, b){return Date.parse(a.created_at) - Date.parse(b.created_at)})
    return a
  }

  const getChatsBetween = async () => {
    const getChatsSentByMe = async () => {
      const { error, data } = await supabase.from('messages').select().match({sender: currentUser.id, receiver: chattingWith.id})
      return data
    }

    const getChatsReceivedByMe = async () => {
      const { error, data } = await supabase.from('messages').select().match({sender: chattingWith.id, receiver: currentUser.id})
      return data
    }
    return {SentByMe: await getChatsSentByMe(), ReceivedByMe: await getChatsReceivedByMe()}
  }

  const SendMessage = async () => {
    const { error, data } = await supabase.from('messages').insert({content: messageInput, receiver: chattingWith.id})
  }

  const getUserbyUsername = async (usern) => {
    const { error, data } = await supabase.from('profiles').select().eq('username', usern).maybeSingle()
    return data
  }

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }

  function reloadChats() {
    chattingWith && getChatsBetween().then((e) => setChats(e))
  }

  useEffect(() => {
    username && getUserbyUsername(username.toLowerCase()).then((e) => setChattingWith(e))
  }, [username])

  useEffect(() => {
    chattingWith && getChatsBetween().then((e) => setChats(e))
  }, [chattingWith])

  useEffect(() => {
    getCurrentUser().then((e) => setCurrentUser(e))
    // console.log(SortByTime(chats.SentByMe.concat(chats.ReceivedByMe)))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => reloadChats(), 1000);
    return () => {clearInterval(interval)}
  }, [])

  // if ( IsChatByThemLoading ) {return (<div>Loading...</div>)}

  return (
    <div className='flex flex-col h-screen pt-[0px] px-[0px] bg-gradient-to-tr from-[#26292F06] to-[#353D4C12]'>
      <div className='flex flex-none my-[0px] w-full h-[56px] bg-gradient-to-tr from-[#FCFCFD] to-[#FCFCFD]/80 drop-shadow-[0_0px_64px_rgba(15,15,15,0.10)]'>
        <Link href="/" className='my-auto'><HiArrowSmLeft className='h-[28px] w-[40px] text-[#130F26]'/></Link>
        <div className='flex-none rounded-full h-auto w-auto mx-[12px] my-[8px]'>
          <img className='h-full w-full rounded-full' src={chattingWith?.photo_url} alt=''></img>
        </div>
        <div className='flex-auto relative py-[12px]'>
          <div className='flex flex-col h-full justify-between'>
            <p className='font-semibold text-[16px] leading-[16px]'>{chattingWith?.username}</p>
            <div className='flex justify-between'>
              <p className='text-gray-500 text-[14px] leading-[14px]'>Active Now</p>
              <div className='flex justify-between order-last mr-[16px] hidden'>
                <p className='text-gray-500 text-[14px] leading-[14px]'>5s</p>
                <div className='h-[8px] w-[8px] bg-[#F7508C] ml-[4px] my-auto mb-[2px] rounded-full order-last drop-shadow-[0_0px_3px_rgba(247,80,140,0.56)]'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 px-2 py-1 mb-[76px]'>
        {/* {SortByTime(ChatsByMe.concat(ChatsByThem)).map((elem) => <Message Message={elem.Message} CreatedAt={'1 Jan'} SentByMe={elem.From == currentUser.uid} />)} */}
        {chats && chats?.ReceivedByMe && chats?.SentByMe && SortByTime(chats.SentByMe.concat(chats.ReceivedByMe)).map((elem) => <Message key={elem.id} Message={elem.content} CreatedAt={'1 Jan'} SentByMe={elem.sender == currentUser.id} />)}
      </div>
      {/* <div className='flex flex-none flex-row w-full h-[48px] px-[12px] mb-[12px]'>
        <input value={MessageInput} onChange={(e) => setMessageInput(e.target.value)} type='text' name='Message' className='h-full w-full pl-[20px] rounded-full' placeholder='Type message...' ></input>
        <button onClick={() => SendMessage()} className='flex-none flex ml-[8px] aspect-square border border-[#FCFCFD]/60 rounded-full cursor-pointer h-full w-auto bg-[#FCFCFD]' style={{'-webkit-tap-highlight-color': 'transparent'}} >
          <IoSend className='h-[18px] w-[18px] text-[#130F26] m-auto'/>
        </button>
      </div> */}
      <footer className='bg-gradient-to-t from-black/10 to-black/5 backdrop-blur-lg fixed inset-x-0 bottom-0'>
        <div className='flex flex-none flex-row w-full h-[48px] px-[12px] my-[12px]'>
          <input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} type='text' name='Message' className='h-full w-full pl-[20px] rounded-full' placeholder='Type message...' ></input>
          <button onClick={() => {setMessageInput(''); SendMessage(); reloadChats();}} className='flex-none flex ml-[8px] aspect-square border border-[#FCFCFD]/60 rounded-full cursor-pointer h-full w-auto bg-[#FCFCFD]' style={{'-webkit-tap-highlight-color': 'transparent'}} >
            <IoSend className='h-[18px] w-[18px] text-[#130F26] m-auto'/>
          </button>
        </div>
      </footer>
    </div>
  )
}