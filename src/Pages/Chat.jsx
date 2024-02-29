import { useEffect, useState ,useRef} from "react";
import { useSelector } from "react-redux";
import Conversation from "../Components/Conversation";
import Messages from "../Components/Messages";
import SendMessage from "../Components/SendMessage";
import NoFreinds from "../Components/NoFreinds"
import axios from 'axios'
import {io} from "socket.io-client"

const Chat = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [conversations,setConversations]=useState([])
  const [messages,setMessages]=useState([])
  const [currentChat,setCurrentChat]=useState("")
  const [freindDp,setFreindDp]=useState("")
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const [onlineUsers,setonlineUsers]=useState(null)
  const socket=useRef()
  const scrollRef=useRef()
  const socketURL=process.env.REACT_APP_SOCKET_API_URL 
  //"ws://localhost:8900"

  useEffect(()=>{
  socket.current=io(socketURL)

  socket.current.on('connect_error', (error) => {
    console.error('Connection error:', error.message);
  });

  socket.current.on("getMessage",(data)=>{
    setArrivalMessage({
    sender:data.senderId,
    text:data.text,
    createdAt:Date.now()
    })
  })
  },[])

 useEffect(()=>{
  const freindId=currentChat&& currentChat.members.find((m)=>m!==currentUser.user._id)
 arrivalMessage && currentChat!=="" &&currentChat.members.find(user=>user===freindId) &&
 setMessages((prev)=>[...prev,arrivalMessage])
 },[arrivalMessage,currentChat,currentUser.user._id])

 useEffect(()=>{
  socket.current.on("getUsers",(data=>{
    setonlineUsers(data)
  }))
},[socket])

  useEffect(()=>{
  socket.current.emit("addUser",currentUser.user._id)
  },[currentUser.user._id])

  useEffect(()=>{
    const getConversation=async()=>{
      try{
        const res=await axios.get(process.env.REACT_APP_API_URL+'chat/conversation/'+currentUser.user._id)
        setConversations(res.data.conversation)
      }catch(err){
        console.log(err)
      }
    }
    getConversation()
  },[currentUser.user._id])

  useEffect(()=>{
    const getMessages=async()=>{
      try{
        await axios.get(process.env.REACT_APP_API_URL+'chat/messages/'+currentChat._id)
        .then((res)=>{
          setMessages(res.data.messageList)
        })
      }catch(err){
        console.log(err)
      }
    }
    currentChat&& getMessages()
  },[currentChat])

  useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  return (
    <div className="flex  h-[calc(100vh-65px)] ">
      <div className={currentChat?
      "w-1/3 bg-white  hidden sm:block"
      :"sm:w-1/3 bg-white w-full mx-auto sm:mx-0"
    }>
        {conversations.length!==0? conversations?.map((c,index)=>(
          <div onClick={()=>setCurrentChat(c)}>
            <Conversation conversation={c} key={index} 
            userId={currentUser.user._id} setFreindDp={setFreindDp}
            onlineUsers={onlineUsers}/>
            <hr style={{width:"80%",border:"0.1px solid #ececec"}}/>
          </div>
        )):<NoFreinds/>}
      </div>
      <div className={ currentChat?" flex flex-col sm:w-2/3  w-full bg-blue-50 p-2 h-[100%] overflow-hidden  "
       :" hidden sm:flex flex-col w-2/3  bg-blue-50 p-2 h-[100%] overflow-hidden "}>
        <div className=" flex-grow overflow-auto ">
          {messages && messages.map((m,index)=>(
            <div ref={scrollRef}>
           <Messages own={m.sender===currentUser.user._id} key={index}
            message={m} freindDp={freindDp} userDp={currentUser.user.profilePicture}/>
            </div>
          ))}    
        { !currentChat&& 
          <div className="p-5 text-gray-500 lg:text-3xl md:text-2xl sm:text-xl">
          <p >Open Conversation to Start a Chat</p>
            </div>
          }
        </div>
       {currentChat&&
        <SendMessage currentChat={currentChat} setMessages={setMessages}
        socket={socket}/>}
      </div>
    </div>
  );
};

export default Chat;
