import {configureStore} from "@reduxjs/toolkit";
import userReducer  from "./userSlice.js"
import messageSlice from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
 
const store = configureStore({
    reducer:{
       user:userReducer,
       message:messageSlice,
       socket:socketReducer
    }
});



export default store;