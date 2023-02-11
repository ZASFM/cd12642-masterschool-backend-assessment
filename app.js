require('dotenv').config();
const express=require('express');
const photoRoute=require('./routes/photoRoutes');
const authRouter=require('./routes/userRoutes');
const photosRouter=require('./routes/favoritesRoutes');
const errorHandler=require('./middleware/errorMiddleware');
const connectDB=require('./config/db');
const mongoose=require('mongoose')

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.get('/',(req,res)=>{
   res.status(200).json({message:'Welcome to the Unsplash API'});
})
app.use('/api/photos',photoRoute);
app.use('/api/auth',authRouter);
app.use('/api/favoritePhotos',photosRouter);
app.use(errorHandler);

mongoose.connection.on('disconnected',()=>console.log('Disconnected form DB'));
mongoose.set('strictQuery',false);
const start=()=>{
   try{
      connectDB(process.env.MONGO_URI);
      app.listen(PORT,()=>{
         console.log(`Listening on port ${PORT}`);
      })

   }catch(err){
      console.log(err);
   }
}
start();