import {useEffect} from 'react'
import axios from "axios"
import { useSelector,useDispatch } from 'react-redux'
import FindUsers from '../Components/FindUsers'
import { setRequests } from '../redux/user/requestSlice'

const RequestPage = () => {
    const {currentUser}=useSelector(state=>state.user)
    const {requests}=useSelector(state=>state.requests)
    const dispatch=useDispatch()

    useEffect(()=>{
        const getRequests=async()=>{
            try{
                await axios.get(process.env.REACT_APP_API_URL+"request/get/"+currentUser.user._id)
                .then((res)=>dispatch(setRequests(res.data.userList)))
            }catch(err){
                console.log(err)
            }
        }
        getRequests()
    },[currentUser.user._id,dispatch])

  return (
    <div  className='pt-5 text-center overflow-hidden bg-blue-50 h-full'>
     <h1 className='text-2xl text-black  font-semibold'>Follow Requests</h1>
     <FindUsers data={requests} request={true} />
    </div>
  )
}

export default RequestPage
