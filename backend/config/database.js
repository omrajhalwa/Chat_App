import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path:"../config/.env"
})

const connectDB = async ()=>{
    
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database connected succefully");
    }).catch((err)=>{
        console.log("erroor in mongo",err);
    })
};

export default connectDB;