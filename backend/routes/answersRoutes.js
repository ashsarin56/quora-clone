const express=require('express');
const router=express.Router();
const {getAnswer,createAnswer,getAllAnswer,deleteAnswer,}=require('../controllers/answerController.js');
const {protect}=require('../middlewares/authMiddleware.js');

router.get('/;questionId',getAllAnswer);
router.post('/',protect,createAnswer);
router.get('/:questionId',getAnswer);
router.delete('/:id',protect,deleteAnswer);

module.exports=router;
