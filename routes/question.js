const router = require('express').Router();
const Question = require('../models/question');
const verifyToken = require('../middlewares/verify-token');

router.post('/questions', verifyToken, async(req, res) => {
    try {
        let questions = new Question();
        questions._id = req.body._id;
        questions.title = req.body.title;
        questions.questionType = req.body.questionType;
        questions.description = req.body.description;
        questions.correctAnswer = req.body.correctAnswer;

        await questions.save();
        res.json({
            success: true,
            message: 'Successfully added new question!',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.get('/questions', verifyToken, async(req, res) => {
    try {
        let questions = await Question.find({ user: req.decoded._id });

        res.json({
            success: true,
            questions: questions,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.get('/questions/:id', verifyToken, async(req, res) => {
    try {
        let question = await Question.findOne({ _id: req.params.id });
        res.json({
            success: true,
            question: question,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.put('/questions/:id', verifyToken, async(req, res) => {
    try {
        let foundQuestion = await Question.findOne({ _id: req.params.id });
        if (foundQuestion) {
            if (req.body.title) foundQuestion.title = req.body.title;
            if (req.body.questionType) foundQuestion.questionType = req.body.questionType;
            if (req.body.description) foundQuestion.description = req.body.description;
            if (req.body.correctAnswer) foundQuestion.correctAnswer = req.body.correctAnswer;

            await foundQuestion.save();
            res.json({
                success: true,
                message: 'successfully updated question',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.delete('/questions/:id', verifyToken, async(req, res) => {
    try {
        let deletedQuestion = await Question.remove({
            user: req.decoded._id,
            _id: req.params.id,
        });
        if (deletedQuestion) {
            res.json({
                success: true,
                message: 'Question has been deleted',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;