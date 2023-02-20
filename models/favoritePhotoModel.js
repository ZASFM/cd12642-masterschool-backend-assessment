const mongoose=require('mongoose');

const favoritePhotosSchema=new mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   },
   url:{
      type:String,
      required:true
   },
   description:{
      type:String,
      required:true
   },
   username:{
      type:String,
      required:true,
   },
   explanation:{
      type:String
   }
},{
   timestamps:true
})

const favoritePhotos=mongoose.model('favoritePhotos',favoritePhotosSchema);
module.exports=favoritePhotos;