const mongoose=require('mongoose');

const connectDB=async(uri)=>{
   const conn=await mongoose.connect(uri);
   console.log(`App connected to ${conn.connection.host}`);
}

module.exports=connectDB;