import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelecteduser } from '../redux/userSlice';

export default function MessageContainer() {
  const {selectedUser}=useSelector(store=>store.user);
  const dispatch=useDispatch();
      useEffect(()=>{
        return ()=>{
               dispatch(setSelecteduser(null));
        }
      },[])
  return (

    <>{
    selectedUser ? (
      <div className='md:min-w-[550px] flex flex-col'>
      <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>

        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img src={selectedUser?.profilePhoto} alt="img" />
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex justify-between gap-2 '>
            <p>{selectedUser?.fullname}</p>
          </div>
        </div>




      </div>
      <Messages/>
      <SendInput/>
    </div>
    ) :(
      <div className='md:min-w-[550px] flex flex-col items-center justify-center'>
         <h1 className='text-white font-bold text-2xl '>let's start conversation</h1>

      </div>
    )
  }
    </>

    

  )
}
