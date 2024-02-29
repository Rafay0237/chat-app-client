import UserCard from './UserCard'
import UserNotFound from './UserNotFound'
import { useSelector } from 'react-redux'

const FindUsers = ({data, request}) => {

  const {currentUser}=useSelector((state)=>state.user)

  return (
    <div className=' mx-auto w-[80%] h-[calc(100vh-135px)] overflow-auto'>
       <div className='flex flex-col mt-4'>
        {data && data.length!==0? data.map((users)=>(
          currentUser.user._id!==users._id&&
          <div> 
          <UserCard users={users} request={request} 
          key={users._id}/>
          <hr style={{width:"85%",border:"0.1px solid #ececec"}}/>
          </div>
        ))
        : <UserNotFound request={request} search={data===undefined}/>
        }
      </div>
    </div>
  )
}

export default FindUsers
