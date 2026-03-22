const jwt=require('jsonwebtoken');
const User=require('../models/User');

const protect=async (req,res,next)=>{
    // checking if user is authenticated or not ...
    try{
        const header=req.headers.authorization;
        if(!header || !header.startsWith('Bearer ')){
            return res.status(401).json({message:"Cannot get token"});
        }
        const token=header.split(" ")[1];
        
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(payload.userId).select('-password');
        
        next();
    }
    catch(error){
        res.status(401).json({message:"Token Invalid or expired !"});
    }
}
module.exports={protect};