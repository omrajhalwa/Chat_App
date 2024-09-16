import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import {useDispatch} from "react-redux";
import { setAuthUser } from '../redux/userSlice';
export default function Login() {


  const [user, setUser] = useState({
   
    username: "",
    password: ""
  
  });

  const navigate=useNavigate();
 const dispatch=useDispatch();

  const onSubmintHandler = async(e) => {
    e.preventDefault();
    console.log(user);
      

    try {
      const res= await axios.post(`http://localhost:8080/api/v1/user/login`,user,{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials:true
      })

      console.log(res);

      if(res?.data?.success){
       toast.success(res?.data?.message);
      }

      navigate("/");
      dispatch(setAuthUser(res?.data));
   } catch (error) {
   
     console.log(error);
   }

    setUser({
      username: "",
      password: ""
     
    })
  }



  return (
    <div className='min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md  h-full w-full text-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100' >
      <h1 className='text-3xl font-bold text-center' >Log In</h1>
      <form action="" onSubmit={onSubmintHandler}>


        <div>
          <label htmlFor="" className='label p-2'>
            <span className='text-base label-text text-white'>Username</span>
          </label>
          <input   value={user.username} required
            onChange={(e)=>setUser({...user,username:e.target.value})}
          className='w-full input input-bordered h-10' type="text" placeholder='username' />
        </div>

        <div>
          <label htmlFor="" className='label p-2'>
            <span className='text-base label-text text-white'>Password</span>
          </label>
          <input  value={user.password} required
            onChange={(e)=>setUser({...user,password:e.target.value})}
          className='w-full input input-bordered h-10' type="password" placeholder='Password' />
        </div>
       
       
        <div className='text-center my-2'>
           <p><Link  to="/register">Don't have an account? <a href="">SignUp</a> </Link>
          </p>
        </div>
     
             <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700 px-6'>Login</button>
      </form>
    </div>
  </div>

  )
}
