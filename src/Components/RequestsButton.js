import axios from "axios";
import {updateRequests} from '../redux/user/requestSlice'
import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify';

const RequestsButton = ({ user, sender }) => {
  const dispatch=useDispatch()

  const handeAccept = async () => {
    try {
      await axios
        .post(process.env.REACT_APP_API_URL+"request/accept", {
          senderId: sender._id,
          userId: user._id,
        })
        .then((res) => {
          toast("Freind Request Accpeted")
        });
        dispatch(updateRequests(sender._id))
    } catch (err) {
      console.log(err);
    }
  };

  const handeDelete = async () => {
    try {
      await axios
        .put(process.env.REACT_APP_API_URL+"request/delete", {
          senderId: sender._id,
          userId: user._id,
        })
        .then((res) => {
          toast("User Requested Deleted")
        });
        dispatch(updateRequests(sender._id))
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <button 
        className="bg-green-700 text-white p-2 -ml-2 rounded-lg 
        text-2xs sm:text-xs w-[180%] sm:w-full "
        onClick={handeAccept} >
            Accept
      </button>
      <button
        className="bg-red-700 text-white p-2 ml-2 rounded-lg
        text-2xs sm:text-xs w-[180%] sm:w-full "
        onClick={handeDelete}>
        Delete
      </button>
    </div>
  );
};

export default RequestsButton;
