const express = require('express');
const router = express.Router();
const questioncontroller = require('../controllers/questionController');
const  jwtMiddleware= require('../middlewares/jwtMiddleware');

router.post('/', jwtMiddleware.verifyToken,questioncontroller.createNewQuestion); // Route to create new question
router.get('/', questioncontroller.readAllQuestion); // Route to get all questions
router.get('/:question_id', questioncontroller.readQuestionById); // Route to question by question_id
router.put('/:question_id', jwtMiddleware.verifyToken,questioncontroller.questionUserCheck,questioncontroller.updateQuestionById); // Route to update question by its id
router.delete('/:question_id', jwtMiddleware.verifyToken,questioncontroller.questionUserDeleteCheck,questioncontroller.deleteQuestionById); // Route to delete question by id
router.post('/:question_id/answers', jwtMiddleware.verifyToken,questioncontroller.questionAndUserCheck,questioncontroller.createNewAnswer,questioncontroller.updatePoints); // Route to answer question by id
router.get('/:question_id/answers', jwtMiddleware.verifyToken, questioncontroller.readAnswerByQuestionId);  // Route to get a question's answers by question id
module.exports = router;