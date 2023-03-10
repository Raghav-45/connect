import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import { HiArrowSmLeft } from 'react-icons/hi'
import { IoSend } from 'react-icons/io5'
import { Message } from '@/components/Message'

export default function Chat() {
  const router = useRouter()
  const { username } = router.query
  const { currentUser } = useAuth()
  const date = new Date()

  const [MessageInput, setMessageInput] = useState()
  const [Chats, setChats] = useState()
  const [IsLoading, setIsLoading] = useState(true)
  const [ChattingWith, setChattingWith] = useState()
  
  const [ChatsByMe, setChatsByMe] = useState()
  const [ChatsByThem, setChatsByThem] = useState()
  const [IsChatByMeLoading, setIsChatByMeLoading] = useState(true)
  const [IsChatByThemLoading, setIsChatByThemLoading] = useState(true)

  function SortByTime(a) {
    a.sort(function(a, b){return a.CreatedAt - b.CreatedAt})
    return a
  }

  const SendMessage = async () => {
    console.log(MessageInput)

    await addDoc(collection(db, "Concept"), {
      From: currentUser.uid,
      To: ChattingWith.uid,
      Message: MessageInput,
      // CreatedAt: Timestamp.fromDate(new Date(date.getTime())),
      CreatedAt: date.getTime()
    }).finally(() => {
      // setIsSubmitting(false);
    });
  }

  const GetUserDetailsbyUsername = async (usern) => {
    const q = query(collection(db, "UserDetailsV1"), where("username", "==", usern));

    const querySnapshot = await getDocs(q).then(e => e.forEach((doc) => {setChattingWith(doc.data())}));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    // console.log(querySnapshot.forEach((doc) => {setChattingWith(doc.data())}))
  }

  useEffect(() => {
    if (ChattingWith?.uid) {
      // const q = query(collection(db, "Concept"), where("To", "==", ChattingWith.uid), where("From", "==", currentUser.uid));
      // // const q = query(collection(db, "Concept"), where('From', 'in', [ChattingWith.uid, currentUser.uid]), where('To', 'in', [ChattingWith.uid, currentUser.uid]));
      // const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //   const cities = [];
      //   querySnapshot.forEach((doc) => {
      //       cities.push(doc.data());
      //   });
      //   setChats(cities)
      //   setIsLoading(false)
      //   // console.log("Current cities in CA: ", cities);
      // });

      const qm1 = query(collection(db, "Concept"), where("To", "==", ChattingWith.uid), where("From", "==", currentUser.uid));
      // const q = query(collection(db, "Concept"), where('From', 'in', [ChattingWith.uid, currentUser.uid]), where('To', 'in', [ChattingWith.uid, currentUser.uid]));
      const unsubscribem1 = onSnapshot(qm1, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data());
        });
        setChatsByMe(cities)
        setIsChatByMeLoading(false)
        // console.log("Current cities in CA: ", cities);
      });

      const qm2 = query(collection(db, "Concept"), where("From", "==", ChattingWith.uid), where("To", "==", currentUser.uid));
      // const q = query(collection(db, "Concept"), where('From', 'in', [ChattingWith.uid, currentUser.uid]), where('To', 'in', [ChattingWith.uid, currentUser.uid]));
      const unsubscribem2 = onSnapshot(qm2, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data());
        });
        setChatsByThem(cities)
        setIsChatByThemLoading(false)
        // console.log("Current cities in CA: ", cities);
      });
    }
  }, [ChattingWith])

  useEffect(() => {
    if (username && username.length) {
      GetUserDetailsbyUsername(username)
    }
  }, [username])
  
  
  if ( IsChatByThemLoading ) {return (<div>Loading...</div>)}

  return (
    <div className='flex flex-col h-screen pt-[0px] px-[0px] bg-gradient-to-tr from-[#26292F06] to-[#353D4C12]'>
      <div className='flex flex-none my-[0px] w-full h-[56px] bg-gradient-to-tr from-[#FCFCFD] to-[#FCFCFD]/80 drop-shadow-[0_0px_64px_rgba(15,15,15,0.10)]'>
        <Link href="/" className='my-auto'><HiArrowSmLeft className='h-[28px] w-[40px] text-[#130F26]'/></Link>
        <div className='flex-none rounded-full h-auto w-auto mx-[12px] my-[8px]'>
          <img className='h-full w-full rounded-full' src={ChattingWith.photoURL} alt=''></img>
        </div>
        <div className='flex-auto relative py-[12px]'>
          <div className='flex flex-col h-full justify-between'>
            <p className='font-semibold text-[16px] leading-[16px]'>{ChattingWith.username}</p>
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
        {SortByTime(ChatsByMe.concat(ChatsByThem)).map((elem) => <Message Message={elem.Message} CreatedAt={'1 Jan'} SentByMe={elem.From == currentUser.uid} />)}
      </div>
      {/* <div className='flex flex-none flex-row w-full h-[48px] px-[12px] mb-[12px]'>
        <input value={MessageInput} onChange={(e) => setMessageInput(e.target.value)} type='text' name='Message' className='h-full w-full pl-[20px] rounded-full' placeholder='Type message...' ></input>
        <button onClick={() => SendMessage()} className='flex-none flex ml-[8px] aspect-square border border-[#FCFCFD]/60 rounded-full cursor-pointer h-full w-auto bg-[#FCFCFD]' style={{'-webkit-tap-highlight-color': 'transparent'}} >
          <IoSend className='h-[18px] w-[18px] text-[#130F26] m-auto'/>
        </button>
      </div> */}
      <footer className='bg-gradient-to-t from-black/10 to-black/5 backdrop-blur-lg fixed inset-x-0 bottom-0'>
        <div className='flex flex-none flex-row w-full h-[48px] px-[12px] my-[12px]'>
          <input value={MessageInput} onChange={(e) => setMessageInput(e.target.value)} type='text' name='Message' className='h-full w-full pl-[20px] rounded-full' placeholder='Type message...' ></input>
          <button onClick={() => SendMessage()} className='flex-none flex ml-[8px] aspect-square border border-[#FCFCFD]/60 rounded-full cursor-pointer h-full w-auto bg-[#FCFCFD]' style={{'-webkit-tap-highlight-color': 'transparent'}} >
            <IoSend className='h-[18px] w-[18px] text-[#130F26] m-auto'/>
          </button>
        </div>
      </footer>
    </div>
  )
}