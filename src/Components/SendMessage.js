import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { submitData } from "../APICALLS";
import { IoMdAttach } from "react-icons/io";
import RenderSendImage from "./RenderSendImage";

const SendMessage = ({ currentChat, setMessages ,socket}) => {
  const [newMessage, setnewMessage] = useState("");
  const [image, setImage] = useState(undefined);
  const [renderImage, setRenderImage] = useState(undefined);
  const [showImage, setShowImage] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    let message = {
      sender: currentUser.user._id,
      conversationId: currentChat._id,
      text: newMessage,
    };
    const receiverId=currentChat.members.find((user)=>user!==currentUser.user._id,)
        socket.current.emit("sendMessage",{
          senderId:currentUser.user._id,
          receiverId,
          text:newMessage
        })
    submitData("chat/messages/", "POST", message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setnewMessage("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRenderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setShowImage(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleSendMessage(event)
    }
  };

  return (
    <div className="flex gap-2  bg-[#F0F2F5] p-3 w-full">
      {!showImage && (
        <>
          <input
            onChange={(e) => setnewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            value={newMessage}
            placeholder={newMessage !== "" ? newMessage : "Type a message"}
            className="p-3 flex-grow rounded-md sm:w-full w-[70%] bg-[#FFFFFF] 
        placeholder-[#667781] border border-[#dfe3e8]  "
          />

          <input
            type="file"
            ref={fileRef}
            hidden
            onChange={handleImageChange}
          ></input>

          <IoMdAttach
            onClick={() => {
              fileRef.current.click();
            }}
            className="p-2 rounded-lg text-dark-grey 
            h-10 w-12 hover:cursor-pointer mt-1"
          />
          <IoSend
            onClick={handleSendMessage}
            className="p-2 h-10 w-12 hover:cursor-pointer
             text-black bg-[#4DBC15] rounded-lg mt-1 hover:bg-[#57af2a]"
          />
        </>
      )}
      {showImage && (
        <RenderSendImage
          renderImage={renderImage}
          image={image}
          setMessages={setMessages}
          currentChat={currentChat}
          setShowImage={setShowImage}
          socket={socket}
        />
      )}
    </div>
  );
};

export default SendMessage;
