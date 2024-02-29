import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import {app} from '../Firebase'
import { useDispatch } from "react-redux"
import { loginSuccess } from '../redux/user/userSlice'
import { toast } from 'react-toastify';

const OAuth = () => {
  const dispatch=useDispatch();

 const handleClick=async()=>{
    try{
    const provider= new GoogleAuthProvider()
    const auth=getAuth(app)
    console.log(auth)
    const res=await signInWithPopup(auth,provider)
    console.log(res)
    const apiRes=await fetch(process.env.REACT_APP_API_URL+'users/auth/google',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        userName:res.user.displayName,
        email:res.user.email,
        photo:res.user.photoURL
      })
    })
    const data=await apiRes.json();
    dispatch(loginSuccess(data))
    }catch(err){
    console.log('Google Login Error',err)
    toast("Google Login Issue, Kindly Signup to continue")
    }
    }

  return (
      <button type='button' onClick={handleClick} 
      className='bg-red-700 py-3 w-3/6 hover:opacity-80
      upppercase text-white rounded-lg mx-auto'>
        Continue with Google 
      </button>
  )
}

export default OAuth
