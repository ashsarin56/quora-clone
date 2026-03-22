const Question=require('../models/Question.js');
const Answer=require('../models/Answer.js');
const mongoose=require('mongoose');

const createAnswer=async(req,res)=>{
    /*
        answer comes from req.body
        user id comes from req.user.id
        we need to check if question id is valid or not
    */
   try{
       const {body}=req.body;
       const userId=req.user.id;
       const questionId=req.params.questionId;
       if(!body || !questionId){
           return res.status(400).json({message:"Body and questionId are required"});
        }
       if(!mongoose.Types.ObjectId.isValid(questionId)){
        return res.status(400).json({message:"Invalid questionId"});
    }
       const validquestion=await Question.findById(questionId);
       if(!validquestion){
         return res.status(404).json({message:"Question not found"});
       }
       const answer=await Answer.create({body, question: questionId, author: userId});
       res.status(201).json(answer);
   }
   catch(error){
       res.status(500).json({message:error.message});
   }
}
const getAnswer=async(req,res)=>{
    try{
        const answerId=req.params.answerId;
        if(!mongoose.Types.ObjectId.isValid(answerId)){
            return res.status(400).json({message:"Invalid answerId"});
        }
        const answer=await Answer.findById(answerId);
        if(!answer){
            return res.status(404).json({message:"Answer not found"});
        }
        res.status(200).json(answer);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
const getAllAnswer=async(req,res)=>{
    try{
       const questionId=req.params.questionId;
       if(!mongoose.Types.ObjectId.isValid(questionId)){
        return res.status(400).json({message:"Invalid questionId"});
       }
       const validquestion=await Question.findById(questionId);
       if(!validquestion){
        return res.status(404).json({message:"Question not found"});
       }
        const answers=await Answer.find({question: questionId});
        res.status(200).json(answers);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
const deleteAnswer=async(req,res)=>{
    try{
        const answerId=req.params.answerId;
        const userId=req.user._id;
        if(!mongoose.Types.ObjectId.isValid(answerId)){
            return res.status(400).json({message:"Invalid answerId"});
        }
        const answer=await Answer.findById(answerId);
        if(!answer){
            return res.status(404).json({message:"Answer not found"});
        }
        if(answer.author.toString() !== userId.toString()){
            return res.status(403).json({message:"Unauthorized"});
        }
        await Answer.findByIdAndDelete(answerId);
        res.status(200).json({message:"Answer deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports={createAnswer,getAnswer,getAllAnswer,deleteAnswer};