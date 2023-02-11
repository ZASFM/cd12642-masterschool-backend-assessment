const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');

const verifyToken=asyncHandler(async(req,res,next)=>{
   try{
      if(
         req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer ')
      ){
         const token=req.headers.authorization.split(' ')[1];
         const decoded=jwt.verify(token,process.env.JWT_SECRET);
         const user=await User.findById(decoded.id).select('-password');
         req.user=user;
         next();
      }else{
         res.status(400).json({message:'No token present'})
      }
   }catch(err){
      console.log(err);
      res.status(400).json({message:'Unauthenticated'})
   }
})

module.exports=verifyToken;