//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
const favoritePhotos=require('../models/favoritePhotoModel');

const postPhoto=asyncHandler(async(req,res)=>{
   const {user,body:{description,url,username}}=req;
   const photo=new favoritePhotos({
      user:user._id,
      url,
      description,
      username
   })
   await photo.save();
   res.status(200).json({photo});
})

const getPhotos=asyncHandler(async(req,res)=>{
   const photos=await favoritePhotos.find();
   res.status(200).json({photos});
})

const editPhoto=asyncHandler(async(req,res)=>{
   const {params:{id},body:{description:newDescription}}=req;
   const photo=await favoritePhotos.findByIdAndUpdate(id,{$set:{
      description:newDescription
   }},{new:true});
   res.status(200).json({photo});
})

const deletePhoto=asyncHandler(async(req,res)=>{
   const {id}=req.params;
   const photo=await favoritePhotos.findByIdAndDelete(id);
   res.status(200).json({photo});
}) 

module.exports={
   postPhoto,
   getPhotos,
   editPhoto,
   deletePhoto
}