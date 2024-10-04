import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { IoChatbubbleSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className="bg-slate-200  h-[9%]  sm:h-[100vh] w-full sm:w-20 py-0 sm:py-[3%]">
      <div className="flex flex-col justify-between p-2 mx-auto max-w-6xl items-center">
        {/* <h1 className="font-bold hidden sm:block">Chat App</h1> */}
        <ul className="flex flex-row sm:flex-col justify-evenly sm:justify-center items-center gap-4  sm:gap-8 w-full">
          <Link to="/" >
            <li className="text-gray-900 text-center">
              <IoChatbubbleSharp className="h-7 w-7" />
              <p className="text-xs font-semibold">Chats</p>
            </li>
          </Link>
          <Link to="/requests">
            <li className="text-gray-900 text-center">
              <IoMdHeart className="h-7 w-7" />
              <p className="text-xs font-semibold">Alerts</p>
            </li>
          </Link>
          <Link to="/add-friend">
            <li className="text-gray-900 text-center">
              <TiUserAdd className="h-7 w-7" />
              <p className="text-xs font-semibold">People</p>
            </li>
          </Link>
          <div className="block sm:absolute bottom-8 ">
          {currentUser ? 
            <Link to='/profile'>
              <img
                src={currentUser.user.profilePicture} alt="Profile"
                className='h-9 w-9 rounded-full object-cover'
                />
            </Link> :
            <Link to="/login">
              <li className="text-lg p-2 font-semibold">Login</li>
            </Link>
          }
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
