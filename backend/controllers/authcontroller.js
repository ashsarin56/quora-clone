const user=require('../model/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const registeruser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        /*
            1. check if user is already registered. 
            2. then hash the password
            3. create the new user database
            4. generate JWT token
            5. send response...
        
        */ 
    }
    catch(error){
         res.status(500).json({message: error.message});
    }
}

module.exports={registeruser,loginuser};