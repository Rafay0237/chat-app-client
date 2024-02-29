import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {
    updateUsername,
    signOut
  } from "../redux/user/userSlice";
  import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeUsername = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [successMessage, setSuccessMessage] = useState({});
    const [newName,setnewName]=useState("")
    const {currentUser}=useSelector((state)=>state.user)

  const changeUserName = async () => {
        if (newName.length < 8 || newName === "") {
          setSuccessMessage({
            message: "Username should be atleast 8 characters!",
            success: false,
          });
          return;
        }
        const res = await fetch(process.env.REACT_APP_API_URL+"users/change-username", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({
            userName: newName,
            email: currentUser.user.email,
          }),
        });
        const data = await res.json();
        if(data.expired===true)
        {toast(data.message)
        dispatch(signOut)
        }
        if (data.success) {
          toast("Username Updated!")
          dispatch(updateUsername(newName));
          setSuccessMessage({ message: data.message, success: true });
          navigate('/profile')
        } else {
          setSuccessMessage({ message: data.message, success: false });
        }
      };

  return (
    <div className=' bg-blue-50 h-[calc(100vh-65px)]'>
    <div className="flex flex-col p-3 max-w-sm sm:max-w-lg mx-auto  gap-7">
       <input
            className="p-3 bg-slate-200 rounded-lg 
            font-semibold text-gray-500 mt-40 sm:mt-20 "
            onChange={(e)=>setnewName(e.target.value)}
            id="userName"
            type="text"
            placeholder=" New username "
          />
        <p className='font-semibold text-md text-gray-400 -mt-3 p-2'>
        You'll be able to change your username back 
        to {currentUser.user.userName} for another 14 days.</p>
          <button
            className="bg-slate-700 text-white text-sm rounded-md
       p-3 w-3/5 mx-auto"
            onClick={changeUserName}
          >
            Change
          </button>
          {successMessage.success ? (
          <p className="text-green-700 ">{successMessage.message}</p>
        ) : (
          <p className="text-red-700 ">{successMessage.message}</p>
        )}
    </div>
    </div>
  )
}

export default ChangeUsername
