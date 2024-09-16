import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";

import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast"
import { setSelecteduser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';

export default function SendInput
() {

  const [messagess,setMessagess]=useState("");
  const dispatch=useDispatch();
const {message}=useSelector(store=>store.message);
  const {selectedUser}=useSelector(store=>store.user);
  const onSubmitHandler= async (e)=>{
 

   
    e.preventDefault();
   console.log(selectedUser);
    try {
      const res= await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,{message:messagess},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
       });
    
      console.log(res);
     
      dispatch(setMessages([...message,res?.data?.newMessage]));
      console.log("iamon");
      setMessagess("");
    } catch (error) {
      console.log(error);
    }
      
  }

  return (
    <form action="" onSubmit={onSubmitHandler} className='px-4 my-3'>
        <div className='w-full relative'>
            <input type="text"
            value={messagess}
            onChange={(e)=>setMessagess(e.target.value)}
            placeholder='send a message.....'
            className='border p-3 border-zinc-500 text-sm rounded-lg block w-full bg-gray-600 text-white'
            />

            <button 
             type='submit'
             className='absolute flex item-center  inset-y-3 end-0 justify-center pr-4'>
                <IoSend />
            </button>
        </div>
    </form>
  )
}
