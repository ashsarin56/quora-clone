const express=require('express');
const router=express.Router();
const {createQuestion,getAllQuestions,getQuestion,deleteQuestion}=require('../controllers/questionController.js');
const {protect}=require('../middlewares/authMiddleware.js');

router.get('/',getAllQuestions);
router.get('/:id',getQuestion);
router.post('/',protect,createQuestion);
router.delete('/:id',protect,deleteQuestion);

module.exports=router;