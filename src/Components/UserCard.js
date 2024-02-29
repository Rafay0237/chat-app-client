import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import RequestsButton from "./RequestsButton";
import { toast } from 'react-toastify';

const UserCard = ({ users, request }) => {
  const [reqSent, setReqSent] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const sendRequest = async (req, res) => {
    setReqSent(true);
    try {
      await axios
        .post(process.env.REACT_APP_API_URL+"request/send", {
          senderId: currentUser.user._id,
          userId: users._id,
        })
        .then((res) => {
          toast(res.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between p-2 my-2 w-[50%] mx-0 sm:mx-auto
    gap-20 sm:gap-0">
      <div className="flex">
        <img
          src={users.profilePicture}
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover "
        />
        <p className=" ml-5 pt-1 font-semibold ">{users.userName}</p>
      </div>
      {request ? (
        <RequestsButton user={currentUser.user} sender={users} />
      ) : (
        <div className="">
          {!reqSent ? (
            <button
              className="bg-green-700 text-white p-2 rounded-lg text-2xs sm:text-xs
               w-[180%] sm:w-full "
              onClick={sendRequest}
            >
              Send Request
            </button>
          ) : (
            <button className="bg-gray-500 text-white p-2 rounded-lg cursor-not-allowed
            text-2xs sm:text-xs w-[180%] sm:w-full ">
              Request Sent!
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
