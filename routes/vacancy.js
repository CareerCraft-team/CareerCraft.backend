const router = require('express').Router();
const { json } = require('body-parser');
const Vacancy = require('../models/vacancy');
const upload = require('../middlewares/upload-photo');

router.post('/vacancies', upload.single('photo'), async(req, res) => {
    try {
        let vacancy = new Vacancy();
        vacancy.title = req.body.title;
        vacancy.salary = req.body.salary;
        vacancy.salary_type = req.body.salary_type;
        vacancy.description = req.body.description;
        vacancy.skills_required = req.body.skills_required;
        vacancy.work_type = req.body.work_type;
        vacancy.recruiterID = req.body.recruiterID;
        vacancy.candidateID = req.body.candidateID;
        await vacancy.save();
        res.json({
            status: true,
            message: 'Successfully saved!',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.get('/vacancies', async(req, res) => {
    try {
        let vacancies = await Vacancy.find().populate('recruiter').exec();
        // .populate('reviews', 'rating')
        res.json({
            success: true,
            vacancies: vacancies,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.get('/vacancies/:id', async(req, res) => {
    try {
        let vacancy = await (await Vacancy.findOne({ _id: req.params.id }))
            .populated('recruiter')
            .exec();
        // .populate('reviews', 'rating')
        res.json({
            success: true,
            vacancy: vacancy,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.put('/vacancies/:id', upload.single('photo'), async(req, res) => {
    try {
        let vacancy = await Vacancy.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                salary: req.body.salary,
                salary_type: req.body.salary_type,
                description: req.body.description,
                skills_required: req.body.skills_required,
                work_type: req.body.work_type,
                recruiterID: req.body.recruiterID,
                candidateID: req.body.candidateID,
            },
        }, { upsert: true });
        res.json({
            success: true,
            updatedVacancy: vacancy,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.delete('/vacancies/:id', async(req, res) => {
    try {
        let deletedVacancy = await Vacancy.findOneAndDelete({ _id: req.params.id });
        if (deletedVacancy) {
            res.json({
                status: true,
                message: 'Successfully deleted',
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