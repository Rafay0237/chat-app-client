import {useState} from 'react'
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import axios from 'axios';

const SendMessage = ({currentChat,setMessages,socket}) => {

    const [newMessage,setnewMessage]=useState("")
    const { currentUser } = useSelector((state) => state.user);

  const handelSendMessage=async(e)=>{
        e.preventDefault();
        if(newMessage==="") 
        return 
        let message={
          sender:currentUser.user._id,
          conversationId:currentChat._id,
          text:newMessage
        }
        const receiverId=currentChat.members.find((user)=>user!==currentUser.user._id,)
        socket.current.emit("sendMessage",{
          senderId:currentUser.user._id,
          receiverId,
          text:newMessage
        })
       try{
       await axios.post(process.env.REACT_APP_API_URL+'chat/messages/',message)
       setMessages(prevMessages => [...prevMessages, message]);
       setnewMessage("")
       }catch(err){
        console.log(err)
       }
      }

  return (
    <div className="flex gap-2 mx-2 mt-5">
          <input
          onChange={(e)=>setnewMessage(e.target.value)}
            type="text"
            value={newMessage}
            placeholder={newMessage!==""?newMessage:"Your Message"}
            className="p-2 flex-grow rounded-sm sm:w-full w-[70%] "
          />
          <IoSend onClick={handelSendMessage}
            className="p-2 rounded-lg text-white bg-blue-400 
            h-10 w-12 hover:cursor-pointer"/>
        </div>
  )
}

export default SendMessage
