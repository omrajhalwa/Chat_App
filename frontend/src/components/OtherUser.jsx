import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import {} from "react-router-dom"
import { setSelecteduser } from '../redux/userSlice';
export default function OtherUser({user}) {
const dispatch=useDispatch();
const { selectedUser}=useSelector(store=>store.user);

const { onlineUsers}=useSelector(store=>store.user);
const isOnline= onlineUsers.includes((user)._id);
  const selectedUserHandler= (user)=>{
     // console.log(user);
      dispatch(setSelecteduser(user));
  }
  return (
    <>
         <div onClick={()=>selectedUserHandler(user)} className={`flex gap-2 items-center hover:bg-zinc-200 rounded-sm p-2 cursor-pointer ${selectedUser?._id===user?._id ? "bg-zinc-200 ":""}`}>
                
                <div className={`avatar ${isOnline ? "online":""}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="img" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className={`flex justify-between gap-2 text-white ${selectedUser?._id===user?._id ? "text-black ":""}`}>
                        <p>{user?.fullname}</p>
                    </div>
                </div>



          <div className='divider my-0 py-0 h-1'></div>
     
        </div>
        
    </>
  )
}
