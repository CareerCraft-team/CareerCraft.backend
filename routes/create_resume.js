const router = require('express').Router();
const Resume = require('../models/resume');

router.post('/create-resume', async(req, res) => {
    try {
        let resume = new Resume();
        resume.title = req.body.title;
        resume.expected_salary = req.body.expected_salary;
        resume.education = req.body.education;
        resume.work_experience = req.body.work_experience;
        resume.skills = req.body.skills;
        resume.languages = req.body.languages;
        resume.comments = req.body.comments;

        await category.save();
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