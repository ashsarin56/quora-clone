const Question=require('../models/Question');

const createQuestion=async (req,res)=>{
    try{
        const {title,body}=req.body;
        const author=req.user._id;
        const question=await Question.create({title,body,author});
        res.status(201).json(question);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
const getAllQuestions=async (req,res)=>{
    try{
        const questions=await Question.find().populate('author','name email');
        res.status(200).json(questions);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
const getQuestion=async (req,res)=>{
    try{
        const question=await Question.findById(req.params.id).populate('author','name email');
        if(!question){
            return res.status(404).json({message:"Question not found"});
        }
        res.status(200).json(question);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
const deleteQuestion=async (req,res)=>{
    try{
        // const {title,body}=req.body;
        const user=req.user._id;
        const questionsinfo= await Question.findById(req.params.id);
        if(!questionsinfo){
            return res.status(404).json({message:"Question not found"});
        }
        if(questionsinfo.author.toString()!==user.toString()){
            return res.status(403).json({message:"Unauthorized to delete this question"});
        }
        await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Question deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports={createQuestion,getAllQuestions,getQuestion,deleteQuestion};
