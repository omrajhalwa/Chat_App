import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
      authUser:null,
      otherUser:null,
      selectedUser:null,
      onlineUsers:null
    },
    reducers:{
       
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;
        },
        setOtherUser:(state,action)=>{
            state.otherUser=action.payload;
        },
        setSelecteduser:(state,action)=>{
            state.selectedUser=action.payload;
        },
        setOnlineUser:(state,action)=>{
            state.onlineUsers=action.payload;
        }
    }
});

export const {setAuthUser,setOtherUser,setSelecteduser,setOnlineUser}=userSlice.actions;
export default userSlice.reducer;