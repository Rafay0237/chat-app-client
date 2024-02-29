import { useState ,useRef,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  deleteAccount,
  signOut,
  updateProfilePicture
} from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [image,setImage]=useState(undefined);
  const [imageError,setImageError]=useState({});
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef=useRef();
  

  const uploadImage=async(image)=>{
    if(image.size>3097152 ){
      setImageError({success:false,message:"Image Size limit is 3MB!"})
      return;
    }
    setLoading(true)
    const formData=new FormData();
    formData.append('image',image)
    formData.append('id',currentUser.user._id)
    const res =await fetch(process.env.REACT_APP_API_URL+'upload-dp',{
      method:"POST",
     body:formData
    })
    const data=await res.json()
    if(data.success)
    {
    toast("Profile Picture Updated!")  
    dispatch(updateProfilePicture(data.url))
    setLoading(false)
    setImageError({success:true,message:"Image Uploaded Successfully!"})
    }else{
     setLoading(false)
     setImageError({success:false,message:data.error})
    }
    }
  
  const deleteAcc = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL+`users/delete/${currentUser.user._id}`,
        {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
          method: "DELETE",
        }
      );

      const data = res.json();
      if(data.expired===true)
        {toast(data.message)
        dispatch(signOut)
        }
      if (!data.success) {
        toast({ message: data.message });
      }
      dispatch(deleteAccount());
    } catch (err) {
       toast({err});
    }
  };

  const SignOut = async () => {
    try {
      toast("Signed out Successfully!")
      dispatch(signOut());
    } catch (err) {
      toast({ message: err });
    }
  };
  
 useEffect(()=>{
  if(image)
  {
    uploadImage(image)
  }
 },[image])

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold my-1 text-center text-3xl">Profile</h1>
        <input type="file" ref={fileRef} hidden onChange={(e)=>setImage(e.target.files[0])}></input>
        <img
          className="h-20 w-20 rounded-full object-cover mb-3 self-center cursor-pointer "
          src={currentUser.user.profilePicture}
          alt="Profile " onClick={()=>fileRef.current.click()}
        />
        <div className="text-center -mt-5">
        {loading?<p  className="text-slate-700 font font-semibold">loading...</p>:""}
        {imageError.success ? (
          <p className="text-green-700 ">{imageError.message}</p>
        ) : (
          <p className="text-red-700 ">{imageError.message}</p>
        )}
        </div>
        <div className="font-semibold gap-5  flex">
          <h1 className="font-semibold">Email: </h1>
          <h1>{currentUser.user.email}</h1>
        </div>
        <div className="font-semibold gap-5 flex">
          <h1 className="font-semibold">Name: </h1>
          <h1>{currentUser.user.userName}</h1>
        </div>
        <div className=" bg-slate-200 p-3 rounded-lg"
        onClick={() => {
          navigate("/profile/change-username");
        }}>
          <h1 className="font-semibold text-gray-500 text-center hover:cursor-pointer"
          > Change User Name</h1>
        </div>
        <div className=" bg-slate-200 p-3 rounded-lg"
        onClick={() => {
          navigate("/profile/change-password");
        }}>
          <h1 className="font-semibold text-gray-500 text-center hover:cursor-pointer"
          > Change Password </h1>
        </div>
      </div>
      <div className="flex justify-between mt-8 hover:cursor-pointer font-semibold ">
        <p className="text-red-700 " onClick={deleteAcc}>
          Delete Account?
        </p>
        <p className=" text-red-700" onClick={SignOut}>
          Sign out
        </p>
      </div>
    </div>
  );
};

export default Profile;
