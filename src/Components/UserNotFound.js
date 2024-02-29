import { TbZoomCancel } from "react-icons/tb";
import { BiMessageRoundedDots } from "react-icons/bi";

const UserNotFound=({request,search}) => {
  return (
    <div>
      {request?<div className='text-center'>
          <h3 className='text-xl text-black p-5 font-semibold'>You Don't have any message Requests.</h3>
          <div className='flex justify-center items-center'>
            <BiMessageRoundedDots className='text-8xl text-black' />
          </div>
        </div>
          :(search?
          <div className='text-center'>
          <h3 className='text-xl text-black p-5 font-semibold'>No Results Found.</h3>
          <div className='flex justify-center items-center'>
            <TbZoomCancel className='text-8xl text-black' />
          </div>
          </div>:
          <h3 className='text-xl text-gray-500 p-5 font-semibold'>Nothing to Show</h3>
          )}
    </div>
  )
}
export default  UserNotFound;