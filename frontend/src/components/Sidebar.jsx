import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUser } from '../redux/userSlice';
export default function Sidebar() {
  const [search,setSearch]=useState("");
  const {otherUser}= useSelector(store=>store.user);
const navigate=useNavigate();
const dispatch=useDispatch();
const logoutHandler= async()=>{
  try {
    const res= await axios.get(`http://localhost:8080/api/v1/user/logout`,{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
     });
     dispatch(setAuthUser(null));
     toast.success(res?.data?.message);
     navigate("/login");
     
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
}

const searchSubmitHandler= (e) =>{
    e.preventDefault();
    const conversationUser = otherUser?.find((user)=>user?.fullname.toLowerCase().includes(search.toLowerCase())
    )

    if(conversationUser){
       dispatch(setOtherUser([conversationUser]));
    }else{
        toast.error("user not found");
    }
}

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
      
            <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
             type="text" 
             className='input input-bordered rounded-md '
             placeholder='Search.......'  />
             <button type='submit' className='btn  bg-zinc-700 text-white'>  <FaSearch /></button>
        </form>
        <div className='divider px-3'></div>
        <OtherUsers/>
         
        <div className=''>
          <button onClick={logoutHandler} className='btn btn-sm '>Logout</button>
        </div>
    </div>
  )
}
