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
        minlength:6,
        validate:{
            validator:function(value){
                const strongpass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
                return strongpass.test(value);
            },
            message:'Password must contain at least one uppercase , one lowercase letter , one number , one symbol , and at least 6 characters.'
        }
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