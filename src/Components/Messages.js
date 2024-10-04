import { useState } from "react";
import { format } from "timeago.js";
import { MdCancel } from "react-icons/md";
import { MdDownload } from "react-icons/md";

let messageText =
  " ml-5  text-black bg-[#FFFFFF] font-sans  p-2 px-6  rounded-full  ";
let messageTextOwn =
  " ml-5 text-black bg-[#D9FDD3] font-sans  p-2 px-6  rounded-full ";

const Messages = ({ own, message, freindDp, userDp }) => {
  return (
    <div className="m-2">
      <div className={"flex p-2  " + (own ? "justify-end" : "")}>
        <img
          src={own ? userDp : freindDp}
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />
        {message.text && (
          <p className={own ? messageTextOwn : messageText}>{message.text}</p>
        )}
        {message.img && <ImageMessageDisplay img={message.img} own={own}/>}
      </div>
      <div className={"flex  " + (own ? "justify-end" : "")}>
        <p className="text-sm ml-3 text-white ">{format(message.createdAt)}</p>
        {own && message.seen&&<p className="text-sm text-white pl-1 ">seen</p>}
      </div>
    </div>
  );
};

const ImageMessageDisplay = ({ img ,own}) => {
  const [viewImage, setViewImage] = useState(false);

  const handleDownloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
  
      const blobUrl = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'image.jpg'; 
      link.style.display = 'none';
  
      document.body.appendChild(link);
  
      link.click();
  
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  
  return (
    <>
      {!viewImage ? (
        <div
          onClick={() => setViewImage(true)}
          className={
            "w-52 h-60 ml-2 rounded-lg hover:cursor-pointer" +
            (own ? " bg-green" : "bg-dark-grey")
          }
        >
          <img className=" p-1  object-cover rounded-lg hover:cursor-pointer" src={img} />
        </div>
      ) : (
        <div className="h-full w-full bg-black absolute top-[60px] right-0 ">
          <div className="flex justify-between  pt-5 px-5 ">
            <MdCancel className="h-10 w-10 text-white hover:cursor-pointer" 
            onClick={()=>setViewImage(false)}/>
            <MdDownload className="h-10 w-10 text-white hover:cursor-pointer" 
            onClick={() => handleDownloadImage(img)}/>
          </div>
          <div className="flex justify-center ">
            <img
              className=" p-1 w-full  h-[70vh] sm:w-[60%] sm:h-[80%] object-contain rounded-lg"
              src={img}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
