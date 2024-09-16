import React, { useState } from 'react'
import { Link ,useNavigate} from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

export default function Signup() {

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const navigate=useNavigate();


  const onSubmintHandler =async (e) => {
    e.preventDefault();
    console.log(user);

    try {
       const res= await axios.post(`http://localhost:8080/api/v1/user/register`,user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
       })

       console.log(res);

       if(res?.data?.success){
        toast.success(res?.data?.message);
       }

       navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }


    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  }

  const handleCheckbox= (gender)=>{
    setUser({...user,gender})
  }


  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md  h-full w-full text-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100' >
        <h1 className='text-3xl font-bold text-center' >Signup</h1>
        <form action="" onSubmit={onSubmintHandler}>

          <div>
            <label htmlFor="" className='label p-2'>
              <span className='text-base label-text text-white'>Full Name</span>
            </label>
            <input
              value={user.fullname}
              className='w-full input value={} input value={}-bordered h-10'
              type="text"
              onChange={(e)=>setUser({...user,fullname:e.target.value})}
              placeholder='full name'
              required />
          </div>

          <div>
            <label htmlFor="" className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input
             value={user.username}
              className='w-full input value={} input value={}-bordered h-10'
               type="text" 
               onChange={(e)=>setUser({...user,username:e.target.value})}
               placeholder='username' required />
          </div>

          <div>
            <label htmlFor="" className='label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input
             value={user.password}
              className='w-full input value={} input value={}-bordered h-10' 
              type="password" 
              onChange={(e)=>setUser({...user,password:e.target.value})}
              placeholder='Password'required  />
          </div>
          <div>
            <label htmlFor="" className='label p-2'>
              <span className='text-base label-text text-white'> Confirm Password</span>
            </label>
            <input 
            value={user.confirmPassword}
            className='w-full input value={} input value={}-bordered h-10' 
            type="password" 
            onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
            placeholder=' Confirm Password'required  />
          </div>

          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input  
              type="checkbox" 
              checked={user.gender==="male"}
              onChange={()=>handleCheckbox("male")}
              className="checkbox mx-2" />
            </div>

            <div className='flex items-center'>
              <p>Female</p>
              <input  
              type="checkbox" 
              checked={user.gender==="female"}
              onChange={()=>handleCheckbox("female")}
              className="checkbox mx-2 " />
            </div>

          </div>
          <div className='text-center'>
            <p><Link to="/login">Already have an account? <a href="">login</a> </Link>
            </p>
          </div>

          <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700 px-6'>Signup</button>
        </form>
      </div>
    </div>
  )
}
