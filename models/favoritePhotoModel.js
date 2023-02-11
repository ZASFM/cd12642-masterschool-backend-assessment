const mongoose=require('mongoose');

const favoritePhotosSchema=new mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   },
   url:{
      type:String
   },
   description:{
      type:String
   },
   username:{
      type:String
   }
},{
   timestamps:true
})

const favoritePhotos=mongoose.model('favoritePhotos',favoritePhotosSchema);
module.exports=favoritePhotos;