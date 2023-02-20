//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
const favoritePhotos=require('../models/favoritePhotoModel');
const axios=require('axios');

const postPhoto=asyncHandler(async(req,res)=>{
   const {user,body:{url,explanation}}=req;
   const {data}=await axios.get(`https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
   if(data){
      const filteringParams=data.filter(photo=>photo.urls.raw===url);
      const photo=new favoritePhotos({
         user:user._id,
         url,
         description:filteringParams[0].description?filteringParams[0].description:null,
         username:filteringParams[0].user.username?filteringParams[0].user.username:null,
         explanation,
      })
      await photo.save();
      res.status(200).json({photo});
   }else{
      res.status(500).json({msg:"Error ocurred"})
   }
})

const getPhotos=asyncHandler(async(req,res)=>{
   const photos=await favoritePhotos.find();
   res.status(200).json({photos});
})

const editPhoto=asyncHandler(async(req,res)=>{
   const {params:{id},body:{explanation:newExplanation}}=req;
   const photo=await favoritePhotos.findByIdAndUpdate(id,{$set:{
      explanation:newExplanation
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