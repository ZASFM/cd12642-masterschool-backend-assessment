//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');

const login=asyncHandler(async(req,res)=>{
   const {email,password}=req.body;
   try{
      if(!email||!password){
         return res.status(400).json({message:'All fields are required'});
      }

      const user=await User.findOne({email});
      if(!user){
         return res.status(400).json({message:'User does nt exists'});
      }

      const confirmPassword=user.matchPassword(password);
      if(!confirmPassword){
         return res.status(400).json({message:'Incorrect password'});
      }

      //const {password,...rest}=user._doc;
      const token=jwt.sign({
         id:user._id,
         username:user.username,
         email:user.email
      },process.env.JWT_SECRET,{expiresIn:'1d'});
      res.status(200).json({user,token});
   }catch(err){
      res.status(200).json({message:err.error});
   }
})

const register=asyncHandler(async(req,res,next)=>{
   const {body:{username,email,password}}=req;
   try{
      if(!email||!username||!password){
         return res.status(400).json({message:'All fields are required'});
      }

      const userExists=await User.findOne({email});
      if(userExists){
        return res.status(400).json({message:'Email already exists'});
      }

      const user=new User({
         username,
         email,
         password
      })
      await user.save();
      res.status(200).json({user});
   }catch(err){
      res.status(200).json({message:err.error});
   }
})

const getMe=asyncHandler(async(req,res)=>{
   res.status(200).json({user:req.user})
})

const logout=(req,res)=>{
   req.user=null;
   res.status(200).json({message:'logged out'});
}

module.exports={
   login,
   register,
   getMe,
   logout
}