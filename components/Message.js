import React from 'react'

export const Message = ((props) => {
  const Message = props.Message
  const CreatedAt = props.CreatedAt
  const SentByMe = props.SentByMe
  // const SentByMe = false
  return (
    <div className='w-full h-min my-0.5 first:mt-auto'>
      <div style={SentByMe ? {marginLeft: 'auto', right: '0'} : {marginRight: 'auto', left: '0'}} className='bg-blue-400 text-white py-1 px-3 h-full w-max rounded-xl'>{Message}</div>
    </div>
  )
})