const mongoose=require('mongoose');
const colors=require('colors');
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.white);
    }
    catch(error){
        console.log(`Mongo Error:${error}`.bgRed.white);
        process.exit(1);
    }
}
module.exports=connectDB;