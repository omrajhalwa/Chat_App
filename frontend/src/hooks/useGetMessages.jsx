import React, { useEffect } from 'react'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import { setMessages } from '../redux/messageSlice';
export default function useGetMessages() {

const {selectedUser}=useSelector(store=>store.user);
const dispatch=useDispatch();
    useEffect(()=>{
        const fetchMessages= async()=>{
            try {
                const res=await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`,{
                    headers:{
                      "Content-Type":"application/json"
                    },
                    withCredentials:true
                   });

            console.log(res);
            dispatch(setMessages(res?.data));
            } catch (error) {
                console.log(error);
            }
        }

        fetchMessages();
    },[selectedUser?._id,setMessages]);
}
