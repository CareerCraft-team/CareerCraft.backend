const router = require('express').Router();
const Resume = require('../models/resume');
const verifyToken = require('../middlewares/verify-token');

router.post('/resume', verifyToken, async(req, res) => {
    try {
        let resume = new Resume();
        resume.title = req.body.title;
        resume.expected_salary = req.body.expected_salary;
        resume.education = req.body.education;
        resume.work_experience = req.body.work_experience;
        resume.skills = req.body.skills;
        resume.languages = req.body.languages;
        resume.comments = req.body.comments;

        await resume.save();
        res.json({
            success: true,
            message: 'Resume successfully created!',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.get('/resume', verifyToken, async(req, res) => {
    try {
        let resume = await Resume.find({ user: req.decoded._id });

        res.json({
            success: true,
            resume: resume,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.get('/resume/:id', verifyToken, async(req, res) => {
    try {
        let resume = await Resume.findOne({ _id: req.params.id });
        res.json({
            success: true,
            resume: resume,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.put('/resume/:id', verifyToken, async(req, res) => {
    try {
        let foundResume = await Resume.findOne({ _id: req.params.id });
        if (foundResume) {
            if (req.body.title) foundResume.title = req.body.title;
            if (req.body.expected_salary)
                foundResume.expected_salary = req.body.expected_salary;
            if (req.body.education) foundResume.education = req.body.education;
            if (req.body.work_experience)
                foundResume.work_experience = req.body.work_experience;
            if (req.body.skills) foundResume.skills = req.body.skills;
            if (req.body.languages) foundResume.languages = req.body.languages;
            if (req.body.comments) foundResume.comments = req.body.comments;

            await foundResume.save();
            res.json({
                success: true,
                message: 'successfully updated resume',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.delete('/resume/:id', verifyToken, async(req, res) => {
    try {
        let deletedResume = await Resume.remove({
            user: req.decoded._id,
            _id: req.params.id,
        });
        if (deletedResume) {
            res.json({
                success: true,
                message: 'Resume has been deleted',
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