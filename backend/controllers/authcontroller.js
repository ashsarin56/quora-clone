const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        /*
            1. check if user is already registered. 
            2. then hash the password
            3. create the new user database
            4. generate JWT token
            5. send response...
        
        */ 
       const existinguser=await User.findOne({email});
       if(existinguser){
        return res.status(400).json({ message: "User already exists" });
       }
       const strongpass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
       if(!strongpass.test(password)){
        return res.status(400).json({ message: "Password must contain at least one uppercase, one lowercase letter, one number, one symbol, and at least 6 characters." });
       }
       const hashedpassword=await bcrypt.hash(password,10);
       const newuser=await User.create({
        name,
        email,
        password:hashedpassword,
       });
       const token=jwt.sign(
        {userId:newuser._id},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
       );
       res.status(201).json({
        token,
        user:{
            id:newuser._id,
            name:newuser.name,
            email:newuser.email
        }
       });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};
const loginUser=async(req,res)=>{
    /*
        get email from req body
        find email if not found then 404 
        compare the hashed passsword 
        if wrong then 401
        else generate jwt token 
        and sent token back to user 
    */
   try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"Please register first to login"});
    }
    const isequal=await bcrypt.compare(password,user.password);
    if(!isequal){
        return res.status(401).json({message:"Invalid password"}); 
    }
    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    );
    res.status(200).json({
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });
   }
   catch(error){
    res.status(500).json({message:`Something went wrong: ${error}`});
   }
};

module.exports={registerUser,loginUser};