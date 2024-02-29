import { format} from 'timeago.js';

let messageText=' ml-5  text-white bg-blue-500 font-sans  p-2 px-6  rounded-full  '
let messageTextOwn=' ml-5 text-black bg-gray-200 font-sans  p-2 px-6  rounded-full '


const Messages = ({own,message,freindDp,userDp}) => {

  return (
    <div  className='m-2  '>
      <div className={'flex p-2  '+(own?'justify-end':'')}>
      <img
        src={own?userDp:freindDp} alt="Profile"
        className='h-8 w-8 rounded-full object-cover'
        />
        <div className={'flex flex-col gap-2 '}>
        <p className={own ? messageTextOwn : messageText} >
          {message.text}
        </p>
        </div>
      </div>
    <div className={'flex '+(own?'justify-end':'')}>
        <p className='text-sm pl-3 '>{format(message.createdAt)}</p>
    </div>
    </div>
  )
}

export default Messages
