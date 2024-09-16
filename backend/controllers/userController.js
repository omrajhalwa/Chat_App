import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


export const register= async(req,res)=>{
    try {
        const {fullname,username,password,confirmPassword,gender} = req.body;
        if(!fullname || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({
                message:"all field are required"
            });
        }
        
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"password do not match"
            });
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({
                message:"username already exit try diffrent"
            })
        }

const hashedPassword = await bcryptjs.hash(password,10);
const maleProfilePhoto=`https://avatar.iran.liara.run/public/boy?username=${username}`;
const femaleProfilePhoto=`https://avatar.iran.liara.run/public/girl?username=${username}`;
        await User.create({
            fullname,
            username,
            password:hashedPassword,
            profilePhoto : gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        })


        return res.status(200).json({
            message:"account create successfully",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}


export const login = async(req,res)=>{
    try {
        const {username,password} = req.body;
        if( !username || !password){
            return res.status(400).json({
                message:"all field are required"
            });
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                message:"user or password is incorrect"
            })
        }

        const isPasswordMatch= bcryptjs.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                message:"user or password is incorrect"
            })
        }
     
        const tokenData= {
            userId:user?._id

        }

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
            

       

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
           _id:user._id,
           username:user.username,
           fullname:user.fullname,
           profilePhoto:user.profilePhoto,
           message:"user loggedin successfully",
           success:true
        });

    } catch (error) {
        console.log(error);
    }
};


export const logout= (req,res)=>{
    try{
       return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"user logout succesfully",
        success:true
       });
    }catch(err){
        console.log(err);
    }
}

export const getOtherUsers = async(req,res)=>{
    try {
        const loggedInUserId= req.id;
        const otherUsers= await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}