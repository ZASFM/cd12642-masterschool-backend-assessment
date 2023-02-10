//Require axios to make API calls
const axios = require("axios");
const asyncHandler=require('express-async-handler');

const getPhotos=asyncHandler(async(req,res)=>{
   try{
      const {data}=await axios.get(`https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
      const urls=data.map(i=>{
         return {
            raw:i.urls.raw
         }
      });
      res.status(200).send(urls);
   }catch(err){
      res.status(500).json('Server error. Please try again later.');
   }
})

const getPhoto=asyncHandler(async(req,res)=>{
   const {id}=req.params;
   try{
      const {data}=await axios.get(`https://api.unsplash.com/photos/${id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
      res.status(200).json(data);
   }catch(err){
      res.status(500).send('Server error. Please try again later.');
   }
})

module.exports={
   getPhoto,
   getPhotos
}