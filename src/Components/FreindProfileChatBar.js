import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { getData } from "../APICALLS";
import ChatBarDropdown from "./ChatBarDropdown";
import { IoArrowBack } from "react-icons/io5";

const FreindProfileChatBar = ({ onlineUsers, currentChat, setCurrentChat, userId }) => {
  const [online, setOnline] = useState(false);
  const [freind, setFreind] = useState(null);

  useEffect(() => {
    let freindId = currentChat.members.find((id) => id !== userId);
    onlineUsers?.some((user) => user.userId === freindId) && setOnline(true);

    getData("users/get-chatBarData/" + freindId).then((data) => {
      setFreind(data);
    });
  }, [currentChat]);

  return (
    <div className="absolute w-full">
      <div className="flex justify-between bg-[#F0F2F5] h-[60px] ">
        <div className="flex gap-6 p-4 ">
          <div className="relative flex gap-2 ">
          <IoArrowBack className="block sm:hidden size-5 mt-1.5" onClick={()=>setCurrentChat(null)}/>
            <img
              src={freind?.profilePicture}
              alt="Profile"
              className="size-9 rounded-full object-cover "
            />
            {online && (
              <GoDotFill className="text-[#65c654] absolute -bottom-2 right-0" />
            )}
          </div>

          <div>
            <p className=" text-base font-lightbold  pt-1.5">
              {freind?.userName}
            </p>
            <p className="text-[10px] text-dark-grey font-lightbold ">
              {online && "Online"}
            </p>
          </div>
        </div>

        <div>
          <ChatBarDropdown conversationId={currentChat._id} />
        </div>
      </div>
    </div>
  );
};

export default FreindProfileChatBar;
