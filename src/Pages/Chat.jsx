import { useEffect, useState, useRef } from "react";
import Conversation from "../Components/Conversation";
import FreindProfileChatBar from "../Components/FreindProfileChatBar";
import Messages from "../Components/Messages";
import SendMessage from "../Components/SendMessage";
import { useSelector } from "react-redux";
import { getData, submitData } from "../APICALLS";
import { io } from "socket.io-client";
import { TfiGithub } from "react-icons/tfi";

const ChatPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState(null);
  const [messages, setMessages] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [loading,setLoading]=useState(false)
  const [freindDp, setFreindDp] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const socketURL = process.env.REACT_APP_SOCKET_API_URL;

  useEffect(() => {
    socket.current = io(socketURL);

    socket.current.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
    });

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    socket.current.on("getImage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        img: data.img,
        createdAt: Date.now(),
      });
    });

    socket.current.on("updateMessageSeen", (data) => {
      let updatedMessages = messages.map((message) => {
        if (
          message.conversationId === data.conversationId &&
          message.sender === data.sender
        ) {
          return { ...message, seen: true };
        } else {
          return message;
        }
      });
      setMessages(updatedMessages);
    });
  }, []);

  useEffect(() => {
    const freindId =
      currentChat &&
      currentChat.members.find((m) => m !== currentUser.user._id);
    arrivalMessage &&
      currentChat &&
      currentChat.members.find((user) => user === freindId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat, currentUser.user._id]);

  useEffect(() => {
    socket.current.on("getUsers", (data) => {
      setOnlineUsers(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser.user._id);
  }, [currentUser.user._id]);

  useEffect(() => {
    setLoading(true)
    getData("chat/conversation/" + currentUser.user._id).then((data) => {
      setConversations(data?.conversation);
    });
    setLoading(false)
  }, []);

  useEffect(() => {
    if (currentChat) {
      getData("chat/messages/" + currentChat._id).then((data) => {
        setMessages(data?.messageList);
      });
      const freindId = currentChat.members.find(
        (m) => m !== currentUser.user._id
      );
      submitData("chat/messages/update-seen", "PUT", {
        conversationId: currentChat._id,
        sender: freindId,
      });

      socket.current.emit("messageSeen", {
        conversationId: currentChat._id,
        sender: freindId,
      });
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={"flex h-[100vh] "+(currentChat && "absolute top-0 sm:static w-full")}>
      <div
        className={`${
          currentChat ? " hidden sm:block" : "sm:w-1/3 w-full mx-auto sm:mx-0"
        }
      flex flex-col w-1/3  gap-2 pt-2 bg-[#FFFFFF] overflow-auto scrollbar-hide`}
      >
        {loading? 
        <div className="flex justify-center items-center h-full w-full  ">
         <p className="text-3xl">Loading...</p>
          </div>
          :conversations && conversations.length!==0 ?
          conversations.map((conversation) => (
          <div
            onClick={() => setCurrentChat(conversation)}
            key={conversation._id}
          >
            <Conversation
              conversation={conversation}
              userId={currentUser.user._id}
              setFreindDp={setFreindDp}
              onlineUsers={onlineUsers}
            />
          </div>
        )):
         <div className="flex flex-col gap-5 justify-center items-center h-full w-full ">
         <p className="text-3xl">No Conversations yet.</p>
         <p className="text-2xl"> Connect with People to have a Chat.</p>
         <TfiGithub className="h-36 w-36"/>
          </div>}
      </div>
      <div
        className={`${currentChat ? "sm:w-2/3 w-full" : "hidden sm:flex w-2/3"}
        flex flex-col  overflow-hidden bg-mobileImg sm:bg-desktopImg relative`}
      >
        <div className="flex-grow overflow-y-auto scrollbar-hide w-full ">
          {currentChat && (
            <FreindProfileChatBar
              onlineUsers={onlineUsers}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              userId={currentUser.user._id}
            />
          )}
          <div className="pt-[60px]">
            {messages &&
              messages.map((m) => (
                <div ref={scrollRef} key={m._id}>
                  <Messages
                    own={m.sender === currentUser.user._id}
                    message={m}
                    userDp={currentUser.user.profilePicture}
                    freindDp={freindDp}
                  />
                </div>
              ))}
          </div>
          {!currentChat && (
            <p className="p-5 text-gray-300 lg:text-3xl md:text-2xl sm:text-xl">
              Open Conversation to Start a Chat
            </p>
          )}
        </div>
        {currentChat && (
          <SendMessage
            currentChat={currentChat}
            setMessages={setMessages}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
