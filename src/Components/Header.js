import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import { IoChatbubbleSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";

const Header = () => {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <div className="bg-slate-200 h-[9%] sm:h-[4%] ">
      <div className="flex justify-between p-2 mx-auto max-w-6xl items-center">
        <h1 className="font-bold hidden sm:block">Chat App</h1>
        <ul className="flex gap-16 mx-auto sm:gap-12  sm:mx-0">
        <Link to="/">
            <li className="text-black-700 text-center ">
              <IoChatbubbleSharp className="h-7 w-7" /></li>
              <p className="text-xs font-semibold">Chats</p>
          </Link>
          <Link to="/requests">
            <li className="text-black-700 text-center">
              <IoMdHeart className="h-7 w-7" /></li>
              <p className="text-xs font-semibold">Alerts</p>
          </Link>
          <Link to="/add-freind">
            <li className="text-black-700 text-center ">
              <TiUserAdd className="h-7 w-7"/></li>
              <p className="text-xs font-semibold">People</p>
          </Link>
          {currentUser? 
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
        </ul>
      </div>
    </div>
  );
};

export default Header;
