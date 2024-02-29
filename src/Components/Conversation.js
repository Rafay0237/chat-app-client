import { useEffect, useState } from "react";
import axios from "axios";
import { GoDotFill } from "react-icons/go";

const Conversation = ({conversation,userId,setFreindDp,onlineUsers}) => {
    const [freind,setFreind]=useState(null)
    let [online,setOnline]=useState(false)

    useEffect(()=>{
        let freindId=conversation.members.find((m)=>m!==userId)
        const getFreind=async()=>{
          try{
           await axios.get(process.env.REACT_APP_API_URL+'users/'+freindId)
            .then((res)=>{
              setFreind(res.data.user)
              setFreindDp(res.data.user.profilePicture)
            })
          }catch(err){
            console.log(err)
          }
        }
        getFreind()
    },[conversation,userId,setFreindDp])
    
    useEffect(()=>{
      let freindId=conversation.members.find((m)=>m!==userId)
    let isOnline=onlineUsers?.some((user)=>user.userId===freindId)
    setOnline(isOnline)
    },[onlineUsers])

  return (
    <div className='flex'>
      {freind&&<div className='flex m-1 p-2 hover:cursor-pointer w-full   '>
        <div className="relative">
      <img
        src={freind.profilePicture} alt="Profile"
        className='h-10 w-10 rounded-full object-cover '
        />{online&& 
      <GoDotFill className="text-green-500 absolute bottom-0 right-0"/>}
        </div>
        <div>
        <p className=' ml-5 pt-1 font-semibold '>
         {freind.userName}
        </p>
        <p className="text-xs text-gray-500 font-semibold ml-5"
        >{online? "online": "offline"}</p>
        </div>
      </div>}
    </div>
  )
}

export default Conversation
