import React, { useEffect } from 'react'
import axios from "axios" 
import {useDispatch} from "react-redux"
import { setOtherUser } from '../redux/userSlice';
export default function useGetOtherUsers() {

    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchOtherUsers = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/user/`,{
                    headers:{
                      "Content-Type":"application/json"
                    },
                    withCredentials:true
                   });
         console.log(res);
         dispatch(setOtherUser(res?.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    },[])
}
