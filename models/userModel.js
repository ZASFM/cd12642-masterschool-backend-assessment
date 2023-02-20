const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const UserSchema=new mongoose.Schema({
   username:{
      type:String,
      required:true
   },
   email:{
      type:String,
      unique:true,
      required:true
   },
   password:{
      type:String,
      required:true
   }
},{
   timestamps:true
})

UserSchema.pre('save',async function(next){
   const salt=await bcrypt.genSalt(10);
   this.password=await bcrypt.hash(this.password,salt);
   next();
})

UserSchema.methods.matchPassword=async function(inputPassword){
   const confirmPassword=await bcrypt.compare(inputPassword,this.password);
   return confirmPassword;
}


const User=mongoose.model('User',UserSchema);
module.exports=User;