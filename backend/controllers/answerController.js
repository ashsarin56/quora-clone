const createAnswer=async(req,res)=>{
    /*
        answer comes from req.body
        user id comes from req.user.id
        we need to check if question id is valid or not
    */
   const {body}=req.body;
   const questionId=req.params.questionId;
   const userId=req.user.id;
   if(!body || !questionId){
    return res.status(400).json({message:"Body and questionId are required"});
   }
   if(!mongoose.Types.ObjectId.isValid(questionId)){
    return res.status(400).json({message:"Invalid questionId"});
   }
   
}
const getAnswer=async(req,res)=>{
    
}
const getAllAnswer=async(req,res)=>{

}
const deleteAnswer=async(req,res)=>{
    
}
module.exports={createAnswer,getAnswer,getAllAnswer,deleteAnswer};