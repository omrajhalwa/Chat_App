// const express=require("express");

import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js"
import cors from "cors"
import {app,server} from "./socket/socket.js"
dotenv.config({});

connectDB();
app.use(express.json());
app.use(cookieParser());



const corsOption={
    origin:"http://localhost:3000",
    credentials:true
};

app.use(cors(corsOption));

app.use(express.urlencoded({extended:true}));
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);

app.get("/",(req,res)=>{
    res.send("connected to express");
})

server.listen(process.env.PORT,()=>{
 
    console.log(`server listen at ${process.env.PORT}`);
});