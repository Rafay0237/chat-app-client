import { useEffect, useState } from 'react'
import {GoDotFill} from "react-icons/go"
import { getData } from '../APICALLS'

const Conversation = ({conversation,userId,setFreindDp,onlineUsers}) => {

  const [freind,setFreind]=useState(null)
  const [online,setOnline]=useState(false)

    useEffect(()=>{
    let freindId=conversation.members.filter(id=>(id!==userId))
      getData("users/"+freindId).then(data=>{
        setFreind(data?.user);
        setFreindDp(data.user?.profilePicture)
      })
    onlineUsers?.some(user=>user.userId===freindId) && setOnline(true)
    },[])

  return (
    <div className='flex gap-4 p-4  border-b border-b-grey hover:cursor-pointer'>
        <div className='relative'>
        <img src={freind?.profilePicture}
         alt='Profile'
         className='h-12 w-12 rounded-full object-cover'/>
         {online &&
        <GoDotFill className="text-[#65c654] absolute bottom-1 right-0"/>}
         </div>

         <div>
      <p className=' text-base font-lightbold  pt-2'>
        {freind?.userName}
      </p>
      <p className="text-[12px] text-dark-grey font-lightbold "
        >{online&&"online"}</p>
         </div>
     </div>
  )
}

export default Conversation
