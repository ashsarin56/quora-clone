const express=require('express');
const router=express.Router();
const {getAnswer,createAnswer,getAllAnswer,deleteAnswer,}=require('../controllers/answerController.js');
const {protect}=require('../middlewares/authMiddleware.js');

/* 
    IMPOTANT NOTE :
    on important note about the ordering of routes 
    that we need to place the get answer route before get all answer route
    because if we place get all answer route before get answer route then 
    it will treat the answer id as question id and it will return all answers 
    for that question id which will be wrong
    SO WE NEED TO PLACE SPECIFIC ROUTES BEFORE GENERAL/DYNAMIC ROUTES
*/
router.get('/questions/:questionId',getAllAnswer);
router.post('/questions/:questionId',protect,createAnswer);
router.get('/:answerId',getAnswer);
router.delete('/:answerId',protect,deleteAnswer);

module.exports=router;
