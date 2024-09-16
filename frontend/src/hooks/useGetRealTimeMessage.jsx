import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";


const useGetRealTimeMessage =() =>{
    const {socket}   = useSelector(store=>store.socket);
    const {message}=useSelector(store=>store.message);
    const dispatch=useDispatch();
    useEffect(()=>{
      console.log("hello");
             socket?.on('newMessage',(newMessage)=>{
             console.log(newMessage);
               dispatch(setMessages([...message,newMessage]))
             })
    },[socket,setMessages,message]);

};

export default useGetRealTimeMessage;