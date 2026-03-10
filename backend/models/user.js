const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    // profile_photo:{
    //     name:String,
    //     desc:String,
    //     img:{
    //         data:Buffer,
    //         contentType:String
    //     }
    // }
    avatar:{
        type:String,
        default:'',
    }
},{timestamps:true});

module.exports=mongoose.model('User',userschema);