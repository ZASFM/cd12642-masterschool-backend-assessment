const errorHandler=(err,req,res,next)=>{
   const status=err.status||500;
   const message=err.message||'Something went wrong';
   const stack=process.env.NODE_ENV==='development'?err.stack:null
   res.status(status).json({message,stack});
}

module.exports=errorHandler; 